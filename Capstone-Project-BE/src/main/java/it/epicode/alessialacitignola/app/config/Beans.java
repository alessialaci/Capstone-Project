package it.epicode.alessialacitignola.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.entities.Ruolo;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.entities.enums.TipoRuolo;

@Configuration
public class Beans {
	
	@Bean
	@Scope("prototype")
	public Opera opera(String titolo, String descrizione, Utente autore, int anno, int altezza, int larghezza) {
		return Opera.builder()
				.titolo(titolo)
				.descrizione(descrizione)
				.autore(autore)
				.anno(anno)
				.altezza(altezza)
				.larghezza(larghezza)
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

}
