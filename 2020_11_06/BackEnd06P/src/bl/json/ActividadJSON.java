/*
 * $Id: ActividadJSON.java Nov 3, 2020 tta2021$
 * 
 * Copyright (C) 2020 Maider Huarte Arrayago
 * 
 * This file is part of TTA2021_LS-EX_09-10S.zip.
 * 
 * TTA2021_LS-EX_09-10S.zip is based on templates by Eclipse.org and it is
 * intended for learning purposes only.
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

package bl.json;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ActividadJSON {
	@XmlElement
	private String fecha;
	
	@XmlElement
	private String grupo;
	
	@XmlElement	
	private boolean actividad1;

	@XmlElement	
	private boolean actividad2;

	@XmlElement	
	private String actividad2imagen;	
	
	public ActividadJSON() {
		
	}

	public ActividadJSON(String fecha, String grupo, boolean actividad1, boolean actividad2, String actividad2imagen) {
		super();
		this.fecha = fecha;
		this.grupo = grupo;
		this.actividad1 = actividad1;
		this.actividad2 = actividad2;
		this.actividad2imagen = actividad2imagen;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getGrupo() {
		return grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

	public boolean isActividad1() {
		return actividad1;
	}

	public void setActividad1(boolean actividad1) {
		this.actividad1 = actividad1;
	}

	public boolean isActividad2() {
		return actividad2;
	}

	public void setActividad2(boolean actividad2) {
		this.actividad2 = actividad2;
	}

	public String getActividad2imagen() {
		return actividad2imagen;
	}

	public void setActividad2imagen(String actividad2imagen) {
		this.actividad2imagen = actividad2imagen;
	}
		
}
