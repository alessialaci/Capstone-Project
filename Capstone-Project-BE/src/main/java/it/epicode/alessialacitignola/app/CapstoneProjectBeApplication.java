package it.epicode.alessialacitignola.app;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import it.epicode.alessialacitignola.app.config.Beans;
import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.entities.Ruolo;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.entities.enums.TipoRuolo;
import it.epicode.alessialacitignola.app.services.OperaService;
import it.epicode.alessialacitignola.app.services.RuoloService;
import it.epicode.alessialacitignola.app.services.UtenteService;

@SpringBootApplication
public class CapstoneProjectBeApplication implements CommandLineRunner {

	ApplicationContext ctx = new AnnotationConfigApplicationContext(Beans.class);
	
	@Autowired
	private RuoloService rs;
	
	@Autowired
	private UtenteService us;
	
	@Autowired
	private OperaService os;
	
	public static void main(String[] args) {
		SpringApplication.run(CapstoneProjectBeApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		popolaDb();
		
		((AnnotationConfigApplicationContext)ctx).close();
	}
	
	public void popolaDb() {
		Ruolo r1 = (Ruolo) ctx.getBean("ruolo", TipoRuolo.ROLE_ADMIN);
		Ruolo r2 = (Ruolo) ctx.getBean("ruolo", TipoRuolo.ROLE_USER);
		
		rs.save(r1);
		rs.save(r2);
		
		Utente u1 = (Utente) ctx.getBean("utente", "Mario", "Rossi", "admin", "admin@mail.it", "admin");
		Utente u2 = (Utente) ctx.getBean("utente", "Luigi", "Verdi", "user", "user@mail.it", "user");
		
		u1.setRuoli(new HashSet<>() {{
			add(r1);
		}});
		
		u2.setRuoli(new HashSet<>() {{
			add(r2);
		}});
		
		us.save(u1);
		us.save(u2);
		
		Opera o1 = (Opera) ctx.getBean("opera", "Titolo Prova 1", "Descrizione Prova 1", u2, 2010, 100, 150);
		Opera o2 = (Opera) ctx.getBean("opera", "Titolo Prova 2", "Descrizione Prova 2", u2, 2015, 95, 100);
		
		os.save(o1);
		os.save(o2);
		
		System.out.println("Db popolato");
	}

}
