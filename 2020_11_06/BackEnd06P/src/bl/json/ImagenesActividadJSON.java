/*
 * $Id: ImagenesActividadJSON.java Nov 3, 2020 tta2021$
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

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ImagenesActividadJSON {
	@XmlElement(name="imagenActividad")
	private List<ImagenActividadJSON> imagenActividad;
	
	public ImagenesActividadJSON() {
		imagenActividad=new ArrayList<ImagenActividadJSON>();
	}		
	
	public ImagenesActividadJSON(List<ImagenActividadJSON> imagenActividad) {
		super();
		this.imagenActividad = imagenActividad;
	}



	public List<ImagenActividadJSON> getImagenActividad() {
		return imagenActividad;
	}
	
	public void setImagenActividad(List<ImagenActividadJSON> imagenActividad) {
		this.imagenActividad=imagenActividad;
	}
}

