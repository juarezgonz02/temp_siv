package com.escruadronlobo.devs.sivtickets.services;

import java.util.List;
import java.util.UUID;

import com.escruadronlobo.devs.sivtickets.models.dto.req.TransferTicketDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.res.CountDataDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Ticket;
import com.escruadronlobo.devs.sivtickets.models.entities.TicketHash;

public interface TicketsServiceInterface {

	void validateHash(String hash, String event_id) throws Exception;

	void transferTicket(TransferTicketDTO data);

	TicketHash getCode(UUID ticket_id) throws Exception;
	
	List<Ticket> findAllTickets(UUID user_id);

	CountDataDTO countData(String eventId) throws Exception;
}
