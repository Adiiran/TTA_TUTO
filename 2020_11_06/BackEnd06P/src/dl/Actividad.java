package dl;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the Actividad database table.
 * 
 */
@Entity
@NamedQueries({
@NamedQuery(name="Actividad.findAll", query="SELECT a FROM Actividad a"),
@NamedQuery(name="Actividad.findFechaUser", query="SELECT a FROM Actividad a WHERE a.user.alias= :alias AND a.fecha= :fecha"),
@NamedQuery(name="Actividad.findGrupo", query="SELECT a FROM Actividad a WHERE a.grupo= :grupo")
})
public class Actividad implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idactividad;

	@Column(columnDefinition = "TINYINT")	
	private boolean actividad1;

	@Column(columnDefinition = "TINYINT")	
	private boolean actividad2;

	@Column(columnDefinition = "TINYINT")	
	private String actividad2imagen;

	@Temporal(TemporalType.TIMESTAMP)
	private Date fecha;

	private String grupo;

	//uni-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="usuario_idusuario")
	private User user;

	public Actividad() {
	}

	public Actividad(int idactividad, boolean actividad1, boolean actividad2, String actividad2imagen, Date fecha,
			String grupo, User user) {
		super();
		this.idactividad = idactividad;
		this.actividad1 = actividad1;
		this.actividad2 = actividad2;
		this.actividad2imagen = actividad2imagen;
		this.fecha = fecha;
		this.grupo = grupo;
		this.user = user;
	}

	public int getIdactividad() {
		return this.idactividad;
	}

	public void setIdactividad(int idactividad) {
		this.idactividad = idactividad;
	}

	public boolean getActividad1() {
		return this.actividad1;
	}

	public void setActividad1(boolean actividad1) {
		this.actividad1 = actividad1;
	}

	public boolean getActividad2() {
		return this.actividad2;
	}

	public void setActividad2(boolean actividad2) {
		this.actividad2 = actividad2;
	}

	public String getActividad2imagen() {
		return this.actividad2imagen;
	}

	public void setActividad2imagen(String actividad2imagen) {
		this.actividad2imagen = actividad2imagen;
	}

	public Date getFecha() {
		return this.fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getGrupo() {
		return this.grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}