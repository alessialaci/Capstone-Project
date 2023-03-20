package it.epicode.alessialacitignola.app.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import it.epicode.alessialacitignola.app.config.FileUploadUtil;
import it.epicode.alessialacitignola.app.entities.Ruolo;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.services.RuoloService;
import it.epicode.alessialacitignola.app.services.UtenteService;

@RestController
@RequestMapping("/app/")
public class UtenteController {

	@Autowired
	private UtenteService us;
	
	@Autowired
	private RuoloService rs;
	
	@Autowired
	private PasswordEncoder pwEncoder;
	
    @Value("${upload.path}")
    private String uploadPath;
	
	@GetMapping("utenti")
	public ResponseEntity<Object> getUtenti() {
		List<Utente> utenti = us.getAll();
		
		if(utenti.isEmpty()) {
			return new ResponseEntity<>("Utenti non trovati", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(utenti, HttpStatus.CREATED);
	}
	
	@GetMapping("utenti_page")
	public ResponseEntity<Object> getUtentiInPages(Pageable pageable) {
		Page<Utente> utenti = us.getAllInPages(pageable);
		
		if(utenti.isEmpty()) {
			return new ResponseEntity<>("Utenti non trovati", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(utenti, HttpStatus.OK);
	}
	
	@GetMapping("utenti/{id}")
	public ResponseEntity<Object> getUtenteById(@PathVariable int id) {
		Optional<Utente> utenteObj = us.getById(id);
		
		if(utenteObj.isEmpty()) {
			return new ResponseEntity<>("Utente non trovato", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(utenteObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("utenti")
	public ResponseEntity<Object> createUtente(@RequestBody Utente u) {
		String password = u.getPassword();
		Optional<Ruolo> userObj = rs.getById(2);
		Ruolo ruoloUser = userObj.get();
		
		u.setRuoli(new HashSet<>() {{
			add(ruoloUser);
		}});
		
		u.setPassword(pwEncoder.encode(password));
		
		Utente utente = us.save(u);
		
		return new ResponseEntity<Object>(utente, HttpStatus.CREATED);
	}
	
	@PutMapping("utenti/{id}")
	public ResponseEntity<Object> updateUtente(@PathVariable int id, @RequestBody Utente _utente, @RequestParam(name = "foto", required = false) MultipartFile multipartFile) throws IOException {
		Optional<Utente> utenteObj = us.getById(id);
		
		if(utenteObj.isEmpty()) {
			return new ResponseEntity<Object>("Utente non trovato", HttpStatus.NOT_FOUND);
		}
		
		Utente utente = utenteObj.get();
		
		utente.setNome(_utente.getNome());
		utente.setCognome(_utente.getCognome());
		utente.setUsername(_utente.getUsername());
		utente.setEmail(_utente.getEmail());
		utente.setPassword(_utente.getPassword());
		utente.setRuoli(_utente.getRuoli());
//		utente.setPreferiti(_utente.getPreferiti());
		
//	    if(multipartFile != null) {
//	        // Elimina la vecchia immagine dal filesystem
//	        String uploadDir = "/foto-utente/" + utente.getId();
//	        String oldFilePath = Paths.get(uploadDir, utente.getFoto()).toString();
//	        Path oldFile = Paths.get(oldFilePath);
//	        if (Files.exists(oldFile)) {
//	            Files.delete(oldFile);
//	        }
//
//	        // Salva la nuova immagine sul filesystem
//	        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
//	        String filePath = Paths.get(uploadDir, fileName).toString();
//	        Path targetLocation = Paths.get(filePath);
//	        Files.copy(multipartFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
//
//	        // Aggiorna il campo foto dell'utente con il nuovo nome del file
//	        utente.setFoto(filePath);
//	    }
		
		us.save(utente);
		
		return new ResponseEntity<Object>(utente, HttpStatus.CREATED);
	}
	
	@DeleteMapping("utenti/{id}")
	public ResponseEntity<Object> deleteUtente(@PathVariable int id) {
		Optional<Utente> utenteObj = us.getById(id);
		
		if(utenteObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		us.delete(utenteObj.get());
		
		return new ResponseEntity<>(String.format("Utente con id %d eliminato", id), HttpStatus.OK);
	}
	
}
