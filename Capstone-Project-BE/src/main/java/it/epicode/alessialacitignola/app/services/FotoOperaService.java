package it.epicode.alessialacitignola.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.alessialacitignola.app.entities.FotoOpera;
import it.epicode.alessialacitignola.app.repositories.FotoOperaRepository;

@Service
public class FotoOperaService {
	
	@Autowired
	private FotoOperaRepository fr;
	
	public List<FotoOpera> getAll() {
		return fr.findAll();
	}
	
	public Page<FotoOpera> getAllInPages(Pageable pageable) {
		return fr.findAll(pageable);
	}
	
	public Optional<FotoOpera> getById(int id) {
		return fr.findById(id);
	}
	
	public FotoOpera save(FotoOpera f) {
		return fr.save(f);
	}
	
	public void delete(FotoOpera f) {
		fr.delete(f);
	}

}
