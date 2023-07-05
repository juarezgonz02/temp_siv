package com.escruadronlobo.devs.sivtickets.services;

import com.escruadronlobo.devs.sivtickets.models.dto.res.EntranceDataDTO;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface DataServiceInterface {

    public int ticketsSoldByEvent(UUID event_id);

    public int validatedTicketsByEvent(UUID event_id);

    public EntranceDataDTO entranceDataByEvent(UUID event_id);

    public List<Date> validateHoursByEvents(UUID event_id);



}
