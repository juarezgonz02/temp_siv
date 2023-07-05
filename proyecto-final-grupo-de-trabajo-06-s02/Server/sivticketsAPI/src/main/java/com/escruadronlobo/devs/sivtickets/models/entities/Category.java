package com.escruadronlobo.devs.sivtickets.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "categories")
public class Category {

    @Id
    @Column(name = "category_id")
    private String categoryId;

    @Column(name = "name")
    private String name;

<<<<<<< Updated upstream
=======
    public Category(String categoryId, String name) {
        this.categoryId = categoryId;
        this.name = name;
    }
>>>>>>> Stashed changes
}
