package com.escruadronlobo.devs.sivtickets.services.implementations;

import com.escruadronlobo.devs.sivtickets.models.dto.req.EventDTO;
<<<<<<< Updated upstream
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.models.entities.UserXEvent;
=======
import com.escruadronlobo.devs.sivtickets.models.dto.req.SaveEventDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Category;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.models.entities.UserXEvent;
import com.escruadronlobo.devs.sivtickets.repositories.CategoryRepository;
>>>>>>> Stashed changes
import com.escruadronlobo.devs.sivtickets.repositories.EventRepository;
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.repositories.UserXEventRepository;
import com.escruadronlobo.devs.sivtickets.services.EventServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


<<<<<<< Updated upstream
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
=======
import java.util.*;
>>>>>>> Stashed changes

@Service
public class EventServiceImp implements EventServiceInterface {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserXEventRepository userXEventRepository;
<<<<<<< Updated upstream
=======

    @Autowired
    private CategoryRepository categoryRepository;
>>>>>>> Stashed changes

    @Autowired
    public EventServiceImp(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Autowired
    private UserServiceInterface userService;
    public EventDTO createEvent(EventDTO eventDTO) {
        // Mapeo del DTO al modelo de datos
        Event event = new Event();
        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setDate(eventDTO.getDate());
        // Otros mapeos según tus necesidades

        // Guardar el evento en el repositorio
        Event savedEvent = eventRepository.save(event);

        // Mapeo del modelo de datos al DTO de respuesta
        EventDTO createdEventDTO = new EventDTO();
        createdEventDTO.setTitle(savedEvent.getTitle());
        createdEventDTO.setDescription(savedEvent.getDescription());
        createdEventDTO.setDate(savedEvent.getDate());
        // Otros mapeos según tus necesidades

        return createdEventDTO;
    }

    public List<EventDTO> getAllEvents() {
        // Obtener todos los eventos del repositorio
        List<Event> events = eventRepository.findAll();

        // Mapeo de los eventos al DTO de respuesta
        List<EventDTO> eventDTOs = new ArrayList<>();
        for (Event event : events) {
            EventDTO eventDTO = new EventDTO();
            eventDTO.setTitle(event.getTitle());
            eventDTO.setDescription(event.getDescription());
            eventDTO.setDate(event.getDate());
            // Otros mapeos según tus necesidades

            eventDTOs.add(eventDTO);
        }

        return eventDTOs;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Event createEmptyEvent() {

        Event ev = new Event(UUID.randomUUID());
        eventRepository.save(ev);

        User u = userService.findUserAuthenticated();
<<<<<<< Updated upstream
        UserXEvent uxe = new UserXEvent(u, ev);
=======
        UserXEvent uxe = new UserXEvent(u, ev, true, true);
>>>>>>> Stashed changes

        userXEventRepository.save(uxe);

        return ev;
    }

    @Override
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    public List<Event> getByCode(String code) {

        return eventRepository.findAllByCode(UUID.fromString(code));
    }

    @Override
    public List<Event> getBillboardEvents() {
        return eventRepository.findAllByState("SELLING");
    }
<<<<<<< Updated upstream
=======

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveEvent(SaveEventDTO eventInfo, String event_code) throws Exception {
        List<Event> events = eventRepository.findAllByCode(UUID.fromString(event_code));

        Optional<Category> ct = categoryRepository.findById(eventInfo.getInfo().getCategory());

        if(events.size() == 0 || ct.isEmpty()){
            throw new Exception("INVALID_CODE");
        }

         if (events.size() < eventInfo.getDates().size()) {

            int left = eventInfo.getDates().size() - events.size();

            for (int i = 0; i < left; i++) {
                events.add(new Event(UUID.fromString(event_code)));
            }


        }

        for (int i = 0; i < eventInfo.getDates().size(); i++){
            Event ev = events.get(i);
            Date dt = eventInfo.getDates().get(i);

            ev.setTitle(eventInfo.getInfo().getTitle());
            ev.setDescription(eventInfo.getInfo().getDescription());
            ev.setCategory(ct.get());
            ev.setState("DISABLED");
            ev.setDuration(eventInfo.getInfo().getDuration());

            ev.setDate(dt);

            eventRepository.save(ev);

        }

        for(int i = 0; i < eventInfo.getEmployees().size(); i++){

            SaveEventDTO.EmployeeDTO dto = eventInfo.getEmployees().get(i);
            User employee = userService.findOneByEmail(dto.getEmail());

            if(employee == null){
              throw new Exception("INVALID_EMAIL=  "+dto.getEmail());
            }

            List<UserXEvent> uxe = events.stream().map(event ->
                new UserXEvent(employee, event, dto.isPromoter(), dto.isValidator() )
            ).toList();

            userXEventRepository.saveAll(uxe);
        }

    }

    @Override
    public List<UserXEvent> getEditableEvents() {

        User u = userService.findUserAuthenticated();
        return userXEventRepository.findByUserId(u);
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public void setImg(String eventCode, String url) {
        List<Event> ev = eventRepository.findAllByCode(UUID.fromString(eventCode));

        ev.forEach(event -> {
            event.setBanner(url);
        });

        eventRepository.saveAll(ev);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void switchState(String eventCode) throws Exception{
        List<Event> ev = eventRepository.findAllByCode(UUID.fromString(eventCode));
        ev.forEach( event ->
        {
            if(event.getState().equals("DISABLED")){
                 event.setState("SELLING");
            } else {
                 event.setState("DISABLED");
            }

            eventRepository.save(event);
        });
    }
>>>>>>> Stashed changes
}
