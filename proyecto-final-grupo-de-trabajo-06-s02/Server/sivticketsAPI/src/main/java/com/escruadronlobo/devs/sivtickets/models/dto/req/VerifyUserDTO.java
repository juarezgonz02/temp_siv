package com.escruadronlobo.devs.sivtickets.models.dto.req;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyUserDTO {
	
	@UUID
	@NotBlank
	private java.util.UUID user_id;
	
	@NotBlank
	private String verify_code;
}
