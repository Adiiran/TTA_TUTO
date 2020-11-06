/*
 * $Id: LogicREST.java Sep 16, 2020 tta2021$
 * 
 * Copyright (C) 2015 Maider Huarte Arrayago
 * 
 * This file is part of TTA2021_LS-EX_09-10S.zip.
 * 
 * TTA2021_LS-EX_09-10S.zip is based on templates by Eclipse.org and it is
 * intended for learning purpouses only.
 * 
 * TTA2021_LS-EX_09-10S.zip is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.
 * 
 * TTA2021_LS-EX_09-10S.zip is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details <http://www.gnu.org/licenses/>.
 */

package bl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import bl.json.*;
import dl.*;
import eus.ehu.INTEL901_504021.TTA2021.utils.*;

//URL to REST functions: localhost:8080/BackEnd6/rest/school/...

@Singleton
@Path("/school")
public class LogicREST {

    @Context private javax.servlet.http.HttpServletRequest hsr;    
    @PersistenceContext private EntityManager em;
    
    
    //Server File Tree generation
	@PostConstruct
	private void buildTree() {
		String contextName=hsr.getContextPath().substring(1);
		System.out.println("contextName: "+contextName);
		String folderNames[]={"img"};
		
		FileUtils.generateFolderTree(contextName, folderNames);
	}
	
	
	//Add new user to the DB
	//Receives JSON Data-Type
	//Returns the text of the "alias" of the new user
	@SuppressWarnings("unchecked")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)	
	@Path("/addStudent")	
	public Response addStudent(StudentJSON studentJSON) {//POST, JSON, text
		System.out.println("addStudent: "+hsr.getRemoteAddr());

		Response response;

		String alias=studentJSON.getAlias();		
		String response_text = "";
			
		//Query to look for same alias
		List<User> users=(List<User>)em.createNamedQuery("User.findAlias").setParameter("alias", alias).getResultList();
		
		User student=new User();
		if (users.size()== 0)
		{
			student.setAlias(alias);	//If there's not an entry with that alias
		}
		else
		{
			//Query to look for substring alias
			String aliasPrefix=studentJSON.getAlias().replaceAll("\\d*$", "");		
			List<User> users_substring=(List<User>)em.createNamedQuery("User.findAllAliasPrefix").setParameter("aliasPrefix", aliasPrefix+"%").getResultList();
			student.setAlias(aliasPrefix+users_substring.size());	//If there's another entry with that alias
			//response_text = "Usuario con alias "+aliasPrefix+" ya existe. "; 
		}
		student.setPassword(studentJSON.getPassword());
		student.setRole("student");
			
		em.persist(student);//Insert new register for the object "student"
			
		//Response: alias
		//response=Response.status(200).entity(student.getAlias()).build();
		
		//Response: info + alias
		//response_text = response_text + "Añadido nuevo usuario: " + student.getAlias();
		response_text = student.getAlias();
		response=Response.status(200).entity(response_text).build();
		
		return response;
	}
	
	
	//Requests the authorization to login to the application
	//Receives from authorization fields the "alias" and the "password"
	//Returns the result of the operation as OK/NOK (plain text info)
	@GET
	@Produces(MediaType.TEXT_PLAIN)	
	@Path("/restricted/requestLogin")
	public Response requestLogin() {		
		System.out.println("requestLogin: "+hsr.getRemoteAddr());
		Response httpResponse;
		
		if(SecUtils.checkAuthorization(hsr, em, "student")) {
			
			httpResponse=Response.status(200).entity("OK").build();					
			
		}
		else
			httpResponse=Response.status(401).entity("WRONG CREDENTIALS").build();						

		return httpResponse;
	}	
	
	
	
	//Upload a file to the "img" folder in server
	//Receives the "multipart/form-data" file-type of the image to upload
	//Receives: 
	//			Header: "Content-Type = multipart/form-data"
	//			Body:
	//					TEXT: filetype = img
	//					FILE: file = file_selected(URL//path)
	//Returns text with response info
	@POST
	@Consumes("multipart/form-data")
	@Path("/restricted/uploadFile")
	public Response restrictedUploadFile(MultipartFormDataInput input) {
		System.out.println("restrictedUploadFile: "+hsr.getRemoteAddr());

		Response httpResponse;
		if(SecUtils.checkAuthorization(hsr, em, "*"))
			if(input != null)
			{
				httpResponse=FileUtils.uploadFile(input);
			}
			else
			{
				httpResponse=Response.status(415).entity("NOT FILE TO UPLOAD").build();		
			}
			
		else
			httpResponse=Response.status(401).entity("WRONG CREDENTIALS").build();						
		
		return httpResponse;		
	}
    
	//Creates/updates "Actividad" entry in BD
	//Receives authorization data in headers
	//Receives ActividadJSON: "fecha", "grupo", "actividad1", "actividad2", "actividad2imagen"
	//Returns text with response info
	@SuppressWarnings("unchecked")
	@POST
	@Produces(MediaType.TEXT_PLAIN)	
	@Path("/restricted/updateActividad")	
	public Response updateActividad(ActividadJSON actividadJSON) throws ParseException {
		System.out.println("updateActividad: "+hsr.getRemoteAddr());
		
		Response httpResponse;
		
		if(SecUtils.checkAuthorization(hsr, em, "student")) {	
			String authenticatedAlias=SecUtils.getAuthName(hsr);						
	
			String responseText="ACTIVIDAD NOT UPDATED";

			Actividad actividad=null;		
			
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");			
			List<Actividad> actividadList=(List<Actividad>)em.createNamedQuery("Actividad.findFechaUser").setParameter("fecha", formatter.parse(actividadJSON.getFecha())).setParameter("alias", authenticatedAlias).getResultList();
			if(actividadList.size()==1) {
				///User ALREADY has an entry for the date -> Modify	
				actividad=actividadList.get(0);
				actividad.setActividad1(actividadJSON.isActividad1());
				actividad.setActividad2(actividadJSON.isActividad2());
				actividad.setActividad2imagen(actividadJSON.getActividad2imagen());
			}
			else {
				//User DOES NOT have an entry for the date -> Create
				User student=(User)em.createNamedQuery("User.findAlias").setParameter("alias", authenticatedAlias).getSingleResult();
				actividad=new Actividad(0, actividadJSON.isActividad1(), actividadJSON.isActividad2(), actividadJSON.getActividad2imagen(), formatter.parse(actividadJSON.getFecha()), actividadJSON.getGrupo(), student);
				em.persist(actividad);									
			}
								
			responseText="ACTIVIDAD UPDATED";
			httpResponse=Response.status(200).entity(responseText).build();	
		}
		else
			httpResponse=Response.status(401).entity("WRONG CREDENTIALS").build();						
		

		return httpResponse;
	}
	
	
	//Creates/updates "Tarea" entry in BD
	//Receives authorization data in headers
	//Receives TareaJSON: "fecha", "grupo", "tarea1", "tarea2", "tarea3", "tarea4", "tarea5"
	//Returns text with response info
	@SuppressWarnings("unchecked")
	@POST
	@Produces(MediaType.TEXT_PLAIN)	
	@Path("/restricted/updateTarea")	
	public Response updateTarea(TareaJSON tareaJSON) throws ParseException {
		System.out.println("updateTarea: "+hsr.getRemoteAddr());
			
		Response httpResponse;
		
		if(SecUtils.checkAuthorization(hsr, em, "student")) {	
			String authenticatedAlias=SecUtils.getAuthName(hsr);						
	
			String responseText="TAREA NOT UPDATED";

			Tarea tarea=null;		
			
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");			
			List<Tarea> tareaList=(List<Tarea>)em.createNamedQuery("Tarea.findFechaUser").setParameter("fecha", formatter.parse(tareaJSON.getFecha())).setParameter("alias", authenticatedAlias).getResultList();
			if(tareaList.size()==1) {
				//User ALREADY has an entry for the date -> Modify
				tarea=tareaList.get(0);
				tarea.setTarea1(tareaJSON.isTarea1());
				tarea.setTarea1(tareaJSON.isTarea2());
				tarea.setTarea1(tareaJSON.isTarea3());
				tarea.setTarea1(tareaJSON.isTarea4());
				tarea.setTarea1(tareaJSON.isTarea5());
			}
			else {
				//User DOES NOT have an entry for the date -> Create
				User student=(User)em.createNamedQuery("User.findAlias").setParameter("alias", authenticatedAlias).getSingleResult();
				tarea=new Tarea(0, formatter.parse(tareaJSON.getFecha()), tareaJSON.getGrupo(), tareaJSON.isTarea1(), tareaJSON.isTarea2(), tareaJSON.isTarea3(), tareaJSON.isTarea4(), tareaJSON.isTarea5(), student);
				em.persist(tarea);									
			}
								
			responseText="TAREA UPDATED";
			httpResponse=Response.status(200).entity(responseText).build();	
		}
		else
			httpResponse=Response.status(401).entity("WRONG CREDENTIALS").build();						
		

		return httpResponse;
	}
	
	//Creates/updates "Ocio" entry in BD
	//Receives authorization data in headers
	//Receives OcioJSON: "fecha", "grupo", "tarea1", "tarea2", "tarea3", "tarea4", "tarea5"
	//Returns text with response info
	@SuppressWarnings("unchecked")
	@POST
	@Produces(MediaType.TEXT_PLAIN)	
	@Path("/restricted/updateOcio")	
	public Response updateOcio(OcioJSON ocioJSON) throws ParseException {
		System.out.println("updateOcio: "+hsr.getRemoteAddr());
			
		Response httpResponse;
		
		if(SecUtils.checkAuthorization(hsr, em, "student")) {	
			String authenticatedAlias=SecUtils.getAuthName(hsr);						
	
			String responseText="OCIO NOT UPDATED";

			Ocio ocio=null;		
			
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");			
			List<Ocio> ocioList=(List<Ocio>)em.createNamedQuery("Ocio.findFechaUser").setParameter("fecha", formatter.parse(ocioJSON.getFecha())).setParameter("alias", authenticatedAlias).getResultList();
			if(ocioList.size()==1) {
				//User ALREADY has an entry for the date -> Modify
				ocio=ocioList.get(0);
				ocio.setOcio1(ocioJSON.isOcio1());
				ocio.setOcio2(ocioJSON.isOcio1());
				ocio.setOcio2imagen(ocioJSON.getOcio2imagen());
			}
			else {
				//User DOES NOT have an entry for the date -> Create
				User student=(User)em.createNamedQuery("User.findAlias").setParameter("alias", authenticatedAlias).getSingleResult();
				ocio=new Ocio(0, formatter.parse(ocioJSON.getFecha()), ocioJSON.getGrupo(), ocioJSON.isOcio1(), ocioJSON.isOcio2(), ocioJSON.getOcio2imagen(), student);
				em.persist(ocio);									
			}
								
			responseText="OCIO UPDATED";
			httpResponse=Response.status(200).entity(responseText).build();	
		}
		else
			httpResponse=Response.status(401).entity("WRONG CREDENTIALS").build();						
		

		return httpResponse;
	}	
	
	// Returns from DB the images for the group and collection selected
	// Receives the query params "grupo" and "coleccion" in the URL (../restricted/requestImagenes?grupo=xxxxx&coleccion=ocio/actividad)
	// Returns a list of JSON objects with the information of the images selected
	// The data returned for "fecha" is a DATETIME type, NOT a string format type
	@SuppressWarnings("unchecked")
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})	
	@Path("/restricted/requestImagenes")
	public Response requestImagenes(@QueryParam("grupo") String grupo, @QueryParam("coleccion") String coleccion) {	
		System.out.println("requestImagenes: "+hsr.getRemoteAddr());
		Response httpResponse=null;
		
		if(SecUtils.checkAuthorization(hsr, em, "student")) {				
			if(coleccion.equals("actividad")) {
	
				List<Actividad> actividadList=(List<Actividad>)em.createNamedQuery("Actividad.findGrupo").setParameter("grupo", grupo).getResultList();
				
				List<ImagenActividadJSON> imagenesActividadJSONList=new ArrayList<ImagenActividadJSON>();
				for(int i=0;i<actividadList.size();i++) {
					Actividad a=actividadList.get(i);
					ImagenActividadJSON aJSON=new ImagenActividadJSON(a.getFecha(),a.getGrupo(),a.getUser().getAlias(), a.getActividad2imagen());
					imagenesActividadJSONList.add(aJSON);
				}
				
				ImagenesActividadJSON imagenesActividadJSON=new ImagenesActividadJSON(imagenesActividadJSONList);
				httpResponse=Response.status(200).entity(imagenesActividadJSON).build();						

			}
			else {
				if(coleccion.equals("ocio")) {
					
					List<Ocio> ocioList=(List<Ocio>)em.createNamedQuery("Ocio.findGrupo").setParameter("grupo", grupo).getResultList();
					
					List<ImagenOcioJSON> imagenesOcioJSONList=new ArrayList<ImagenOcioJSON>();
					for(int i=0;i<ocioList.size();i++) {
						Ocio a=ocioList.get(i);
						ImagenOcioJSON aJSON=new ImagenOcioJSON(a.getFecha(),a.getGrupo(),a.getUser().getAlias(), a.getOcio2imagen());
						imagenesOcioJSONList.add(aJSON);
					}
					
					ImagenesOcioJSON imagenesOcioJSON=new ImagenesOcioJSON(imagenesOcioJSONList);					
					httpResponse=Response.status(200).entity(imagenesOcioJSON).build();						
				}
			}						
			
		}
		else
			httpResponse=Response.status(401).entity("WRONG CREDENTIALS").build();						

		return httpResponse;
	}	
}
