package it.epicode.alessialacitignola.app.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.alessialacitignola.app.entities.Preferito;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.services.PreferitoService;

@RestController
@RequestMapping("/app/")
public class PreferitoController {

	@Autowired
	private PreferitoService ps;
	
	@GetMapping("preferiti")
	public ResponseEntity<Object> getPreferiti() {
		List<Preferito> preferiti = ps.getAll();
		
		if(preferiti.isEmpty()) {
			return new ResponseEntity<>("Preferiti non trovati", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(preferiti, HttpStatus.CREATED);
	}
	
	@GetMapping("preferiti/{id}")
	public ResponseEntity<Object> getPreferitoById(@PathVariable int id) {
		Optional<Preferito> preferitoObj = ps.getById(id);
		
		if(preferitoObj.isEmpty()) {
			return new ResponseEntity<>("Preferito non trovato", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(preferitoObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("preferiti/cerca")
	public List<Preferito> getAllPreferitiByUtente(@RequestParam("utente") Utente utente) {
		return ps.getAllByUtente(utente);
	}
	
	@PostMapping("preferiti")
	public ResponseEntity<Object> createPreferito(@RequestBody Preferito p) {
		Preferito preferito = ps.save(p);
		
		return new ResponseEntity<Object>(preferito, HttpStatus.CREATED);
	}
	
	@DeleteMapping("preferiti/{id}")
	public ResponseEntity<Object> deletePreferito(@PathVariable int id) {
		Optional<Preferito> preferitoObj = ps.getById(id);
		
		if(preferitoObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		ps.delete(preferitoObj.get());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
