package it.epicode.alessialacitignola.app.config;

import java.io.File;
import java.time.LocalDate;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import it.epicode.alessialacitignola.app.entities.FotoOpera;
import it.epicode.alessialacitignola.app.entities.Offerta;
import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.entities.Ruolo;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.entities.enums.CondizioniOpera;
import it.epicode.alessialacitignola.app.entities.enums.StatoLotto;
import it.epicode.alessialacitignola.app.entities.enums.TecnicaOpera;
import it.epicode.alessialacitignola.app.entities.enums.TipoOpera;
import it.epicode.alessialacitignola.app.entities.enums.TipoRuolo;

@Configuration
public class Beans {
	
	@Bean
	@Scope("prototype")
	public Opera opera(TipoOpera tipo, String titolo, String descrizione, Utente autore, TecnicaOpera tecnica, CondizioniOpera condizioni, int anno, int altezza, int lunghezza, int larghezza, double peso, double stimaPrezzo, double prezzoMinimo) {
		return Opera.builder()
				.tipo(tipo)
				.titolo(titolo)
				.descrizione(descrizione)
				.autore(autore)
				.tecnica(tecnica)
				.condizioni(condizioni)
				.anno(anno)
				.altezza(altezza)
				.lunghezza(lunghezza)
				.larghezza(larghezza)
				.peso(peso)
				.stimaPrezzo(stimaPrezzo)
				.prezzoMinimo(prezzoMinimo)
				.statoLotto(StatoLotto.IN_ATTESA)
				.build();
	}
	
	@Bean
	@Scope("prototype")
	public FotoOpera foto(String file, Opera opera) {
		return FotoOpera.builder()
				.file("src/assets/img/opere/" + file)
				.opera(opera)
				.build();
	}
	
	@Bean
	@Scope("prototype")
	public Ruolo ruolo(TipoRuolo tipoRuolo) {
		return Ruolo.builder()
				.tipoRuolo(tipoRuolo)
				.build();
	}
	
	@Bean
	@Scope("prototype")
	public Utente utente(String nome, String cognome, String username, String email, String password) {
		return Utente.builder()
				.nome(nome)
				.cognome(cognome)
				.username(username)
				.email(email)
				.password(password)
				.attivo(true)
				.build();
	}
	
	@Bean
	@Scope("prototype")
	public Offerta offerta(LocalDate data, Opera opera, Utente utente) {
		return Offerta.builder()
				.data(data)
				.opera(opera)
				.utente(utente)
				.build();
	}

}
