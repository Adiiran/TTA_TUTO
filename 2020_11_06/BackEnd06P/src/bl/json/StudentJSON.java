/*
 * $Id: StudentJSON.java Nov 3, 2020 tta2021$
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
public class StudentJSON {
	@XmlElement
	private String alias;
	
	@XmlElement
	private String password;
	
	public StudentJSON() {
	}
	
	public StudentJSON(String alias, String password) {
		this.alias=alias;
		this.password=password;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
