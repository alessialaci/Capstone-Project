package it.epicode.alessialacitignola.app.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Ordine {

	private double prezzo;
	private String valuta;
	private String metodo;
	private String intent;
	private String descrizione;
	
}
