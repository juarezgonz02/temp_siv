package com.escruadronlobo.devs.sivtickets.controllers;

import com.escruadronlobo.devs.sivtickets.models.dto.res.EntranceDataDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.res.MessageDTO;
import com.escruadronlobo.devs.sivtickets.services.DataServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/analysis")
public class DataController {

    @Autowired
    DataServiceInterface dataService;

    @GetMapping("/{event_id}")
    public ResponseEntity<?> getEventResumeDataAnalysis(@RequestParam UUID event_id){

        MessageDTO<Object> message = new MessageDTO<>();

        //TODO: VALIDAR QUE EXISTA EL EVENTO

        Integer soldTickets = dataService.ticketsSoldByEvent(event_id);
        Integer validatedTicket = dataService.validatedTicketsByEvent(event_id);
        EntranceDataDTO entranceDataByEvent = dataService.entranceDataByEvent(event_id);
        List<Date> validateHoursByEvents = dataService.validateHoursByEvents(event_id);

        message.getMessages().put("sold_tickets", soldTickets);
        message.getMessages().put("validated_tickets", validatedTicket);
        message.getMessages().put("entrance_data", entranceDataByEvent);
        message.getMessages().put("validate_hours", validateHoursByEvents);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

<<<<<<< Updated upstream
    @GetMapping("/test")
=======
    @GetMapping("/events")
>>>>>>> Stashed changes
    public ResponseEntity<?> testaccess(){

        MessageDTO<Object> message = new MessageDTO<>();

        message.getMessages().put("info", "HAS ACCESS HERE");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
