package com.escruadronlobo.devs.sivtickets.controllers;

import com.escruadronlobo.devs.sivtickets.models.dto.req.EventDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.models.entities.EventTiers;
import com.escruadronlobo.devs.sivtickets.services.EventTierServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.implementations.EventServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventServiceImp eventService;

    @Autowired
    private EventTierServiceInterface eventTiersService;

    @Autowired
    public EventController(EventServiceImp eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/create")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        EventDTO createdEvent = eventService.createEvent(eventDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        //List<EventDTO> events = eventService.getAllEvents();
        //return ResponseEntity.ok(events);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{code}")
    public ResponseEntity<?> getByCode (@PathVariable String code){

        List<Event> events = eventService.getByCode(code);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("/billboard")
    public ResponseEntity<?> billboardEvents() {

        List<Event> events = eventService.getBillboardEvents();

        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("/tiers/{code}")
    public ResponseEntity<?> tierByCode(@PathVariable String code) {

        try {
        List<EventTiers> events = eventTiersService.getEventTierByCode(code);
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }
}
