package com.escruadronlobo.devs.sivtickets.services.implementations;

import com.escruadronlobo.devs.sivtickets.models.dto.res.OAuthLoggingType;
import com.escruadronlobo.devs.sivtickets.models.dto.res.OauthLoggingDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Token;
import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.repositories.UserRepository;
import com.escruadronlobo.devs.sivtickets.services.UserServiceInterface;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.escruadronlobo.devs.sivtickets.services.AuthServiceInterface;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

@Service
public class AuthServiceImp implements AuthServiceInterface{

	@Value("${client.id}")
	private String CLIENT_ID;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserServiceInterface userService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User authWithCredentials(String identifier, String password) throws Exception {

		Optional<User> user = userRepository.findByEmail(identifier);

		if (user.isEmpty()) {
			throw new Exception("Usuario no encontrado");
		}

		if(!user.get().getIsVerified()){
			return null;

		}
		System.out.println(userService.comparePassword(password, user.get().getPassword()));

		if(userService.comparePassword(password, user.get().getPassword())) {
			return user.get();
		}

		return null;
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public OauthLoggingDTO checkToken(String token) throws GeneralSecurityException, IOException {


		OauthLoggingDTO res = new OauthLoggingDTO();

		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
				// Specify the CLIENT_ID of the app that accesses the backend:
				.setAudience(Collections.singletonList(CLIENT_ID))
				// Or, if multiple clients access the backend:
				//.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
				.build();

		// (Receive idTokenString by HTTPS POST)

		GoogleIdToken idToken = verifier.verify(token);
		if (idToken != null) {
			Payload payload = idToken.getPayload();

			// Print user identifier
			String userId = payload.getSubject();
			System.out.println("User ID: " + userId);

			// Get profile information from payload
			String email = payload.getEmail();
			String name = (String) payload.get("name");

			Optional<User> info = userRepository.findByEmail(email);

			if(info.isEmpty()){
				res.setType(OAuthLoggingType.CREATE);

				User newUser = new User(name, email, passwordEncoder.encode("Tepoad1@"));

				User n = userRepository.save(newUser);
				System.out.println(n);
				res.setUser(newUser);

				return res;
			}

			if(info.get().getIsVerified()){

				res.setType(OAuthLoggingType.REGISTERED);
				res.setUser(info.get());

				return res;
			}
			else{
				res.setType(OAuthLoggingType.UNVERIFIED);
				res.setUser(info.get());

				return res;
			}



		} else {
			System.out.println("Invalid ID token.");
			return null;
		}

	}

	@Override
	public Token authWithOauthToken(String token) {
		// TODO Auto-generated method stub
		return null;
	}

}
