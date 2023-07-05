package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.Purchase;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PurcharseRepository extends JpaRepository<Purchase, UUID> {
    Page<Purchase> findAllByUserId(User user, Pageable pageable);
    Purchase findByUserIdAndPurchaseId(User user, UUID purchase_id);

    int countByCantTicketEquals(int quantity);
    int countByCantTicketIsGreaterThan(int quantity);
}
