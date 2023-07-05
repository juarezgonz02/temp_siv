package com.escruadronlobo.devs.sivtickets.services;

import com.escruadronlobo.devs.sivtickets.models.dto.req.UpdatePermissionsDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Token;
import com.escruadronlobo.devs.sivtickets.models.entities.User;

import java.util.List;
import java.util.UUID;

public interface UserServiceInterface {

    List<User> getAllUsers();

    void changeUserPermission(UpdatePermissionsDTO data) throws Exception;

    void deactivateUser(UUID user_id);

    User findOneByIdentifer(String identifier);

    User findOneByEmail(String username);

    Boolean comparePassword(String toCompare, String current);

    Token registerToken(User user) throws Exception;

    Boolean isTokenValid(User user, String token);

    void cleanTokens(User user) throws Exception;

    User findUserAuthenticated();

    void setUserPasswordWithRequestId(String request_id, String password, String newPassword) throws Exception;

    void changeUserPassword(String password, String newPassword) throws Exception;

    void verifyUser(User user);
}
