package com.escruadronlobo.devs.sivtickets.controllers;

import com.escruadronlobo.devs.sivtickets.models.dto.EmailDetails;
import com.escruadronlobo.devs.sivtickets.models.dto.req.UpdatePasswordDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.res.OAuthLoggingType;
import com.escruadronlobo.devs.sivtickets.models.dto.res.OauthLoggingDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Token;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.services.EmailServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import com.escruadronlobo.devs.sivtickets.utils.ErrorHandlers;
import com.escruadronlobo.devs.sivtickets.services.implementations.TemplatesEmailsService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.escruadronlobo.devs.sivtickets.models.dto.req.AuthDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.res.MessageDTO;
import com.escruadronlobo.devs.sivtickets.services.AuthServiceInterface;


@RequestMapping("/auth")
@RestController
@CrossOrigin("*")

public class AuthController {
		
	@Autowired
	AuthServiceInterface authService;

	@Autowired
	UserServiceInterface userService;
	
    @Autowired
    private ErrorHandlers handler;

	@Autowired
	TemplatesEmailsService emailLinkGenerator;

	@Autowired
	private EmailServiceInterface emailService;

	@PostMapping("/login")
	public ResponseEntity<?> loginWithCredentials(@RequestBody @Valid AuthDTO credentials, BindingResult result){

		try{

    	if(result.hasErrors()) {
    		return new ResponseEntity<>(handler.mapErrors(result.getFieldErrors()), HttpStatus.BAD_REQUEST);
    	}

		User foundUser = authService.authWithCredentials(credentials.getCredentials(), credentials.getPassword());

		MessageDTO<Object> messages = new MessageDTO<>();

		if(foundUser != null && foundUser.getIsVerified() ){

			Token token = userService.registerToken(foundUser);
			messages.getMessages().put("img", "");
			messages.getMessages().put("type", OAuthLoggingType.REGISTERED);
			messages.getMessages().put("email", foundUser.getEmail());
			messages.getMessages().put("name", foundUser.getName());
<<<<<<< Updated upstream
			messages.getMessages().put("access", foundUser.getPermissions().stream().map(up -> up.getPermissionId().getName()));
=======
			messages.getMessages().put("authorized", foundUser.getPermissions().stream().map(up -> up.getPermissionId().getName()).toList());
>>>>>>> Stashed changes
			messages.getMessages().put("token", token.getContent());
		}
		else if(foundUser != null){
			messages.getMessages().put("type", OAuthLoggingType.UNVERIFIED);
		}
		else{
			messages.getMessages().put("type", OAuthLoggingType.CREDENTIALS);
		}

		return new ResponseEntity<>(messages, HttpStatus.OK);

		}catch (Exception e){
			e.printStackTrace();
			MessageDTO<String> messages = new MessageDTO<>();
			messages.getMessages().put("info", "User NOT found");

			return new ResponseEntity<>(messages, HttpStatus.UNAUTHORIZED);

		}
	}

	@PostMapping("/oauth2")
	public ResponseEntity<?> ouathLogin(@RequestHeader(HttpHeaders.AUTHORIZATION) String tokenHeader){

		tokenHeader = tokenHeader.substring(7);

		try {

			MessageDTO<Object> messages = new MessageDTO<>();
		
			OauthLoggingDTO info = authService.checkToken(tokenHeader);
			System.out.println(info.toString());
			Token token = userService.registerToken(info.getUser());

			messages.getMessages().put("img", "");

			messages.getMessages().put("type", info.getType());

			messages.getMessages().put("email", info.getUser().getEmail());

			messages.getMessages().put("name", info.getUser().getName());



			if(info.getType() == OAuthLoggingType.CREATE){
				EmailDetails details = new EmailDetails();

				details.setSubject("✅ Verifica tu email para empezar a comprar en SivTickets!!");
				details.setRecipient(info.getUser().getEmail());
				details.setMsgBody(emailLinkGenerator.generateValidationLink(info.getUser()));

				emailService.sendSimpleMail(details);
			}
			else if(info.getType() == OAuthLoggingType.REGISTERED) {
<<<<<<< Updated upstream
				messages.getMessages().put("autorized", info.getUser().getPermissions());
=======
				messages.getMessages().put("authorized", info.getUser().getPermissions().stream().map(up -> up.getPermissionId().getName()).toList());
>>>>>>> Stashed changes
				messages.getMessages().put("token", token.getContent());
			}


			return new ResponseEntity<>(messages, HttpStatus.OK);

		}
		catch (Exception e){

			MessageDTO<Object> messages = new MessageDTO<>();
			e.printStackTrace();
			messages.getMessages().put("type", OAuthLoggingType.INVALID);
			return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/setPassword/{request_id}")
	public ResponseEntity<?> setPassword(@PathVariable String request_id,
										 @RequestBody @Valid UpdatePasswordDTO passwords, BindingResult result){

		try {
			System.out.println(request_id);

			if(result.hasErrors()) {
				return new ResponseEntity<>(handler.mapErrors(result.getFieldErrors()), HttpStatus.BAD_REQUEST);
			}

			userService.setUserPasswordWithRequestId(request_id, passwords.getPassword(), passwords.getNew_password());
			return new ResponseEntity<>(HttpStatus.OK);

		}
		catch (Exception e){

			MessageDTO<Object> messages = new MessageDTO<>();
			messages.getMessages().put("CODE", e.getMessage());
			return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);

		}
	}

}
