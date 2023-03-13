package it.epicode.alessialacitignola.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.Ruolo;

@Repository
public interface RuoloRepository extends JpaRepository<Ruolo, Integer> {

}
