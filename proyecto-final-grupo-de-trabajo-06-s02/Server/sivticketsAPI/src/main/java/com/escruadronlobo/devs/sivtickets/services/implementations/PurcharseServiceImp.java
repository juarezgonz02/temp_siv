package com.escruadronlobo.devs.sivtickets.services.implementations;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

import com.escruadronlobo.devs.sivtickets.models.entities.*;
import com.escruadronlobo.devs.sivtickets.repositories.EventRepository;
import com.escruadronlobo.devs.sivtickets.repositories.PurcharseRepository;
import com.escruadronlobo.devs.sivtickets.repositories.TicketXUserRespository;
import com.escruadronlobo.devs.sivtickets.repositories.TicketsRepository;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.escruadronlobo.devs.sivtickets.models.dto.req.NewSaleDTO;
import com.escruadronlobo.devs.sivtickets.services.PurcharseServicesInterfaces;

@Service
public class PurcharseServiceImp implements PurcharseServicesInterfaces {


    @Autowired
    private PurcharseRepository purcharseRepository;

    @Autowired
    private TicketsRepository ticketsRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventTiersServiceImp eventTiersServiceImp;

    @Autowired
    private UserServiceInterface userService;

    @Autowired
    private TicketXUserRespository ticketXUserRespository;

    @Override
    public Page<Purchase> getAllPurcharse(int page, int limit) {

        Pageable pageable = PageRequest.of(page, limit);
        return purcharseRepository.findAllByUserId(userService.findUserAuthenticated(), pageable);
    }

    @Override
    public Purchase getPurcharseById(UUID purcharse_id) {
        return purcharseRepository.findByUserIdAndPurchaseId(userService.findUserAuthenticated(), purcharse_id);

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createPurcharse(NewSaleDTO sale) throws Exception {


        Optional<Event> e = eventRepository.findById(UUID.fromString(sale.getEvent_id()));

        if (e.isEmpty()) {
            throw new Exception("EVENT_INVALID");
        }

        Purchase purchase = new Purchase(
                userService.findUserAuthenticated(),
                eventRepository.findById(UUID.fromString(sale.getEvent_id())).orElse(null),
                "COMPLETED",
                sale.getTotal(),
                Calendar.getInstance().getTime()
        );

        purcharseRepository.save(purchase);

        sale.getSeats().keySet().forEach(
                tier -> {
                    try {

                        EventTiers eventTiers = eventTiersServiceImp.getEventTierById(tier);

                        sale.getSeats().get(tier).forEach(
                                seat -> {
                                    Ticket tk = new Ticket(
                                            purchase, e.get(), seat, "NO_VALIDATED", eventTiers

                                    );

                                    ticketsRepository.save(tk);

                                    TicketXUser ticketXUser = new TicketXUser(
                                            userService.findUserAuthenticated(),
                                            tk,
                                            null,
                                            Calendar.getInstance().getTime()
                                    );

                                    ticketXUserRespository.save(ticketXUser);
                                }
                        );
                    } catch (Exception ex) {
                        ex.printStackTrace();
                        throw new RuntimeException(ex);
                    }

                }
        );
    }

}
