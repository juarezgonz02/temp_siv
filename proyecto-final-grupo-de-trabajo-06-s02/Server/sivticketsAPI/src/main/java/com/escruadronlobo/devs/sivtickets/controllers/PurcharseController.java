package com.escruadronlobo.devs.sivtickets.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.escruadronlobo.devs.sivtickets.models.dto.res.PageDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.res.PurchaseDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.escruadronlobo.devs.sivtickets.models.dto.req.NewSaleDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.res.MessageDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Purchase;
import com.escruadronlobo.devs.sivtickets.services.PurcharseServicesInterfaces;
import com.escruadronlobo.devs.sivtickets.utils.ErrorHandlers;

import jakarta.validation.Valid;

@RequestMapping("/account/purchases")
@RestController
@CrossOrigin("*")

public class PurcharseController {

	@Autowired
	PurcharseServicesInterfaces purcharseService;

    @Autowired
    private ErrorHandlers handler;
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllPurcharses(@RequestParam(defaultValue = "0", required = false) int page,
											  @RequestParam(defaultValue = "10", required = false) int limit){

		MessageDTO<String> messages = new MessageDTO<>();

		Page<Purchase> data = purcharseService.getAllPurcharse(page, limit);
		
		if(data == null) {
			messages.getMessages().put("info", "Invalid user ID");
			return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);
		}
		
		PageDTO<?> res = new PageDTO<>(data);
		
		return new ResponseEntity<>(res, HttpStatus.OK);
		
	}

	@GetMapping("/{purchase_id}")
	public ResponseEntity<?> getPurcharseDetails(@PathVariable String purchase_id){

		try{
		//TODO: Procesar JWT token o la forma que Douglas indique para la autentificación
		UUID ID = UUID.fromString(purchase_id);

		MessageDTO<String> messages = new MessageDTO<>();

		Purchase data = purcharseService.getPurcharseById(ID);

		PurchaseDetailsDTO details = new PurchaseDetailsDTO(data);

		if(data == null) {
			messages.getMessages().put("info", "Invalid user ID");
			return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(details, HttpStatus.OK);


		}catch (Exception e){
			e.printStackTrace();
			return new ResponseEntity<>("INVALID", HttpStatus.BAD_REQUEST);

		}
	}
	
	@PostMapping("/new")
	public ResponseEntity<?> newPucharse(@RequestBody @Valid NewSaleDTO newSale, BindingResult result) throws Exception {
		
		
    	if(result.hasErrors()) {
    		return new ResponseEntity<>(handler.mapErrors(result.getFieldErrors()), HttpStatus.BAD_REQUEST);
    	}

		MessageDTO<String> messages = new MessageDTO<>();

    	messages.getMessages().put("message", "created");

		purcharseService.createPurcharse(newSale);
		
		return new ResponseEntity<>(messages, HttpStatus.CREATED);
		
		
	}
}
