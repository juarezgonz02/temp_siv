package com.escruadronlobo.devs.sivtickets.controllers;

import com.escruadronlobo.devs.sivtickets.models.dto.req.EventTiersDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.EventTiers;
import com.escruadronlobo.devs.sivtickets.services.EventTierServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/event-tiers")
public class EventTiersController {

    @Autowired
    private EventTierServiceInterface eventTiersService;


    /*
    @GetMapping("/{eventTierId}")
    public ResponseEntity<EventTiersDTO> getEventTierById(@PathVariable String eventTierId) {

        try {

        EventTiers eventTier = eventTiersService.getEventTierById(eventTierId);
        if (eventTier != null) {
            return ResponseEntity.ok(eventTier);
        } else {
            return ResponseEntity.notFound().build();
        }
        }catch (Exception e){
            return new ResponseEntity<>();
        }
    }*/

}
