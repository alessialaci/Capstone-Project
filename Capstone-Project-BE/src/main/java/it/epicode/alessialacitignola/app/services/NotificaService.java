package it.epicode.alessialacitignola.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.alessialacitignola.app.entities.Notifica;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.repositories.NotificaRepository;

@Service
public class NotificaService {

	@Autowired
	private NotificaRepository nr;
	
	public List<Notifica> getAll() {
		return nr.findAll();
	}
	
	public Page<Notifica> getAllInPages(Pageable pageable) {
		return nr.findAll(pageable);
	}
	
	public List<Notifica> getAllByUtente(Utente utente) {
		return nr.findByUtente(utente);
	}
	
	public Optional<Notifica> getById(int id) {
		return nr.findById(id);
	}
	
	public Notifica save(Notifica n) {
		return nr.save(n);
	}
	
	public void delete(Notifica n) {
		nr.delete(n);
	}
	
}
