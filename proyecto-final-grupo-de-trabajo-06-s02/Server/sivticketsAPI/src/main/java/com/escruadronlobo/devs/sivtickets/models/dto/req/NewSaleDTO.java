package com.escruadronlobo.devs.sivtickets.models.dto.req;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class NewSaleDTO {
	private String event_id;
	private Map<String, List<String>> seats;
	private float total; 
}
