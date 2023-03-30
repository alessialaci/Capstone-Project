package it.epicode.alessialacitignola.app.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.alessialacitignola.app.entities.Ordine;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.services.OrdineService;

@RestController
@RequestMapping("/app/")
public class OrdineController {

	@Autowired
	private OrdineService os;

	@GetMapping("ordini")
	public ResponseEntity<Object> getOrdini() {
		List<Ordine> ordini = os.getAll();
		
		if(ordini.isEmpty()) {
			return new ResponseEntity<>("Ordini non trovati", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(ordini, HttpStatus.CREATED);
	}
	
	@GetMapping("ordini_page")
	public ResponseEntity<Object> getOrdiniInPages(Pageable pageable) {
		Page<Ordine> ordini = os.getAllInPages(pageable);
		
		if(ordini.isEmpty()) {
			return new ResponseEntity<>("Ordini non trovati", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(ordini, HttpStatus.OK);
	}
	
	@GetMapping("ordini/{id}")
	public ResponseEntity<Object> getOrdineById(@PathVariable int id) {
		Optional<Ordine> ordineObj = os.getById(id);
		
		if(ordineObj.isEmpty()) {
			return new ResponseEntity<>("Offerta non trovata", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(ordineObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("ordini/cerca")
	public List<Ordine> getAllOrdiniByUtente(@RequestParam("utente") Utente utente) {
		return os.getAllByUtente(utente);
	}
	
	@PostMapping("ordini")
	public ResponseEntity<Object> createOrdine(@RequestBody Ordine o) {
		Ordine ordine = os.save(o);
		
		return new ResponseEntity<Object>(ordine, HttpStatus.CREATED);
	}
	
	@PutMapping("ordini/{id}")
	public ResponseEntity<Object> updateOrdine(@PathVariable int id, @RequestBody Ordine _ordine) {
		Optional<Ordine> ordineObj = os.getById(id);
		
		if(ordineObj.isEmpty()) {
			return new ResponseEntity<Object>("Ordine non trovato", HttpStatus.NOT_FOUND);
		}
		
		Ordine ordine = ordineObj.get();
		
		ordine.setOpera(_ordine.getOpera());
		ordine.setCompratore(_ordine.getCompratore());
		ordine.setValuta(_ordine.getValuta());
		ordine.setPrezzo(_ordine.getPrezzo());
		ordine.setSpeseTrasporto(_ordine.getSpeseTrasporto());
		ordine.setCommissione(_ordine.getCommissione());
		ordine.setTotale(_ordine.getTotale());
		
		os.save(ordine);
		
		return new ResponseEntity<Object>(ordine, HttpStatus.CREATED);
	}
	
	@DeleteMapping("ordini/{id}")
	public ResponseEntity<Object> deleteOrdine(@PathVariable int id) {
		Optional<Ordine> ordineObj = os.getById(id);
		
		if(ordineObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		os.delete(ordineObj.get());
		
		return new ResponseEntity<>(String.format("Ordine con id %d eliminato", id), HttpStatus.OK);
	}
	
}
