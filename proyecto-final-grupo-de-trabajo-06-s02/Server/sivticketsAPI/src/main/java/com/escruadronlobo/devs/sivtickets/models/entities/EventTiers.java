package com.escruadronlobo.devs.sivtickets.models.entities;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "tiers")
public class EventTiers {

    @Id
    @Column(name = "tier_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID tierId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    @JsonIgnore
    private Event eventId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id")
    @JsonIgnore
    private Location locationId;

    @Column(name = "numbered")
    private boolean numbered;

    @Column(name = "requested_name")
    private String requestedName;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private double price;
}
