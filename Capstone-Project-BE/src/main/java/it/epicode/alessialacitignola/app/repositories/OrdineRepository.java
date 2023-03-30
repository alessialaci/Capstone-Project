package it.epicode.alessialacitignola.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.Ordine;
import it.epicode.alessialacitignola.app.entities.Utente;

@Repository
public interface OrdineRepository extends JpaRepository<Ordine, Integer> {

	List<Ordine> findByCompratore(Utente compratore);
	
}
