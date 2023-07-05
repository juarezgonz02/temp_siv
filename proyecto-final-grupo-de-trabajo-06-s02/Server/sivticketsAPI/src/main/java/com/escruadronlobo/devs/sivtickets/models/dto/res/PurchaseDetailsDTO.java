package com.escruadronlobo.devs.sivtickets.models.dto.res;

import com.escruadronlobo.devs.sivtickets.models.entities.Purchase;
import com.escruadronlobo.devs.sivtickets.models.entities.Ticket;
import lombok.Data;

import java.util.List;

@Data
public class PurchaseDetailsDTO {

    private List<Ticket> tickets;

    private Purchase purchase;

    private Short total_tickets;
    public PurchaseDetailsDTO(Purchase data) {
        tickets = data.getTickets();

        purchase = data;

        total_tickets = (short) tickets.size();
    }
}
