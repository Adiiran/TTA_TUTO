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
public class TareaJSON {
	@XmlElement
	private String fecha;
	
	@XmlElement
	private String grupo;
	
	@XmlElement	
	private boolean tarea1;

	@XmlElement	
	private boolean tarea2;

	@XmlElement	
	private boolean tarea3;
	
	@XmlElement	
	private boolean tarea4;
	
	@XmlElement	
	private boolean tarea5;	
	
	public TareaJSON() {
		
	}

	public TareaJSON(String fecha, String grupo, boolean tarea1, boolean tarea2, boolean tarea3, boolean tarea4,
			boolean tarea5) {
		super();
		this.fecha = fecha;
		this.grupo = grupo;
		this.tarea1 = tarea1;
		this.tarea2 = tarea2;
		this.tarea3 = tarea3;
		this.tarea4 = tarea4;
		this.tarea5 = tarea5;
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

	public boolean isTarea1() {
		return tarea1;
	}

	public void setTarea1(boolean tarea1) {
		this.tarea1 = tarea1;
	}

	public boolean isTarea2() {
		return tarea2;
	}

	public void setTarea2(boolean tarea2) {
		this.tarea2 = tarea2;
	}

	public boolean isTarea3() {
		return tarea3;
	}

	public void setTarea3(boolean tarea3) {
		this.tarea3 = tarea3;
	}

	public boolean isTarea4() {
		return tarea4;
	}

	public void setTarea4(boolean tarea4) {
		this.tarea4 = tarea4;
	}

	public boolean isTarea5() {
		return tarea5;
	}

	public void setTarea5(boolean tarea5) {
		this.tarea5 = tarea5;
	}
		
}
