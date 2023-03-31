package it.epicode.alessialacitignola.app;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import it.epicode.alessialacitignola.app.config.Beans;
import it.epicode.alessialacitignola.app.entities.FotoOpera;
import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.entities.Ruolo;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.entities.enums.CondizioniOpera;
import it.epicode.alessialacitignola.app.entities.enums.TecnicaOpera;
import it.epicode.alessialacitignola.app.entities.enums.TipoOpera;
import it.epicode.alessialacitignola.app.entities.enums.TipoRuolo;
import it.epicode.alessialacitignola.app.services.FotoOperaService;
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
	
	@Autowired
	private FotoOperaService fs;
	
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
		
		Utente u1 = (Utente) ctx.getBean("utente", "Mario", "Rossi", "admin", "admin@mail.it", "admin", "Via Roma, 1", "00184", "Milano", "Italia", "Sono un admin");
		Utente u2 = (Utente) ctx.getBean("utente", "Rebecca", "Lentini", "user", "rebelonlyart@mail.it", "user", "Via Milano, 2", "00127", "Roma", "Italia", "@rebelonlyart");
		
		u1.setRuoli(new HashSet<>() {{
			add(r1);
		}});
		
		u2.setRuoli(new HashSet<>() {{
			add(r2);
		}});
		
		us.save(u1);
		us.save(u2);
		
		System.out.println("Utenti creati");
		
		Opera o1 = (Opera) ctx.getBean("opera", TipoOpera.FOTOGRAFIA, "Angel", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", u2, TecnicaOpera.TECNICA_MISTA, CondizioniOpera.OTTIME_CONDIZIONI, 2020, 21, 29, 1, 0.1, 160, 50);
		Opera o2 = (Opera) ctx.getBean("opera", TipoOpera.FOTOGRAFIA, "Wolf", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", u2, TecnicaOpera.TECNICA_MISTA, CondizioniOpera.OTTIME_CONDIZIONI, 2021, 21, 29, 1, 0.2, 160, 50);
		Opera o3 = (Opera) ctx.getBean("opera", TipoOpera.FOTOGRAFIA, "Fire Girl", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", u2, TecnicaOpera.TECNICA_MISTA, CondizioniOpera.OTTIME_CONDIZIONI, 2023, 21, 29, 1, 0.2, 160, 50);
		Opera o4 = (Opera) ctx.getBean("opera", TipoOpera.DISEGNO, "Guerriera", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", u2, TecnicaOpera.DIGITALE, CondizioniOpera.OTTIME_CONDIZIONI, 2020, 21, 29, 1, 0.1, 160, 50);
		Opera o5 = (Opera) ctx.getBean("opera", TipoOpera.DISEGNO, "Black", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", u2, TecnicaOpera.DIGITALE, CondizioniOpera.OTTIME_CONDIZIONI, 2020, 21, 29, 1, 0.1, 160, 50);
		Opera o6 = (Opera) ctx.getBean("opera", TipoOpera.DISEGNO, "Dark", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", u2, TecnicaOpera.DIGITALE, CondizioniOpera.OTTIME_CONDIZIONI, 2021, 21, 29, 1, 0.1, 160, 50);
		Opera o7 = (Opera) ctx.getBean("opera", TipoOpera.DISEGNO, "Waterlily", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", u2, TecnicaOpera.PASTELLO, CondizioniOpera.BUONE_CONDIZIONI, 2022, 30, 40, 1, 0.2, 160, 50);
		Opera o8 = (Opera) ctx.getBean("opera", TipoOpera.DISEGNO, "Butterflies", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", u2, TecnicaOpera.ACQUERELLO, CondizioniOpera.BUONE_CONDIZIONI, 2017, 30, 40, 1, 0.2, 160, 50);
		
		os.save(o1);
		os.save(o2);
		os.save(o3);
		os.save(o4);
		os.save(o5);
		os.save(o6);
		os.save(o7);
		os.save(o8);
		
		FotoOpera f1 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270454/foto_opere/Angel_1_sikdda.jpg", o1);
		FotoOpera f2 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270390/foto_opere/Angel_2_h3xeqh.jpg", o1);
		FotoOpera f3 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270396/foto_opere/Angel_3_hnrpqx.jpg", o1);
		FotoOpera f4 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270449/foto_opere/Wolf_1_jxxler.jpg", o2);
		FotoOpera f5 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270452/foto_opere/Wolf_2_qkphyv.jpg", o2);
		FotoOpera f6 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270453/foto_opere/Wolf_3_h8vqcs.jpg", o2);
		FotoOpera f7 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270434/foto_opere/Fire_Girl_1_j49udt.jpg", o3);
		FotoOpera f8 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270425/foto_opere/Fire_Girl_2_p5eo4p.jpg", o3);
		FotoOpera f9 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270435/foto_opere/Fire_Girl_3_ibki2h.jpg", o3);
		FotoOpera f10 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270428/foto_opere/Guerriera_1_fdvgjx.jpg", o4);
		FotoOpera f11 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270436/foto_opere/Guerriera_2_qnwowf.jpg", o4);
		FotoOpera f12 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270431/foto_opere/Guerriera_3_wwnatp.jpg", o4);
		FotoOpera f13 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270418/foto_opere/Black_1_h09csg.jpg", o5);
		FotoOpera f14 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270392/foto_opere/Black_2_eatz8m.jpg", o5);
		FotoOpera f15 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270387/foto_opere/Black_3_lj0ya4.jpg", o5);
		FotoOpera f16 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270454/foto_opere/Dark_1_u5bcci.jpg", o6);
		FotoOpera f17 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270413/foto_opere/Dark_2_n0fs52.jpg", o6);
		FotoOpera f18 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270417/foto_opere/Dark_3_oiex2t.jpg", o6);
		FotoOpera f19 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270441/foto_opere/Waterlily_1_zfyklb.jpg", o7);
		FotoOpera f20 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270442/foto_opere/Waterlily_2_seyyyw.jpg", o7);
		FotoOpera f21 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270447/foto_opere/Waterlily_3_okjdc2.jpg", o7);
		FotoOpera f22 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270407/foto_opere/Butterflies_1_jt62vs.jpg", o8);
		FotoOpera f23 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270412/foto_opere/Butterflies_2_lbrhtl.jpg", o8);
		FotoOpera f24 = (FotoOpera) ctx.getBean("foto", "https://res.cloudinary.com/dwe3fc2iq/image/upload/v1680270418/foto_opere/Butterflies_3_jati3x.jpg", o8);
		
		fs.save(f1);
		fs.save(f2);
		fs.save(f3);
		fs.save(f4);
		fs.save(f5);
		fs.save(f6);
		fs.save(f7);
		fs.save(f8);
		fs.save(f9);
		fs.save(f10);
		fs.save(f11);
		fs.save(f12);
		fs.save(f13);
		fs.save(f14);
		fs.save(f15);
		fs.save(f16);
		fs.save(f17);
		fs.save(f18);
		fs.save(f19);
		fs.save(f20);
		fs.save(f21);
		fs.save(f22);
		fs.save(f23);
		fs.save(f24);
		
		System.out.println("Opere create");
	}

}
