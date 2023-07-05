package com.escruadronlobo.devs.sivtickets.models.dto.res;

import com.escruadronlobo.devs.sivtickets.models.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OauthLoggingDTO {

    private OAuthLoggingType type;
    private User user;
}
