package com.escruadronlobo.devs.sivtickets.models.dto.res;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CountDataDTO {

    private int ticket_selled;

    private int ticket_validated;
}

