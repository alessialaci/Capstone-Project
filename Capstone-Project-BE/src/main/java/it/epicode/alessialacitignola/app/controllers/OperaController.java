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

import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.entities.enums.TipoOpera;
import it.epicode.alessialacitignola.app.services.OperaService;

@RestController
@RequestMapping("/app/")
public class OperaController {
	
	@Autowired
	private OperaService os;
	
	@GetMapping("opere")
	public ResponseEntity<Object> getOpere() {
		List<Opera> opere = os.getAll();
		
		if(opere.isEmpty()) {
			return new ResponseEntity<>("Opere non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(opere, HttpStatus.CREATED);
	}
	
	@GetMapping("opere_page")
	public ResponseEntity<Object> getOpereInPages(Pageable pageable) {
		Page<Opera> opere = os.getAllInPages(pageable);
		
		if(opere.isEmpty()) {
			return new ResponseEntity<>("Opere non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(opere, HttpStatus.OK);
	}
	
	@GetMapping("opere/{id}")
	public ResponseEntity<Object> getOpereById(@PathVariable int id) {
		Optional<Opera> operaObj = os.getById(id);
		
		if(operaObj.isEmpty()) {
			return new ResponseEntity<>("Opera non trovata", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(operaObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("opere/cerca")
	public List<Opera> getAllOpereByTipo(@RequestParam("tipo") TipoOpera tipo) {
		return os.getByTipo(tipo);
	}
	
	@PostMapping("opere")
	public ResponseEntity<Object> createOpera(@RequestBody Opera o) {
		Opera opera = os.save(o);
		
		return new ResponseEntity<Object>(opera, HttpStatus.CREATED);
	}
	
	@PutMapping("opere/{id}")
	public ResponseEntity<Object> updateOpera(@PathVariable int id, @RequestBody Opera _opera) {
		Optional<Opera> operaObj = os.getById(id);
		
		if(operaObj.isEmpty()) {
			return new ResponseEntity<Object>("Opera non trovata", HttpStatus.NOT_FOUND);
		}
		
		Opera opera = operaObj.get();
		
		opera.setTipo(_opera.getTipo());
		opera.setTitolo(_opera.getTitolo());
		opera.setDescrizione(_opera.getDescrizione());
		opera.setAutore(_opera.getAutore());
		opera.setAnno(_opera.getAnno());
		opera.setTecnica(_opera.getTecnica());
		opera.setCondizioni(_opera.getCondizioni());
		opera.setAltezza(_opera.getAltezza());
		opera.setLunghezza(_opera.getLunghezza());
		opera.setLarghezza(_opera.getLarghezza());
		opera.setPeso(_opera.getPeso());
		opera.setStimaPrezzo(_opera.getStimaPrezzo());
		opera.setPrezzoMinimo(_opera.getPrezzoMinimo());
		opera.setOfferta(_opera.getOfferta());
		opera.setStatoLotto(_opera.getStatoLotto());
		opera.setScadenzaTimer(_opera.getScadenzaTimer());
	    opera.setFoto(_opera.getFoto());
	    
		
		os.save(opera);
		
		return new ResponseEntity<Object>(opera, HttpStatus.CREATED);
	}
	
	@DeleteMapping("opere/{id}")
	public ResponseEntity<Object> deleteOpera(@PathVariable int id) {
		Optional<Opera> operaObj = os.getById(id);
		
		if(operaObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		os.delete(operaObj.get());
		
		return new ResponseEntity<>(String.format("Opera con id %d eliminata", id), HttpStatus.OK);
	}

}
