package com.escruadronlobo.devs.sivtickets.models.entities;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "tickets")
public class    Ticket {

    @Id
    @Column(name = "ticket_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID ticketId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "purcharse_id")
    private Purchase purchaseId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    private Event eventId;

    @Column(name = "seat")
    private String seat;

    @Column(name = "state")
    private String state;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tier_id")
    private EventTiers tierId;

    public Ticket(Purchase purchaseId, Event eventId, String seat, String state, EventTiers tierId) {
        this.purchaseId = purchaseId;
        this.eventId = eventId;
        this.seat = seat;
        this.state = state;
        this.tierId = tierId;
    }
}
