package com.escruadronlobo.devs.sivtickets.models.entities;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "ticket_hash")
public class TicketHash {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonIgnore
	@Column(name = "hash_id")
	private UUID hashId;


	 @JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ticket_id")
	private Ticket ticketId;

	@Column(name = "hash")
	private String hash;

	@Column(name = "exp_date")
	private Date expDate;

	@Column(name = "creation_date")
	private Date createDate;

	@Column(name = "validated_date", insertable = false)
	private Date validDate;

	public TicketHash(Ticket ticketId, Date expDate, Date createDate) {
		this.ticketId = ticketId;
		this.expDate = expDate;
		this.createDate = createDate;
	}
}

