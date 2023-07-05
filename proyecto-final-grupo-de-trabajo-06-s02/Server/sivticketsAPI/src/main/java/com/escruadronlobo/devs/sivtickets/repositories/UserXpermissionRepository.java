package com.escruadronlobo.devs.sivtickets.repositories;

import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.models.entities.UserXPermission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserXpermissionRepository extends JpaRepository<UserXPermission, UserXPermission.UXPIdClass> {


}
