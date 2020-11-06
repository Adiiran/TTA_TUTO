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

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ImagenActividadJSON {
	@XmlElement
	private Date fecha;
	
	@XmlElement
	private String grupo;
	
	@XmlElement	
	private String alias;

	@XmlElement	
	private String actividad2imagen;	
	
	public ImagenActividadJSON() {
		
	}

	public ImagenActividadJSON(Date fecha, String grupo, String alias, String actividad2imagen) {
		super();
		this.fecha = fecha;
		this.grupo = grupo;
		this.alias = alias;
		this.actividad2imagen = actividad2imagen;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getGrupo() {
		return grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getActividad2imagen() {
		return actividad2imagen;
	}

	public void setActividad2imagen(String actividad2imagen) {
		this.actividad2imagen = actividad2imagen;
	}
		
}
