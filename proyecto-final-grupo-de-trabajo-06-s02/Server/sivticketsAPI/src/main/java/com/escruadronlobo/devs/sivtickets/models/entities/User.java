package com.escruadronlobo.devs.sivtickets.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users_table")
public class User implements UserDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id")
	@JsonIgnore
	private UUID userId;

	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String email;

	@JsonIgnore
	@Column(name = "password")
	private String password;

	@Column(name = "verified", insertable = false)
	private Boolean isVerified;

	@JsonIgnore
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "userId")
	@ToString.Exclude
	List<UserXPermission> permissions;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userId")
	@ToString.Exclude
	List<TicketXUser> tickets;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userId")
	@ToString.Exclude
	List<UserXEvent> participationEvents;

	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {

		List<GrantedAuthority> authorities = new ArrayList<>();

		for (UserXPermission permission: permissions) {
			authorities.add(new SimpleGrantedAuthority(permission.getPermissionId().getName()));
		}

		return authorities;
	}

	@Override
	@JsonIgnore
	public String getUsername() {
		return this.email;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return this.isVerified;
	}

	public User(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
