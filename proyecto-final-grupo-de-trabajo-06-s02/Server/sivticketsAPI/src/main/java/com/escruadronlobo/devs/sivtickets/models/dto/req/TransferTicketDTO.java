package com.escruadronlobo.devs.sivtickets.models.dto.req;

import lombok.Data;

@Data
public class TransferTicketDTO {
	private String email;
	private String ticket_id;
}
