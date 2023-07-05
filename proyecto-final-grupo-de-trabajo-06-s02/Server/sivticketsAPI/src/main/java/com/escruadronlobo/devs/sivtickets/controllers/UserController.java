package com.escruadronlobo.devs.sivtickets.controllers;

import com.escruadronlobo.devs.sivtickets.models.dto.req.UpdatePermissionsDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.models.entities.UserXPermission;
import com.escruadronlobo.devs.sivtickets.services.DataServiceInterface;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import com.escruadronlobo.devs.sivtickets.utils.ErrorHandlers;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Permissions;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserServiceInterface userService;

    @Autowired
    private ErrorHandlers handler;

    @PutMapping("/permision/update")
    public ResponseEntity<?> updateUserPermisssions (@Valid @RequestBody UpdatePermissionsDTO data, BindingResult result){

        if(result.hasErrors()) {
            return new ResponseEntity<>(handler.mapErrors(result.getFieldErrors()), HttpStatus.BAD_REQUEST);
        }

        try {
            userService.changeUserPermission(data);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(){
        Map<String, List<UserXPermission>> userList = new HashMap<>();

        userService.getAllUsers().forEach(user -> {
            userList.put(user.getEmail(), user.getPermissions());
        });

        return new ResponseEntity<>(userList, HttpStatus.OK);
    }


}
