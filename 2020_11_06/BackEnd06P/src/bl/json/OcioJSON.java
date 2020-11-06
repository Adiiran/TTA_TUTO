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
public class OcioJSON {
	@XmlElement
	private String fecha;
	
	@XmlElement
	private String grupo;
	
	@XmlElement	
	private boolean ocio1;

	@XmlElement	
	private boolean ocio2;

	@XmlElement	
	private String ocio2imagen;	
	
	public OcioJSON() {
		
	}

	public OcioJSON(String fecha, String grupo, boolean ocio1, boolean ocio2, String ocio2imagen) {
		super();
		this.fecha = fecha;
		this.grupo = grupo;
		this.ocio1 = ocio1;
		this.ocio2 = ocio2;
		this.ocio2imagen = ocio2imagen;
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

	public boolean isOcio1() {
		return ocio1;
	}

	public void setOcio1(boolean ocio1) {
		this.ocio1 = ocio1;
	}

	public boolean isOcio2() {
		return ocio2;
	}

	public void setOcio2(boolean ocio2) {
		this.ocio2 = ocio2;
	}

	public String getOcio2imagen() {
		return ocio2imagen;
	}

	public void setOcio2imagen(String ocio2imagen) {
		this.ocio2imagen = ocio2imagen;
	}


		
}
