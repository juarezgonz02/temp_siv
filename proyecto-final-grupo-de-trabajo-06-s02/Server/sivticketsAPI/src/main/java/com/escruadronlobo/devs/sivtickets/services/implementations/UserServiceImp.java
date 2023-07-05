package com.escruadronlobo.devs.sivtickets.services.implementations;

import com.escruadronlobo.devs.sivtickets.models.dto.req.UpdatePermissionsDTO;
import com.escruadronlobo.devs.sivtickets.models.dto.req.UserToUpdateDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.*;
import com.escruadronlobo.devs.sivtickets.repositories.*;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import com.escruadronlobo.devs.sivtickets.utils.JWTTools;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserServiceInterface {

    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserXpermissionRepository userXpermissionRepository;

    @Autowired
    private RequestRepository requestRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void changeUserPermission(UpdatePermissionsDTO data) throws Exception{

        data.getUpdate().forEach(userToUpdate -> {
            Optional<User> userFoundByEmail = userRepository.findByEmail(userToUpdate.getEmail());

            userFoundByEmail.ifPresent(user -> {

                Set<Permission> userPermissions = new HashSet<>(userFoundByEmail.get().getPermissions().stream().map(UserXPermission::getPermissionId).toList());


                userPermissions.addAll(userToUpdate.getPermissions().stream().map(name -> new Permission("P_"+name, name)).toList());


                List<UserXPermission> userXPermissions = userPermissions.stream().map(permission -> new UserXPermission(user, permission)).toList();

                System.out.println(userXPermissions.toString());

                userXpermissionRepository.saveAll(userXPermissions);

                });
            });
    }

    @Override
    public void deactivateUser(UUID user_id) {

    }

    @Override
    public User findOneByIdentifer(String identifier) {
        return null;
    }

    @Override
    public User findOneByEmail(String username) {
        return userRepository.findByEmail(username).get();
    }

    @Override
    public Boolean comparePassword(String toCompare, String current) {
        return passwordEncoder.matches(toCompare, current);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Token registerToken(User user) throws Exception {
        cleanTokens(user);

        String tokenString = jwtTools.generateToken(user);
        Token token = new Token(tokenString, user);

        tokenRepository.save(token);

        return token;
    }

    @Override
    public Boolean isTokenValid(User user, String token) {
        try {
            //cleanTokens(user);
            List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

            tokens.stream()
                    .filter(tk -> tk.getContent().equals(token))
                    .findAny()
                    .orElseThrow(() -> new Exception());

            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void cleanTokens(User user) throws Exception {

        List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

        tokens.forEach(token -> {
            if(jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                tokenRepository.save(token);
            }
        });

    }

    @Override
    public User findUserAuthenticated() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(username).get();
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void setUserPasswordWithRequestId(String request_id, String password, String newPassword) throws Exception {


        UUID reqId = UUID.fromString(request_id);

        Optional<SystemRequest> req = requestRepository.findByRequestIdAndFinished(reqId, false);

        if(req.isPresent()){
            User user = req.get().getUserId();
            req.get().setFinished(true);
            req.get().setFinishedTime(Calendar.getInstance().getTime());

            requestRepository.save(req.get());
            verifyUser(user);

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

        }else{
            throw new Exception("REQ_CODE_INVALID");
        }




    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void changeUserPassword(String password, String newPassword) throws Exception {

        User user = findUserAuthenticated();
        if(comparePassword(password, user.getPassword())){

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

        }else{
            throw new Exception("PASS_NO_MATCH");
        }

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void verifyUser(User user) {
        user.setIsVerified(true);
        userRepository.save(user);
    }
}
