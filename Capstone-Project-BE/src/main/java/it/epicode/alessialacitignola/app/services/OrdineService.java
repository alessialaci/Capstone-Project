package it.epicode.alessialacitignola.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.alessialacitignola.app.entities.Ordine;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.repositories.OrdineRepository;

@Service
public class OrdineService {
	
	@Autowired
	private OrdineRepository or;
	
	public List<Ordine> getAll() {
		return or.findAll();
	}
	
	public Page<Ordine> getAllInPages(Pageable pageable) {
		return or.findAll(pageable);
	}
	
	public List<Ordine> getAllByUtente(Utente compratore) {
		return or.findByCompratore(compratore);
	}
	
	public Optional<Ordine> getById(int id) {
		return or.findById(id);
	}
	
	public Ordine save(Ordine o) {
		return or.save(o);
	}
	
	public void delete(Ordine o) {
		or.delete(o);
	}

}
