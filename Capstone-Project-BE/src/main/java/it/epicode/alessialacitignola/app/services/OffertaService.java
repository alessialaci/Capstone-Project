package it.epicode.alessialacitignola.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.alessialacitignola.app.entities.Offerta;
import it.epicode.alessialacitignola.app.repositories.OffertaRepository;

@Service
public class OffertaService {

	@Autowired
	private OffertaRepository or;
	
	public List<Offerta> getAll() {
		return or.findAll();
	}
	
	public Page<Offerta> getAllInPages(Pageable pageable) {
		return or.findAll(pageable);
	}
	
	public Optional<Offerta> getById(int id) {
		return or.findById(id);
	}
	
	public Offerta save(Offerta o) {
		return or.save(o);
	}
	
	public void delete(Offerta o) {
		or.delete(o);
	}

}
