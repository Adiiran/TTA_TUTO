package dl;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the User database table.
 * 
 */
@Entity
@NamedQueries({
	@NamedQuery(name="User.findAll", query="SELECT u FROM User u"),
	@NamedQuery(name="User.findAlias", query="SELECT u FROM User u WHERE u.alias= :alias"),
	@NamedQuery(name="User.findAllAliasPrefix", query="SELECT u FROM User u WHERE u.alias LIKE :aliasPrefix")	
})
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String alias;

	private String password;

	private String role;
	
	public User() {
	}

	
	public User(int id, String alias, String password, String role) {
		super();
		this.id = id;
		this.alias = alias;
		this.password = password;
		this.role = role;
	}


	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAlias() {
		return this.alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}