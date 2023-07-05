package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.Location;
import com.escruadronlobo.devs.sivtickets.models.entities.SeatsBlock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SeatsBlockRepository extends JpaRepository<SeatsBlock, UUID> {
    List<SeatsBlock> findAllByLocationId(Location location);
}
