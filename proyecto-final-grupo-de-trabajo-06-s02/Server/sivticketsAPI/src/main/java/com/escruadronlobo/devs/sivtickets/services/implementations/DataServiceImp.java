package com.escruadronlobo.devs.sivtickets.services.implementations;

import com.escruadronlobo.devs.sivtickets.models.dto.res.EntranceDataDTO;
import com.escruadronlobo.devs.sivtickets.services.DataServiceInterface;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class DataServiceImp implements DataServiceInterface {

    @Override
    public int ticketsSoldByEvent(UUID event_id) {
        return 0;
    }

    @Override
    public int validatedTicketsByEvent(UUID event_id) {
        return 0;
    }

    @Override
    public EntranceDataDTO entranceDataByEvent(UUID event_id) {
        return null;
    }

    @Override
    public List<Date> validateHoursByEvents(UUID event_id) {
        return null;
    }
}
