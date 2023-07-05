package com.escruadronlobo.devs.sivtickets.repositories;



import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
    // Aquí puedes agregar métodos personalizados para consultas específicas si es necesario
    List<Event> findAllByCode(UUID code);

<<<<<<< Updated upstream
=======
    Optional<Event> findOneByCode(UUID code);

>>>>>>> Stashed changes
    List<Event> findAllByState(String state);

    Optional<Event> findFirstByCodeOrEventId(UUID code, UUID eventId);
}
