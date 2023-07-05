package com.escruadronlobo.devs.sivtickets.models.entities;


<<<<<<< Updated upstream
=======
import com.fasterxml.jackson.annotation.JsonIgnore;
>>>>>>> Stashed changes
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "localities")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
<<<<<<< Updated upstream

    @Column(name = "location_id")
    private UUID location_id;

    @Column(name = "address")
    private String address;

=======
    @Column(name = "location_id")
    private UUID location_id;

    @JsonIgnore
    @Column(name = "address")
    private String address;

    @JsonIgnore
>>>>>>> Stashed changes
    @Column(name = "ability")
    private String ability;

    @Column(name = "name")
    private String name;

<<<<<<< Updated upstream
    @Column(name = "map_src")
    private String map_src;

=======
    @Column(name = "no_numbered")
    private boolean no_numbered;

    @JsonIgnore
    @Column(name = "map_src")
    private String map_src;

    @JsonIgnore
>>>>>>> Stashed changes
    @Column(name = "location")
    private String location;
}
