package com.escruadronlobo.devs.sivtickets.services;

import com.escruadronlobo.devs.sivtickets.models.dto.req.EventDTO;
<<<<<<< Updated upstream
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
=======
import com.escruadronlobo.devs.sivtickets.models.dto.req.SaveEventDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Category;
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.models.entities.UserXEvent;
>>>>>>> Stashed changes

import java.util.List;

public interface EventServiceInterface {
    EventDTO createEvent(EventDTO eventDTO);
    List<EventDTO> getAllEvents();
    Event createEmptyEvent();
    List<Event> getByCode(String code);

    List<Event> getBillboardEvents();
<<<<<<< Updated upstream
=======

    void saveEvent(SaveEventDTO eventInfo, String event_code) throws Exception;

    List<UserXEvent> getEditableEvents();

    List<Category> getCategories();

    void setImg(String eventCode, String url);

    void switchState(String eventCode) throws Exception;
>>>>>>> Stashed changes
}