package dl;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the Tarea database table.
 * 
 */
@Entity
//Added QUERYS for Tarea class
@NamedQueries({
@NamedQuery(name="Tarea.findAll", query="SELECT t FROM Tarea t"),
@NamedQuery(name="Tarea.findFechaUser", query="SELECT a FROM Tarea a WHERE a.user.alias= :alias AND a.fecha= :fecha"),
@NamedQuery(name="Tarea.findGrupo", query="SELECT a FROM Tarea a WHERE a.grupo= :grupo")
})
public class Tarea implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idtarea;

	@Temporal(TemporalType.TIMESTAMP)
	private Date fecha;

	private String grupo;

	@Column(columnDefinition = "TINYINT")	
	private boolean tarea1;

	@Column(columnDefinition = "TINYINT")	
	private boolean tarea2;

	@Column(columnDefinition = "TINYINT")	
	private boolean tarea3;

	@Column(columnDefinition = "TINYINT")	
	private boolean tarea4;

	@Column(columnDefinition = "TINYINT")	
	private boolean tarea5;

	//uni-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="usuario_idusuario")
	private User user;

	public Tarea() {
	}

	public Tarea(int idtarea, Date fecha, String grupo, boolean tarea1, boolean tarea2, boolean tarea3, boolean tarea4,
			boolean tarea5, User user) {
		super();
		this.idtarea = idtarea;
		this.fecha = fecha;
		this.grupo = grupo;
		this.tarea1 = tarea1;
		this.tarea2 = tarea2;
		this.tarea3 = tarea3;
		this.tarea4 = tarea4;
		this.tarea5 = tarea5;
		this.user = user;
	}

	public int getIdtarea() {
		return this.idtarea;
	}

	public void setIdtarea(int idtarea) {
		this.idtarea = idtarea;
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

	public boolean getTarea1() {
		return this.tarea1;
	}

	public void setTarea1(boolean tarea1) {
		this.tarea1 = tarea1;
	}

	public boolean getTarea2() {
		return this.tarea2;
	}

	public void setTarea2(boolean tarea2) {
		this.tarea2 = tarea2;
	}

	public boolean getTarea3() {
		return this.tarea3;
	}

	public void setTarea3(boolean tarea3) {
		this.tarea3 = tarea3;
	}

	public boolean getTarea4() {
		return this.tarea4;
	}

	public void setTarea4(boolean tarea4) {
		this.tarea4 = tarea4;
	}

	public boolean getTarea5() {
		return this.tarea5;
	}

	public void setTarea5(boolean tarea5) {
		this.tarea5 = tarea5;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}