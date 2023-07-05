package com.escruadronlobo.devs.sivtickets.services;

import com.escruadronlobo.devs.sivtickets.models.dto.res.OauthLoggingDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Token;
import com.escruadronlobo.devs.sivtickets.models.entities.User;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Optional;

public interface AuthServiceInterface {

	User authWithCredentials(String identifier, String password) throws Exception;
		
	OauthLoggingDTO checkToken(String token) throws GeneralSecurityException, IOException;
	
	Token authWithOauthToken(String token);
}
