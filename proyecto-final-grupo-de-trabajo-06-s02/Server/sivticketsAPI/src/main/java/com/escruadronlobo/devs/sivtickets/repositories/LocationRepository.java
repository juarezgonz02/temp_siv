package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LocationRepository extends JpaRepository<Location, UUID> {
}
