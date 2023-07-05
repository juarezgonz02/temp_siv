package com.escruadronlobo.devs.sivtickets.controllers;

import com.escruadronlobo.devs.sivtickets.models.dto.req.UpdatePasswordDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.res.MessageDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import com.escruadronlobo.devs.sivtickets.utils.ErrorHandlers;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/account/")
@RestController
@CrossOrigin("*")
public class AccountController {

    @Autowired
    UserServiceInterface userService;

    @Autowired
    ErrorHandlers handler;

    @GetMapping("/")
    public ResponseEntity<?> loginWithCredentials(){

        User u = userService.findUserAuthenticated();
        MessageDTO<Object> messages = new MessageDTO<>();

        messages.getMessages().put("email", u.getEmail());
        messages.getMessages().put("name", u.getName());
        messages.getMessages().put("access", u.getPermissions().stream().map(up -> up.getPermissionId().getName()));

        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody @Valid UpdatePasswordDTO passwords, BindingResult result){

        try {
            if(result.hasErrors()) {
                return new ResponseEntity<>(handler.mapErrors(result.getFieldErrors()), HttpStatus.BAD_REQUEST);
            }

            userService.changeUserPassword(passwords.getPassword(), passwords.getNew_password());
            return new ResponseEntity<>(HttpStatus.OK);

        }
        catch (Exception e){

            MessageDTO<Object> messages = new MessageDTO<>();
            messages.getMessages().put("CODE", e.getMessage());
            return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);

        }
    }
}
