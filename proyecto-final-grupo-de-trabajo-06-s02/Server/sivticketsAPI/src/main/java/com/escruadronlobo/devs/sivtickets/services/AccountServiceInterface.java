package com.escruadronlobo.devs.sivtickets.services;

import java.util.UUID;

import com.escruadronlobo.devs.sivtickets.models.entities.User;

public interface AccountServiceInterface {

	public User getAllData(UUID user_id);
	
	//Password
	public Boolean checkNotRepeated(UUID user_id,	String p, String np);
	
	public Boolean changePassword(UUID user_id, String p, String np);
	
	//Verify
	public Boolean verifyUser(UUID user_id, String code);


}