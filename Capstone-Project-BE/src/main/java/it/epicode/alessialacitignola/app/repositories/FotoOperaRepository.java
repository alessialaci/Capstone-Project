package it.epicode.alessialacitignola.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.alessialacitignola.app.entities.FotoOpera;
import it.epicode.alessialacitignola.app.entities.Opera;

@Repository
public interface FotoOperaRepository extends JpaRepository<FotoOpera, Integer> {

	List<FotoOpera> findByOpera(Opera opera);
	
}
