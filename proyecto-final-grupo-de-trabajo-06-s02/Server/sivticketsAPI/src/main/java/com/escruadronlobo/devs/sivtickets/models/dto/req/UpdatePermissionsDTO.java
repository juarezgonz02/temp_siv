package com.escruadronlobo.devs.sivtickets.models.dto.req;

import com.escruadronlobo.devs.sivtickets.models.entities.Permission;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePermissionsDTO {

    private List<UserToUpdateDTO> update;

}
