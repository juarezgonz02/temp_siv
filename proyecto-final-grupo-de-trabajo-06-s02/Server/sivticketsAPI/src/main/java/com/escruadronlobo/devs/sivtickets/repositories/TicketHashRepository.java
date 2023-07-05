package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.TicketHash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TicketHashRepository extends JpaRepository<TicketHash, UUID> {
    Optional<TicketHash> findByHash(String hash);

<<<<<<< Updated upstream
    int countTicketHashesByValidDateIsNotNullAndValidDateBetween(Date validDate, Date validDate2);
=======
    //int countTicketHashesByEventIdByValidDateIsNotNullAndValidDateBetween(Date validDate, Date validDate2);
>>>>>>> Stashed changes

    int countByValidDateIsNotNull();
}
