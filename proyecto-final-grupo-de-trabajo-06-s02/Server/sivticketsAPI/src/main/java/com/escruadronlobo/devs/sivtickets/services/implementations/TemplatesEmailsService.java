package com.escruadronlobo.devs.sivtickets.services.implementations;

import com.escruadronlobo.devs.sivtickets.models.entities.SystemRequest;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.repositories.RequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


@Service
public class TemplatesEmailsService {
    @Autowired
    RequestRepository requestRepository;

    @Transactional(rollbackOn = Exception.class)
    public String generateValidationLink(User user) throws NoSuchAlgorithmException {

        String temp = "Usa este enlace para validar tu cuenta y establecer una contraseña \n";

<<<<<<< Updated upstream
        String url = "http://localhost:5173/setPassword/";
=======
        String url = "https://sivtickets.fun/setPassword/";
>>>>>>> Stashed changes

        SystemRequest req = new SystemRequest(user, "VALIDATION");

        SystemRequest result = requestRepository.save(req);

        url = temp + url + result.getRequestId().toString();

        System.out.println(url);

        return url;
    }

}
