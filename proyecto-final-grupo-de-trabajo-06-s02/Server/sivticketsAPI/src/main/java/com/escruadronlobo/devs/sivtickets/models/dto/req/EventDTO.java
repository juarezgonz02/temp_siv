package com.escruadronlobo.devs.sivtickets.models.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {

    private String title;
    private String description;
    private Date date;
  

}
