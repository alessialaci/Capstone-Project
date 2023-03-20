package it.epicode.alessialacitignola.app.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "utenti")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Utente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String nome;
	private String cognome;
	private String username;
	private String email;
	private String password;
	private String foto;
	private boolean attivo = true;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "ruoli_utenti",
		joinColumns = @JoinColumn(name = "utente_id"),
		inverseJoinColumns = @JoinColumn(name = "ruolo_id")
	)
	private Set<Ruolo> ruoli;
	
//	@ManyToMany
//	@JoinTable(
//		name = "preferiti_utenti",
//		joinColumns = @JoinColumn(name = "utente_id"),
//		inverseJoinColumns = @JoinColumn(name = "preferito_id")
//	)
//	private Set<Opera> preferiti;
	
//    @Transient
//    public String getPhotosImagePath() {
//        if (foto == null) return null;
//         
//        return "/foto-utenti/" + id + "/" + foto;
//    }

}
