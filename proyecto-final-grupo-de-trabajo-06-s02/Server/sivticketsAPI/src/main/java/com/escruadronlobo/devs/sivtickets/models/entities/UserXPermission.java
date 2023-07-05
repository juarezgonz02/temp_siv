package com.escruadronlobo.devs.sivtickets.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@IdClass(UserXPermission.UXPIdClass.class)
@Table(name = "userxpermission" )
public class UserXPermission {


    @Id
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User userId;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "permission_id")
    private Permission permissionId;

    public UserXPermission(User userId, Permission permissionId) {
        this.userId = userId;
        this.permissionId = permissionId;
    }


    public static class  UXPIdClass implements Serializable {
        private User userId;
        private Permission permissionId;

        public UXPIdClass() {}

        public UXPIdClass(User userId, Permission permissionId) {
            this.userId = userId;
            this.permissionId = permissionId;
        }
        // equals, hashCode
    }
}
