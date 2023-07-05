package com.escruadronlobo.devs.sivtickets.models.entities;

import java.awt.*;
<<<<<<< Updated upstream
=======
import java.util.Calendar;
>>>>>>> Stashed changes
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@Table(name = "events")
<<<<<<< Updated upstream
public class Event {
=======
public class Event implements Cloneable{
>>>>>>> Stashed changes

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID eventId;

	@Column(name = "code")
	private UUID code;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id")
	private Category category;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "banner")
	private String banner;

	@Column(name = "banner_big")
	private String banner_big;

	@Column(name = "date")
	private Date date;

	@Column(name = "amount_tickets")
	private int amountTickets;

	@Column(name = "duration")
	private int duration;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "location_id")
	private Location locationId;

	@Column(name = "state", insertable = false)
	private String state;

	@Column(name = "total_attendees")
	private int totalAssistants;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "eventId")
	private List<Ticket> ticketList;

<<<<<<< Updated upstream
	public Event(UUID code) {
		this.code = code;
=======
	@Override
	@JsonIgnore
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

	public Event(UUID code) {
		this.code = code;
		this.title = "";
		this.description = "";
		this.category = new Category("EMPTY","Empty");
		this.banner = "";
		this.banner_big = "";
		this.totalAssistants = 0;
		this.date = Calendar.getInstance().getTime();
		this.state = "DISABLED";
>>>>>>> Stashed changes
	}
}
