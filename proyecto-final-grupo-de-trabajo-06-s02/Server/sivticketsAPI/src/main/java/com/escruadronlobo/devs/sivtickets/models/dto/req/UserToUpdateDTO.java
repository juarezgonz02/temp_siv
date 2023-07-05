package com.escruadronlobo.devs.sivtickets.models.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserToUpdateDTO {
    private String email;

    private List<String> permissions;
}
