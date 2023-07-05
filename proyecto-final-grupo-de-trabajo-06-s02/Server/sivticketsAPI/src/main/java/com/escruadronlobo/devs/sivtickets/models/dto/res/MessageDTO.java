package com.escruadronlobo.devs.sivtickets.models.dto.res;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class MessageDTO<T> {
	private Map<String, T> messages;
	public MessageDTO(){
		messages = new HashMap<>();
	}
}
