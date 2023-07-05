package com.escruadronlobo.devs.sivtickets.controllers;

<<<<<<< Updated upstream
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.services.EventServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.EventTierServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
=======
import com.escruadronlobo.devs.sivtickets.models.dto.req.EventTiersDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.req.SaveEventDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.req.UploadDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.models.entities.Location;
import com.escruadronlobo.devs.sivtickets.models.entities.SeatsBlock;
import com.escruadronlobo.devs.sivtickets.models.entities.UserXEvent;
import com.escruadronlobo.devs.sivtickets.services.EventServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.EventTierServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.implementations.S3StorageServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Block;
>>>>>>> Stashed changes
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
<<<<<<< Updated upstream
import java.util.Map;

@RestController
@RequestMapping("/event/creation")
=======
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/events/creation")
>>>>>>> Stashed changes
@CrossOrigin("*")
public class EventCreationController {
    @Autowired
    EventTierServiceInterface eventTierService;

    @Autowired
    EventServiceInterface eventService;

<<<<<<< Updated upstream
    @PostMapping("/new")
=======
    @Autowired
    S3StorageServiceImp storageService;

    @PostMapping ("/new")
>>>>>>> Stashed changes
    public ResponseEntity<?> newEvent (){

        Map<String, String> messages = new HashMap<>();
        try {

            Event newEvent = eventService.createEmptyEvent();
            messages.put("code", newEvent.getCode().toString());
            messages.put("type", "CREATED");

            return new ResponseEntity<>(messages, HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            messages.put("type", "INVALID");
            return new ResponseEntity<>(messages, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


<<<<<<< Updated upstream
=======
    @GetMapping("/editable/")
    public ResponseEntity<?> editableEvents(){
        List<Event> events = eventService.getEditableEvents().stream().map(UserXEvent::getEventId).toList();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }


    @GetMapping("/categories/")
    public ResponseEntity<?> getCategories(){
        return new ResponseEntity<>(eventService.getCategories(), HttpStatus.OK);

    }

    @PutMapping("/save/{event_code}")
    public ResponseEntity<?> saveData(
            @RequestBody SaveEventDTO eventInfo,
            @PathVariable String event_code
    ) {

        try {

            eventService.saveEvent(eventInfo, event_code);
            return new ResponseEntity<>(
                    "UPDATED",
                    HttpStatus.OK
            );

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.BAD_REQUEST
            );

        }
    }

    @PostMapping("/img/update/{event_code}")
    public ResponseEntity<?> setImgForEvent(
            @PathVariable String event_code,
            @RequestParam String url
    ){
        try{


        eventService.setImg(event_code, url);

            return new ResponseEntity<>(
                 HttpStatus.OK
            );

        }catch (Exception e){

            return new ResponseEntity<>(
                HttpStatus.BAD_REQUEST
            );
        }

    }



    @PostMapping("/img/set/{event_code}")
    public ResponseEntity<?> setImgForEvent(
            @RequestBody UploadDTO uploadBean,
            @PathVariable String event_code
    ) {

        try{

        String url = storageService.store(uploadBean);
        Map<String, String> messages = new HashMap<>();

        messages.put("url", url);

        eventService.setImg(event_code, url);

        return new ResponseEntity<>(
                messages,
                HttpStatus.OK
        );


        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/switch/{event_code}")
    public ResponseEntity<?> switchEventState(
            @PathVariable String event_code
    ){
        try{
            eventService.switchState(event_code);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (Exception e){

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping("location/all")
    public ResponseEntity<?> getAllLocations(){
        List<Location> locations = eventTierService.getAllLocations();
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    @PostMapping("location/setTiers/{location_id}/{event_code}")
        public ResponseEntity<?> setTiersForEvent(
                @PathVariable String event_code,
                @PathVariable String location_id,
                @RequestBody EventTiersDTO tiersInfo
    ){

        try{
            eventTierService.createEventTier(tiersInfo, event_code, location_id);
            return new ResponseEntity<>(HttpStatus.CREATED);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }


    }

    @GetMapping("location/tiers/{location_id}/")
        public ResponseEntity<?> getTiersForLocId(
                @PathVariable String location_id
    ){

        try{
            List<SeatsBlock> blocks = eventTierService.getTiersByLocationId(location_id);
            return new ResponseEntity<>(blocks, HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }
>>>>>>> Stashed changes
}
