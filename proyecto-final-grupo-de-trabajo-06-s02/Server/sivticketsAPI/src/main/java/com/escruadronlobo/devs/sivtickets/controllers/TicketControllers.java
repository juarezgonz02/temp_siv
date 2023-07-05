package com.escruadronlobo.devs.sivtickets.controllers;

import com.escruadronlobo.devs.sivtickets.models.dto.req.TransferTicketDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.res.CountDataDTO;
<<<<<<< Updated upstream
=======
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
>>>>>>> Stashed changes
import com.escruadronlobo.devs.sivtickets.models.entities.UserXEvent;
import com.escruadronlobo.devs.sivtickets.services.TicketsServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import com.escruadronlobo.devs.sivtickets.utils.ErrorHandlers;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/tickets/")
@RestController
@CrossOrigin("*")
public class TicketControllers {


    @Autowired
    TicketsServiceInterface ticketsService;

    @Autowired
    UserServiceInterface userService;

    @Autowired
    ErrorHandlers handler;

    @PostMapping("/validate/{event_id}/{hash}")
    public ResponseEntity<?> validateTicket(@PathVariable String event_id, @PathVariable String hash){

        try {
            ticketsService.validateHash(hash,event_id);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/events")
    public ResponseEntity<?> getValidationEvents(){
<<<<<<< Updated upstream
        List<UserXEvent> userXEventList = userService.findUserAuthenticated().getParticipationEvents().stream().filter(UserXEvent::getIsValidator).collect(Collectors.toList());
=======
        List<Event> userXEventList = userService.findUserAuthenticated().getParticipationEvents().stream().filter(UserXEvent::getIsValidator).map(UserXEvent::getEventId).collect(Collectors.toList());
>>>>>>> Stashed changes
        return new ResponseEntity<>(userXEventList, HttpStatus.OK);
    }

    @GetMapping("/validate/count/{event_id}")
    public ResponseEntity<?> getValidatedData(@PathVariable String event_id){

        try {
            CountDataDTO dataDTO = ticketsService.countData(event_id);
            return new ResponseEntity<>(dataDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }



}


