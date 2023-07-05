package com.escruadronlobo.devs.sivtickets.services.implementations;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.escruadronlobo.devs.sivtickets.models.entities.User;
import com.escruadronlobo.devs.sivtickets.services.AccountServiceInterface;

@Service
public class AccountServiceImp implements AccountServiceInterface{

	@Override
	public User getAllData(UUID user_id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean checkNotRepeated(UUID user_id, String p, String np) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean changePassword(UUID user_id, String p, String np) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean verifyUser(UUID user_id, String code) {
		// TODO Auto-generated method stub
		return null;
	}

}
