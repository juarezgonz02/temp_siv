package com.escruadronlobo.devs.sivtickets.models.entities;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@Table(name = "purchases")
public class Purchase {

	@Id
	@Column(name = "purchase_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
 	private UUID purchaseId;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User userId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "event_id")
	private Event event;

	@Column(name = "state")
	private String state;

	@Column(name = "paid_price")
	private float paidPrice;

	@Column(name = "paid_date")
	private Date date;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "purchaseId")
	@ToString.Exclude
	@JsonIgnore
	private List<Ticket> tickets;

	@Column(name = "tickets")
	private int cantTicket;

	public Purchase(User userId, Event event, String state, float paidPrice, Date date) {
		this.userId = userId;
		this.event = event;
		this.state = state;
		this.paidPrice = paidPrice;
		this.date = date;
	}
}
