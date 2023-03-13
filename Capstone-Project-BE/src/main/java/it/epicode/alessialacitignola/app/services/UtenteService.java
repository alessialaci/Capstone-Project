package it.epicode.alessialacitignola.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.repositories.UtenteRepository;

@Service
public class UtenteService {

	@Autowired
	private UtenteRepository ur;
	
	public List<Utente> getAll() {
		return ur.findAll();
	}
	
	public Page<Utente> getAllInPages(Pageable pageable) {
		return ur.findAll(pageable);
	}
	
	public Optional<Utente> getById(int id) {
		return ur.findById(id);
	}
	
	public Utente save(Utente u) {
		return ur.save(u);
	}
	
	public void delete(Utente u) {
		ur.delete(u);
	}

}
