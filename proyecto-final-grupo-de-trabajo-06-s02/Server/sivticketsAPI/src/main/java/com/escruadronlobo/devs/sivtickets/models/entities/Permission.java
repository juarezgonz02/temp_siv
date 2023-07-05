package com.escruadronlobo.devs.sivtickets.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users_permissions")
public class Permission {

	@Id
<<<<<<< Updated upstream
=======
	@JsonIgnore
>>>>>>> Stashed changes
	@Column(name = "permission_id")
	private String permissionId;

	@Column(name = "name")
	private String name;



}
