package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.SystemRequest;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface RequestRepository extends ListCrudRepository<SystemRequest, UUID> {
    Optional<SystemRequest> findByRequestIdAndFinished(UUID request_id, Boolean finished);

}
