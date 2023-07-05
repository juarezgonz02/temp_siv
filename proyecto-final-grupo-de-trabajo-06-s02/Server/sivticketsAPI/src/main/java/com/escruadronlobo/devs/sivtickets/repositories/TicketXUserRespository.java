package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.TicketXUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TicketXUserRespository extends JpaRepository<TicketXUser, UUID> {
}
