package com.escruadronlobo.devs.sivtickets.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "userxevent")
public class UserXEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    @Column(name = "userxevent_id")
    private UUID userxeventId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    private Event eventId;

    @Column(name = "promoter")
    private Boolean isPromoter;

    @Column(name = "validator")
    private Boolean isValidator;



<<<<<<< Updated upstream
    public UserXEvent(User userId, Event eventId) {
        this.userId = userId;
        this.eventId = eventId;
=======
    public UserXEvent(User userId, Event eventId, Boolean isPromoter, Boolean isValidator) {
        this.userId = userId;
        this.eventId = eventId;
        this.isPromoter = isPromoter;
        this.isValidator = isValidator;
>>>>>>> Stashed changes
    }
}
