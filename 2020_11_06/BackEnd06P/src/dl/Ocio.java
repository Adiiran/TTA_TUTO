package dl;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the Ocio database table.
 * 
 */
@Entity
@NamedQueries({
@NamedQuery(name="Ocio.findAll", query="SELECT a FROM Ocio a"),
@NamedQuery(name="Ocio.findFechaUser", query="SELECT a FROM Ocio a WHERE a.user.alias= :alias AND a.fecha= :fecha"),
@NamedQuery(name="Ocio.findGrupo", query="SELECT a FROM Ocio a WHERE a.grupo= :grupo")
})
public class Ocio implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idocio;

	@Temporal(TemporalType.TIMESTAMP)
	private Date fecha;

	private String grupo;

	@Column(columnDefinition = "TINYINT")	
	private boolean ocio1;

	@Column(columnDefinition = "TINYINT")	
	private boolean ocio2;

	private String ocio2imagen;

	//uni-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="usuario_idusuario")
	private User user;

	public Ocio() {
	}

	public Ocio(int idocio, Date fecha, String grupo, boolean ocio1, boolean ocio2, String ocio2imagen, User user) {
		super();
		this.idocio = idocio;
		this.fecha = fecha;
		this.grupo = grupo;
		this.ocio1 = ocio1;
		this.ocio2 = ocio2;
		this.ocio2imagen = ocio2imagen;
		this.user = user;
	}

	public int getIdocio() {
		return this.idocio;
	}

	public void setIdocio(int idocio) {
		this.idocio = idocio;
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

	public boolean getOcio1() {
		return this.ocio1;
	}

	public void setOcio1(boolean ocio1) {
		this.ocio1 = ocio1;
	}

	public boolean getOcio2() {
		return this.ocio2;
	}

	public void setOcio2(boolean ocio2) {
		this.ocio2 = ocio2;
	}

	public String getOcio2imagen() {
		return this.ocio2imagen;
	}

	public void setOcio2imagen(String ocio2imagen) {
		this.ocio2imagen = ocio2imagen;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}