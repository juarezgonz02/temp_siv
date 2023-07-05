package com.escruadronlobo.devs.sivtickets.models.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class ErrorsFieldDTO {
	private String field;
	private List<String> messages;
	
	public ErrorsFieldDTO(String field) {
		super();
		this.field = field;
		this.messages = new ArrayList<>();
	}
	
	
}
