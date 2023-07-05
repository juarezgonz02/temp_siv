package com.escruadronlobo.devs.sivtickets.models.dto.req;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthDTO {

	@NotBlank
	@Email
	private String credentials;
    
    @NotBlank
    @Size(min=8)
    private String password;
}
