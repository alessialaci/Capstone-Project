package it.epicode.alessialacitignola.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.alessialacitignola.app.entities.Preferito;
import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.repositories.PreferitoRepository;

@Service
public class PreferitoService {
	
	@Autowired
	private PreferitoRepository pr;
	
	public List<Preferito> getAll() {
		return pr.findAll();
	}
	
	public Page<Preferito> getAllInPages(Pageable pageable) {
		return pr.findAll(pageable);
	}
	
	public List<Preferito> getAllByUtente(Utente utente) {
		return pr.findByUtente(utente);
	}
	
	public Optional<Preferito> getById(int id) {
		return pr.findById(id);
	}
	
	public Preferito save(Preferito p) {
		return pr.save(p);
	}
	
	public void delete(Preferito p) {
		pr.delete(p);
	}

}
