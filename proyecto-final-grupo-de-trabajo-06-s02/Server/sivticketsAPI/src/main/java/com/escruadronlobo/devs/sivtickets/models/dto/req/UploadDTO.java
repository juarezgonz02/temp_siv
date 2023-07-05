package com.escruadronlobo.devs.sivtickets.models.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadDTO {
    private String image;
    private String name;
}
