package it.epicode.alessialacitignola.app.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.alessialacitignola.app.entities.Utente;
import it.epicode.alessialacitignola.app.security.JwtUtils;
import it.epicode.alessialacitignola.app.security.LoginRequest;
import it.epicode.alessialacitignola.app.security.LoginResponse;
import it.epicode.alessialacitignola.app.security.UserDetailsImpl;
import it.epicode.alessialacitignola.app.services.UtenteService;

@RestController
@RequestMapping("/auth/")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UtenteService us;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private PasswordEncoder pwEncoder;
	
	@PostMapping(value = "login", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		authentication.getAuthorities();
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new LoginResponse(userDetails.getId(), jwt, userDetails.getUsername(), userDetails.getEmail(), roles, userDetails.getExpirationTime()));
	}
	
	@GetMapping("logout")
	public String logout() {
		return "Utente disconnesso!";
	}
	
	// METODO PER CRIPTARE LA PASSWORD DEGLI UTENTI PROVA
	@GetMapping("update_pw_utente")
	@ResponseBody
	public String update_user_pw() {
		int id1 = 1;
		int id2 = 2;
		
		Utente u1 = us.getById(id1).get();
		String pw1 = u1.getPassword();
		u1.setPassword( pwEncoder.encode(pw1) );
		us.save(u1);
		
		Utente u2 = us.getById(id2).get();
		String pw2 = u2.getPassword();
		u2.setPassword( pwEncoder.encode(pw2) );
		us.save(u2);
		
		return "Utenti aggiornati";
	}

}
