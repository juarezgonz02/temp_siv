package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.Ticket;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface AccountTicketsRepository extends ListCrudRepository<Ticket, UUID> {
    // Aquí puedes agregar métodos personalizados para consultas específicas si es necesario
}
