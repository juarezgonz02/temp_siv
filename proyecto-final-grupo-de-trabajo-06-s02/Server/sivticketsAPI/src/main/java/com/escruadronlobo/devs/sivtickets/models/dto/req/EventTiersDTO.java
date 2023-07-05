package com.escruadronlobo.devs.sivtickets.models.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventTiersDTO {
    
    private Map<String, tierInfoDTO> blockID;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class tierInfoDTO{

        private boolean no_numbered;
        private String name;
        private String block_name;
        private double price;
    }
}
