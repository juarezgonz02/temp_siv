package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.models.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TicketsRepository extends JpaRepository<Ticket, UUID> {
    int countByEventId(Event event);


}
