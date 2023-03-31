package it.epicode.alessialacitignola.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.Opera;
import it.epicode.alessialacitignola.app.entities.enums.TipoOpera;

@Repository
public interface OperaRepository extends JpaRepository<Opera, Integer> {

	List<Opera> findByTipo(TipoOpera tipo);
	
}
