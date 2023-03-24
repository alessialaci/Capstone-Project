package it.epicode.alessialacitignola.app.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.alessialacitignola.app.entities.Ruolo;
import it.epicode.alessialacitignola.app.services.RuoloService;

@RestController
@RequestMapping("/app/")
public class RuoloController {
	
	@Autowired
	private RuoloService rs;
	
	@GetMapping("ruoli")
	public ResponseEntity<Object> getRuoli() {
		List<Ruolo> ruoli = rs.getAll();
		
		if(ruoli.isEmpty()) {
			return new ResponseEntity<>("Ruoli non trovati", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(ruoli, HttpStatus.CREATED);
	}
	
	@GetMapping("ruoli_page")
	public ResponseEntity<Object> getRuoliInPages(Pageable pageable) {
		Page<Ruolo> ruoli = rs.getAllInPages(pageable);
		
		if(ruoli.isEmpty()) {
			return new ResponseEntity<>("Ruoli non trovati", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(ruoli, HttpStatus.OK);
	}
	
	@GetMapping("ruoli/{id}")
	public ResponseEntity<Object> getRuoloById(@PathVariable int id) {
		Optional<Ruolo> ruoloObj = rs.getById(id);
		
		if(ruoloObj.isEmpty()) {
			return new ResponseEntity<>("Ruolo non trovato", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(ruoloObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("ruoli")
	public ResponseEntity<Object> createRuolo(@RequestBody Ruolo r) {
		Ruolo ruolo = rs.save(r);
		
		return new ResponseEntity<Object>(ruolo, HttpStatus.CREATED);
	}
	
	@PutMapping("ruoli/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> updateRuolo(@PathVariable int id, @RequestBody Ruolo _ruolo) {
		Optional<Ruolo> ruoloObj = rs.getById(id);
		
		if(ruoloObj.isEmpty()) {
			return new ResponseEntity<Object>("Ruolo non trovato", HttpStatus.NOT_FOUND);
		}
		
		Ruolo ruolo = ruoloObj.get();
		
		ruolo.setTipoRuolo(_ruolo.getTipoRuolo());
		
		rs.save(ruolo);
		
		return new ResponseEntity<Object>(ruolo, HttpStatus.CREATED);
	}
	
	@DeleteMapping("ruoli/{id}")
	public ResponseEntity<Object> deleteRuolo(@PathVariable int id) {
		Optional<Ruolo> ruoloObj = rs.getById(id);
		
		if(ruoloObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		rs.delete(ruoloObj.get());
		
		return new ResponseEntity<>(String.format("Ruolo con id %d eliminato", id), HttpStatus.OK);
	}

}
