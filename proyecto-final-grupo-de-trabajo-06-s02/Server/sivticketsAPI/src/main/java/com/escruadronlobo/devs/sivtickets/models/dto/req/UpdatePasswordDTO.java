package com.escruadronlobo.devs.sivtickets.models.dto.req;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NonNull;

@Data
public class UpdatePasswordDTO {
	@NonNull
	@Size(min = 8)
	private String new_password;

	@NonNull
	@Size(min = 8)
	private String password;

}
