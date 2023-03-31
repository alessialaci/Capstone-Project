package it.epicode.alessialacitignola.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.entities.enums.TipoOpera;
import it.epicode.alessialacitignola.app.repositories.OperaRepository;

@Service
public class OperaService {

	@Autowired
	private OperaRepository or;
	
	public List<Opera> getAll() {
		return or.findAll();
	}
	
	public Page<Opera> getAllInPages(Pageable pageable) {
		return or.findAll(pageable);
	}
	
	public Optional<Opera> getById(int id) {
		return or.findById(id);
	}
	
	public List<Opera> getByTipo(TipoOpera tipo) {
		return or.findByTipo(tipo);
	}
	
	public Opera save(Opera o) {
		return or.save(o);
	}
	
	public void delete(Opera o) {
		or.delete(o);
	}

}
