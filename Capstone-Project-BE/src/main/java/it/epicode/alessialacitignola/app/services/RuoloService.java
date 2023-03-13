package it.epicode.alessialacitignola.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.alessialacitignola.app.entities.Ruolo;
import it.epicode.alessialacitignola.app.repositories.RuoloRepository;

@Service
public class RuoloService {

	@Autowired
	private RuoloRepository rr;
	
	public List<Ruolo> getAll() {
		return rr.findAll();
	}
	
	public Page<Ruolo> getAllInPages(Pageable pageable) {
		return rr.findAll(pageable);
	}
	
	public Optional<Ruolo> getById(int id) {
		return rr.findById(id);
	}
	
	public Ruolo save(Ruolo r) {
		return rr.save(r);
	}
	
	public void delete(Ruolo r) {
		rr.delete(r);
	}

}
