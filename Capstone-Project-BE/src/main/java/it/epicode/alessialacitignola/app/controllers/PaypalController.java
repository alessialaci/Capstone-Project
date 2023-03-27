package it.epicode.alessialacitignola.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import it.epicode.alessialacitignola.app.entities.Ordine;
import it.epicode.alessialacitignola.app.services.PaypalService;

@RestController
@RequestMapping("/api/paypal/")
public class PaypalController {

	@Autowired
	private PaypalService paypalService;
	
	public static final String SUCCESS_URL = "pay/success";
	public static final String CANCEL_URL = "pay/cancel";

	@PostMapping("payment")
	public ResponseEntity<String> processPayment(@RequestBody Ordine order) {
	    try {
	        Payment payment = paypalService.createPayment(order.getPrezzo(), order.getValuta(), order.getMetodo(),
	                order.getIntent(), order.getDescrizione(), "http://localhost:9090/" + CANCEL_URL,
	                "http://localhost:9090/" + SUCCESS_URL);
	        for (Links link : payment.getLinks()) {
	            if (link.getRel().equals("approval_url")) {
	                return ResponseEntity.ok(link.getHref());
	            }
	        }
	    } catch (PayPalRESTException e) {
	        e.printStackTrace();
	    }
	    return ResponseEntity.badRequest().build();
	}

	@GetMapping("cancel")
	public String cancelPay() {
	    return "cancel";
	}

	@GetMapping("success")
	public ResponseEntity<String> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
	    try {
	        Payment payment = paypalService.executePayment(paymentId, payerId);
	        System.out.println(payment.toJSON());
	        if (payment.getState().equals("approved")) {
	            return ResponseEntity.ok("success");
	        }
	    } catch (PayPalRESTException e) {
	        System.out.println(e.getMessage());
	    }
	    return ResponseEntity.badRequest().build();
	}

}
