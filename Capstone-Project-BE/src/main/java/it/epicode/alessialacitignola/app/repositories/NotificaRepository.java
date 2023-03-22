package it.epicode.alessialacitignola.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.Notifica;
import it.epicode.alessialacitignola.app.entities.Utente;

@Repository
public interface NotificaRepository extends JpaRepository<Notifica, Integer> {
	
	List<Notifica> findByUtente(Utente utente);

}
