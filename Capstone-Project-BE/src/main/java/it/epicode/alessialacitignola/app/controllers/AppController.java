package it.epicode.alessialacitignola.app.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {

	@GetMapping("/home")
	public String home() {
		return "Benvenuti nella homepage";
	}
	
}
