package com.escruadronlobo.devs.sivtickets.services.implementations;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;

import com.escruadronlobo.devs.sivtickets.models.dto.res.CountDataDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.repositories.EventRepository;
import com.escruadronlobo.devs.sivtickets.repositories.TicketHashRepository;
import com.escruadronlobo.devs.sivtickets.repositories.TicketsRepository;
import com.escruadronlobo.devs.sivtickets.services.EventServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.escruadronlobo.devs.sivtickets.models.dto.req.TransferTicketDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Ticket;
import com.escruadronlobo.devs.sivtickets.models.entities.TicketHash;
import com.escruadronlobo.devs.sivtickets.services.TicketsServiceInterface;

@Service
public class TicketsServiceImp implements TicketsServiceInterface{

	@Autowired
	TicketHashRepository hashRepository;

	@Autowired
	TicketsRepository ticketRepository;

	@Autowired
	EventRepository eventRepository;

	@Autowired
	UserServiceInterface userService;

	@Override
	public void transferTicket(TransferTicketDTO data) {
		// TODO Auto-generated method stub
		
	}
	private static String bytesToHex(byte[] hash) {
		StringBuilder hexString = new StringBuilder(2 * hash.length);
		for (int i = 0; i < hash.length; i++) {
			String hex = Integer.toHexString(0xff & hash[i]);
			if(hex.length() == 1) {
				hexString.append('0');
			}
			hexString.append(hex);
		}
		return hexString.toString();
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public TicketHash getCode(UUID ticket_id) throws Exception {


		Optional<Ticket> tk = ticketRepository.findById(ticket_id);

		if(tk.isEmpty()){
			throw new Exception("INVALID_CODE");
		}

		Date dt = Calendar.getInstance().getTime();


		TicketHash hash = new TicketHash(
				tk.get(), new Date(dt.getTime() + 60000), dt
				);


		MessageDigest digest = MessageDigest.getInstance("SHA-256");
		byte[] encodedhash = digest.digest(
				UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));

		hash.setHash(bytesToHex(encodedhash));

		hashRepository.save(hash);


		return hash;
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void validateHash(String hash, String event_id) throws Exception {

		Optional<TicketHash> th = hashRepository.findByHash(hash);
		Optional<Event> ev = eventRepository.findById(UUID.fromString(event_id));

		if(th.isEmpty() || ev.isEmpty()){
			throw new Exception("INVALID_CODE");
		}

		if(th.get().getTicketId().getEventId() != ev.get()){
			throw new Exception("INVALID_EVENT");
		}

		if(th.get().getExpDate().compareTo(Calendar.getInstance().getTime()) < 0){
			throw new Exception("TICKET_EXPIRED");

		}

		if(th.get().getValidDate() == null){

			Date dt = Calendar.getInstance().getTime();
			th.get().setValidDate(dt);
			hashRepository.save(th.get());

            Ticket ticket = th.get().getTicketId();
            ticket.setState("VALIDATED");

            ticketRepository.save(ticket);

		}else{
			throw new Exception("TICKET_ALREADY_VALIDATED");
		}

	}

	@Override
	public List<Ticket> findAllTickets(UUID user_id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CountDataDTO countData(String eventId) throws Exception {


		Optional<Event> ev = eventRepository.findById(UUID.fromString(eventId));

		if(ev.isEmpty()){
			throw new Exception("INVALID CODE");
		}

		List<Ticket> tickets = ev.get().getTicketList();

		return new CountDataDTO(tickets.size(), tickets.stream().filter(tk -> tk.getState().equals("VALIDATED")).toList().size());
	}

}
