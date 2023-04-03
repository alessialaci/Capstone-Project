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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.alessialacitignola.app.entities.Notifica;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.services.NotificaService;

@RestController
@RequestMapping("/app/")
public class NotificaController {
	
	@Autowired
	private NotificaService ns;
	
	@GetMapping("notifiche")
	public ResponseEntity<Object> getNotifiche() {
		List<Notifica> notifiche = ns.getAll();
		
		if(notifiche.isEmpty()) {
			return new ResponseEntity<>("Notifiche non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(notifiche, HttpStatus.CREATED);
	}
	
	@GetMapping("notifiche/cerca")
	public List<Notifica> getAllNotificheByUtente(@RequestParam("utente") Utente utente) {
		return ns.getAllByUtente(utente);
	}
	
	@GetMapping("notifiche/{id}")
	public ResponseEntity<Object> getNotificaById(@PathVariable int id) {
		Optional<Notifica> notificaObj = ns.getById(id);
		
		if(notificaObj.isEmpty()) {
			return new ResponseEntity<>("Notifica non trovata", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(notificaObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("notifiche")
	public ResponseEntity<Object> createNotifica(@RequestBody Notifica n) {
		Notifica notifica = ns.save(n);
		
		return new ResponseEntity<Object>(notifica, HttpStatus.CREATED);
	}
	
	@PutMapping("notifiche/{id}")
	public ResponseEntity<Object> updateNotifica(@PathVariable int id, @RequestBody Notifica _notifica) {
		Optional<Notifica> notificaObj = ns.getById(id);
		
		if(notificaObj.isEmpty()) {
			return new ResponseEntity<Object>("Notifica non trovata", HttpStatus.NOT_FOUND);
		}
		
		Notifica notifica = notificaObj.get();
		
		notifica.setUtente(_notifica.getUtente());
		notifica.setOpera(_notifica.getOpera());
		notifica.setMessaggio(_notifica.getMessaggio());
		notifica.setVisualizzato(_notifica.isVisualizzato());
		
		ns.save(notifica);
		
		return new ResponseEntity<Object>(notifica, HttpStatus.CREATED);
	}
	
	@DeleteMapping("notifiche/{id}")
	public ResponseEntity<Object> deleteNotifica(@PathVariable int id) {
		Optional<Notifica> notificaObj = ns.getById(id);
		
		if(notificaObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		ns.delete(notificaObj.get());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
