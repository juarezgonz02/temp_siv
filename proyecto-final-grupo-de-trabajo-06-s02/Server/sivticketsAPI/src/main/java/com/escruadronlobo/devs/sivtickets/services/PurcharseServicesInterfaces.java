package com.escruadronlobo.devs.sivtickets.services;

import java.util.UUID;

import com.escruadronlobo.devs.sivtickets.models.dto.req.NewSaleDTO;
import com.escruadronlobo.devs.sivtickets.models.entities.Purchase;
import org.springframework.data.domain.Page;

public interface PurcharseServicesInterfaces {
	
	
	public Page<Purchase> getAllPurcharse(int page, int limit);
	
	public Purchase getPurcharseById(UUID purcharse_id);

	public void createPurcharse(NewSaleDTO sale) throws Exception;
	

}
