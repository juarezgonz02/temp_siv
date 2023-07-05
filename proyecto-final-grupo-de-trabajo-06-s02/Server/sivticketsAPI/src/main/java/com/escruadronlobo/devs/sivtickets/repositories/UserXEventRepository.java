package com.escruadronlobo.devs.sivtickets.repositories;

<<<<<<< Updated upstream
=======
import com.escruadronlobo.devs.sivtickets.models.entities.Event;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
>>>>>>> Stashed changes
import com.escruadronlobo.devs.sivtickets.models.entities.UserXEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

<<<<<<< Updated upstream
=======
import java.util.List;
>>>>>>> Stashed changes
import java.util.UUID;

@Repository
public interface UserXEventRepository extends JpaRepository<UserXEvent, UUID> {
<<<<<<< Updated upstream
=======
    List<UserXEvent> findByUserId (User u);
>>>>>>> Stashed changes
}
