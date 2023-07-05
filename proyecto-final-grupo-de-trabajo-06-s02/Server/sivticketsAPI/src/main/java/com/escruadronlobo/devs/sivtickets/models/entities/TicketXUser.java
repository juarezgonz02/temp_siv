package com.escruadronlobo.devs.sivtickets.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "ticketxuser")
public class TicketXUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ticketxuser_id")
    private UUID ticketxuser_id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_id")
    private Ticket ticketId;

    @JsonIgnore
    @Column(name= "previous_user_id")
    private UUID previousUserId;

    @JsonIgnore
    @Column(name="association_date")
    private Date associationDate;

    public TicketXUser(User userId, Ticket ticketId, UUID previousUserId, Date associationDate) {
        this.userId = userId;
        this.ticketId = ticketId;
        this.previousUserId = previousUserId;
        this.associationDate = associationDate;
    }


}
