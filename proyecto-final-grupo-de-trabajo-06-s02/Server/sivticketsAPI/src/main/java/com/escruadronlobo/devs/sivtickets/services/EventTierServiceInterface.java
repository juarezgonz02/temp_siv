package com.escruadronlobo.devs.sivtickets.services;

import com.escruadronlobo.devs.sivtickets.models.dto.req.EventTiersDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.EventTiers;
<<<<<<< Updated upstream
=======
import com.escruadronlobo.devs.sivtickets.models.entities.Location;
import com.escruadronlobo.devs.sivtickets.models.entities.SeatsBlock;
>>>>>>> Stashed changes

import java.util.List;

public interface EventTierServiceInterface {
<<<<<<< Updated upstream
    EventTiersDTO createEventTier(EventTiersDTO eventTierDTO);
    EventTiers getEventTierById(String eventTierId) throws Exception;
    List<EventTiersDTO> getAllEventTiers();

    List<EventTiers> getEventTierByCode(String code) throws Exception;
=======
    void createEventTier(EventTiersDTO eventTierDTO, String event_code, String location_id) throws Exception;
    List<EventTiers> getEventTierByCode(String code) throws Exception;
    List<Location> getAllLocations();
    List<SeatsBlock> getTiersByLocationId(String locationId) throws Exception;
>>>>>>> Stashed changes
}