package it.epicode.alessialacitignola.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.Offerta;

@Repository
public interface OffertaRepository extends JpaRepository<Offerta, Integer> {

}
