package com.escruadronlobo.devs.sivtickets.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "seats_blocks")
public class SeatsBlock {
    @Id
    @Column(name = "block_id")
    @GeneratedValue(strategy = GenerationType.AUTO)

    private UUID blockId;

    @Column(name = "name")
    private String name;

    @Column(name = "number_seats")
    private Integer numberSeats;

    @ManyToOne(fetch = FetchType.EAGER)

    @JoinColumn(name = "location_id")
    private Location locationId;


}
