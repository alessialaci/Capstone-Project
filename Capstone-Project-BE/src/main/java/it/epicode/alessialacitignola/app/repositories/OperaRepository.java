package it.epicode.alessialacitignola.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.Opera;

@Repository
public interface OperaRepository extends JpaRepository<Opera, Integer> {

}
