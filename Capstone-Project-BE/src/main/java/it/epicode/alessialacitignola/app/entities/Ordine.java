package it.epicode.alessialacitignola.app.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "ordini")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Ordine {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne
	private Opera opera;
	
	@ManyToOne
	private Utente compratore;
	
	private String valuta;
	private double prezzo;
	private double speseTrasporto;
	private double commissione;
	private double totale;
	
}
