package com.escruadronlobo.devs.sivtickets.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "requests")
public class SystemRequest {

    @Id
    @Column(name = "request_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID requestId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "type")
    private String type;

    @Column(name = "finished", insertable = false)
    private Boolean finished;

    @Column(name = "finished_time")
    private Date finishedTime;

    public SystemRequest(User userId, String type) {
        this.userId = userId;
        this.type = type;
    }
}
