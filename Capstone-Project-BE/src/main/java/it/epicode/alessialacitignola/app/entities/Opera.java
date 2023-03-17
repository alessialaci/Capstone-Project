package it.epicode.alessialacitignola.app.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import it.epicode.alessialacitignola.app.entities.enums.CondizioniOpera;
import it.epicode.alessialacitignola.app.entities.enums.StatoLotto;
import it.epicode.alessialacitignola.app.entities.enums.TecnicaOpera;
import it.epicode.alessialacitignola.app.entities.enums.TipoOpera;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "opere")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Opera {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Enumerated(EnumType.STRING)
	private TipoOpera tipo;
	
	private String titolo;
	private String descrizione;
	
	@ManyToOne
	private Utente autore;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "opera")
    private Set<FotoOpera> urlFoto;
	
	@Enumerated(EnumType.STRING)
	private TecnicaOpera tecnica;
	
	@Enumerated(EnumType.STRING)
	private CondizioniOpera condizioni;
	
	private int anno;
	private int altezza;
	private int lunghezza;
	private int larghezza;
	private double peso;
	private double stimaPrezzo;
	private double prezzoMinimo;
	private double offerta = 1;
	
	@Enumerated(EnumType.STRING)
	private StatoLotto statoLotto = StatoLotto.IN_ATTESA;

}
