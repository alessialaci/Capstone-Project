package it.epicode.alessialacitignola.app.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import it.epicode.alessialacitignola.app.entities.FotoOpera;
import it.epicode.alessialacitignola.app.services.FotoOperaService;

@RestController
@RequestMapping("/app/")
public class FotoController {
	
	@Autowired
	private FotoOperaService fs;

	@GetMapping("foto")
	public ResponseEntity<Object> getFoto() {
		List<FotoOpera> foto = fs.getAll();
		
		if(foto.isEmpty()) {
			return new ResponseEntity<>("Foto non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(foto, HttpStatus.CREATED);
	}
	
	@GetMapping("foto_page")
	public ResponseEntity<Object> getFotoInPages(Pageable pageable) {
		Page<FotoOpera> foto = fs.getAllInPages(pageable);
		
		if(foto.isEmpty()) {
			return new ResponseEntity<>("Foto non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(foto, HttpStatus.OK);
	}
	
	@GetMapping("foto/{id}")
	public ResponseEntity<Object> getFotoById(@PathVariable int id) {
		Optional<FotoOpera> fotoObj = fs.getById(id);
		
		if(fotoObj.isEmpty()) {
			return new ResponseEntity<>("Foto non trovata", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(fotoObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("foto")
	public ResponseEntity<Object> createFoto(@RequestBody FotoOpera f) {
		FotoOpera foto = fs.save(f);
		
		return new ResponseEntity<Object>(foto, HttpStatus.CREATED);
	}
	
//	@PostMapping("foto")
//	  public void createFoto(@RequestBody MultipartFile file) throws IOException {
//	    // Generate a unique filename for the uploaded file
//	    String filename = UUID.randomUUID().toString() + ".jpeg";
//
//	    // Save the file in the src/assets/img/opere folder
//	    Path filepath = Paths.get("src", "assets", "img", "opere", filename);
//	    Files.createDirectories(filepath.getParent());
//	    Files.write(filepath, file.getBytes());
//
//	    // Create a new FotoOpera object and insert it into the foto_opere table in PostgreSQL
//	    FotoOpera foto = FotoOpera.builder()
//	        .urlFoto("/assets/img/opere/" + filename)
//	        .build();
//	    fs.save(foto);
//	  }
	
	@PutMapping("foto/{id}")
	public ResponseEntity<Object> updateFoto(@PathVariable int id, @RequestBody FotoOpera _foto) {
		Optional<FotoOpera> fotoObj = fs.getById(id);
		
		if(fotoObj.isEmpty()) {
			return new ResponseEntity<Object>("Foto non trovata", HttpStatus.NOT_FOUND);
		}
		
		FotoOpera foto = fotoObj.get();
		
		foto.setFile(_foto.getFile());
		
		fs.save(foto);
		
		return new ResponseEntity<Object>(foto, HttpStatus.CREATED);
	}
	
	@DeleteMapping("foto/{id}")
	public ResponseEntity<Object> deleteFoto(@PathVariable int id) {
		Optional<FotoOpera> fotoObj = fs.getById(id);
		
		if(fotoObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		fs.delete(fotoObj.get());
		
		return new ResponseEntity<>(String.format("Foto con id %d eliminata", id), HttpStatus.OK);
	}
	
}
