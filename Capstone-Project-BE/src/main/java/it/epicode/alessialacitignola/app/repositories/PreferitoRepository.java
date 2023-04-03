package it.epicode.alessialacitignola.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.Preferito;
import it.epicode.alessialacitignola.app.entities.Utente;

@Repository
public interface PreferitoRepository extends JpaRepository<Preferito, Integer> {

	List<Preferito> findByUtente(Utente utente);
	
}
