package com.escruadronlobo.devs.sivtickets.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.escruadronlobo.devs.sivtickets.models.dto.req.TransferTicketDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Ticket;
import com.escruadronlobo.devs.sivtickets.models.entities.TicketHash;
import com.escruadronlobo.devs.sivtickets.services.TicketsServiceInterface;
import com.escruadronlobo.devs.sivtickets.utils.ErrorHandlers;

import jakarta.validation.Valid;

@RequestMapping("/account/tickets")
@RestController
@CrossOrigin("*")
public class AccountTicketsController {

	
	@Autowired
	TicketsServiceInterface ticketsService;
	
	@Autowired
	ErrorHandlers handler;
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllTicketsFromAccount(){
		
		//TODO: Procesar JWT token o la forma que Douglas indique para la autentificación

		UUID user_id = UUID.fromString("");
		List<Ticket> tickets = ticketsService.findAllTickets(user_id);

		return new ResponseEntity<>(tickets, HttpStatus.OK);
	}
	
	@GetMapping("/hash/{ticket_id}")
	public ResponseEntity<?> getTicketValidationCode(@PathVariable String ticket_id){

		UUID id = UUID.fromString(ticket_id);

		try {
			TicketHash hash = ticketsService.getCode(id);
			return new ResponseEntity<>(hash, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/transfer")
	public ResponseEntity<?> transferTicketTo(@RequestBody @Valid TransferTicketDTO data, BindingResult result){
		
		if(result.hasErrors()) {
			return new ResponseEntity<>(handler.mapErrors(result.getFieldErrors()), HttpStatus.BAD_REQUEST);
		}

		ticketsService.transferTicket(data);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
