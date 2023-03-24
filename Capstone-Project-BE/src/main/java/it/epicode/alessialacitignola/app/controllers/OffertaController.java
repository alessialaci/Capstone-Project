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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.alessialacitignola.app.entities.Offerta;
import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.services.OffertaService;

@RestController
@RequestMapping("/app/")
public class OffertaController {

	@Autowired
	private OffertaService os;

	@GetMapping("offerte")
	public ResponseEntity<Object> getOfferte() {
		List<Offerta> offerte = os.getAll();
		
		if(offerte.isEmpty()) {
			return new ResponseEntity<>("Offerte non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(offerte, HttpStatus.CREATED);
	}
	
	@GetMapping("offerte_page")
	public ResponseEntity<Object> getOfferteInPages(Pageable pageable) {
		Page<Offerta> offerte = os.getAllInPages(pageable);
		
		if(offerte.isEmpty()) {
			return new ResponseEntity<>("Offerte non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(offerte, HttpStatus.OK);
	}
	
	@GetMapping("offerte/{id}")
	public ResponseEntity<Object> getOfferteById(@PathVariable int id) {
		Optional<Offerta> offerteObj = os.getById(id);
		
		if(offerteObj.isEmpty()) {
			return new ResponseEntity<>("Offerta non trovata", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(offerteObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("offerte")
	public ResponseEntity<Object> createOfferta(@RequestBody Offerta o) {
		Offerta offerta = os.save(o);
		
		return new ResponseEntity<Object>(offerta, HttpStatus.CREATED);
	}
	
	@PutMapping("offerte/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> updateOfferta(@PathVariable int id, @RequestBody Offerta _offerta) {
		Optional<Offerta> offertaObj = os.getById(id);
		
		if(offertaObj.isEmpty()) {
			return new ResponseEntity<Object>("Offerta non trovata", HttpStatus.NOT_FOUND);
		}
		
		Offerta offerta = offertaObj.get();
		
		offerta.setData(_offerta.getData());
		offerta.setOpera(_offerta.getOpera());
		offerta.setUtente(_offerta.getUtente());
		offerta.setOfferta(_offerta.getOfferta());
		
		os.save(offerta);
		
		return new ResponseEntity<Object>(offerta, HttpStatus.CREATED);
	}
	
	@DeleteMapping("offerte/{id}")
	public ResponseEntity<Object> deleteOfferta(@PathVariable int id) {
		Optional<Offerta> offertaObj = os.getById(id);
		
		if(offertaObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		os.delete(offertaObj.get());
		
		return new ResponseEntity<>(String.format("Offerta con id %d eliminata", id), HttpStatus.OK);
	}
	
	@GetMapping("offerte/cerca")
	public List<Offerta> getAllOfferteByOpera(@RequestParam("opera") Opera opera) {
		return os.getAllByOpera(opera);
	}

}
