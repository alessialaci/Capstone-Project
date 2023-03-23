package it.epicode.alessialacitignola.app.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.Offerta;
import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.entities.Utente;

@Repository
public interface OffertaRepository extends JpaRepository<Offerta, Integer> {

	List<Offerta> findByOpera(Opera opera);

}