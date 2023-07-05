package com.escruadronlobo.devs.sivtickets.services.implementations;

import com.escruadronlobo.devs.sivtickets.models.dto.req.EventTiersDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.models.entities.EventTiers;
<<<<<<< Updated upstream
=======
import com.escruadronlobo.devs.sivtickets.models.entities.Location;
import com.escruadronlobo.devs.sivtickets.models.entities.SeatsBlock;
>>>>>>> Stashed changes
import com.escruadronlobo.devs.sivtickets.repositories.EventRepository;
import com.escruadronlobo.devs.sivtickets.repositories.EventTiersRepository;
import com.escruadronlobo.devs.sivtickets.repositories.LocationRepository;
import com.escruadronlobo.devs.sivtickets.repositories.SeatsBlockRepository;
import com.escruadronlobo.devs.sivtickets.services.EventTierServiceInterface;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventTiersServiceImp implements EventTierServiceInterface {


    @Autowired
    private EventTiersRepository eventTierRepository;

    @Autowired
    private EventRepository eventRepository;
<<<<<<< Updated upstream

    public EventTiersDTO createEventTier(EventTiersDTO eventTierDTO) {
        EventTiers eventTier = new EventTiers();

        /*
        eventTier.setBloqueAsientoId(eventTierDTO.getBloqueAsientoId());
        eventTier.setEventoId(eventTierDTO.getEventoId());
        eventTier.setLocalidadId(eventTierDTO.getIdLocalidad())
                */
        eventTier.setNumbered(eventTierDTO.isNumerado());
        eventTier.setRequestedName(eventTierDTO.getNombreSolicitado());
        eventTier.setPrice(eventTierDTO.getPrecio());
=======

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private SeatsBlockRepository blocksRepository;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createEventTier(EventTiersDTO eventTierDTO, String event_code, String location_id) throws Exception {

        List<Event> ev = eventRepository.findAllByCode(UUID.fromString(event_code));
        Optional<Location> lc = locationRepository.findById(UUID.fromString(location_id));

        if(lc.isEmpty()){
            throw new Exception("INVALID_LOCATION_CODE");
        }

        eventTierDTO.getBlockID().forEach((blockId, info) -> {

            ev.forEach(event -> {

                event.setLocationId(lc.get());

                EventTiers eventTier = new EventTiers();

                eventTier.setLocationId(lc.get());
                eventTier.setEventId(event);
                eventTier.setNumbered(info.isNo_numbered());
                eventTier.setRequestedName(info.getName());
                eventTier.setName(info.getBlock_name());
                eventTier.setPrice(info.getPrice());

            eventTierRepository.save(eventTier);
            eventRepository.save(event);
            });

        });
>>>>>>> Stashed changes


    }

    public EventTiers getEventTierById(String eventTierId) throws Exception {
      Optional<EventTiers> eventTier = eventTierRepository.findById(UUID.fromString(eventTierId));

        if (eventTier.isEmpty()) {
            throw new Exception("TIERCODEINVALID");
        }
            return eventTier.get();
    }

    @Override
    public List<EventTiers> getEventTierByCode(String code) throws Exception {

        Optional<Event> et = eventRepository.findFirstByCodeOrEventId(UUID.fromString(code), UUID.fromString(code));

        if(et.isPresent()){

            return eventTierRepository.findByEventId(et.get());
        }else{
            throw new Exception("CODEINVALID");
        }
    }

    @Override
<<<<<<< Updated upstream
    public List<EventTiers> getEventTierByCode(String code) throws Exception {

        Optional<Event> et = eventRepository.findFirstByCodeOrEventId(UUID.fromString(code), UUID.fromString(code));

        if(et.isPresent()){

            return eventTierRepository.findByEventId(et.get());
        }else{
            throw new Exception("CODEINVALID");
        }
    }

    private EventTiersDTO convertToDTO(EventTiers eventTier) {
        EventTiersDTO eventTierDTO = new EventTiersDTO();
        /*
        eventTierDTO.setBloqueAsientoId(eventTier.getBloqueAsientoId());
        eventTierDTO.setEventoId(eventTier.getEventoId());
        eventTierDTO.setIdLocalidad(eventTier.getIdLocalidad());

         */
        eventTierDTO.setNumerado(eventTier.isNumbered());
        eventTierDTO.setNombreSolicitado(eventTier.getRequestedName());
        eventTierDTO.setPrecio(eventTier.getPrice());
        return eventTierDTO;
=======
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
>>>>>>> Stashed changes
    }

    @Override
    public List<SeatsBlock> getTiersByLocationId(String locationId) throws Exception {

        try{
            Optional<Location> lc = locationRepository.findById(UUID.fromString(locationId));

            if(lc.isEmpty()){
                throw new Exception("INVALID_CODE");
            }

            return blocksRepository.findAllByLocationId(lc.get());
        }catch (Exception e){
            throw new Exception("INVALID_CODE");
        }
    }


}
