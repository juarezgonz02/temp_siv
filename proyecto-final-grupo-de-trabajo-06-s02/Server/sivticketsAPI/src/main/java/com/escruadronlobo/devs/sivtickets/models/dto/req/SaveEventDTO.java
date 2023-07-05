package com.escruadronlobo.devs.sivtickets.models.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveEventDTO {

        private InfoDTO info;
        private List<Date> dates;
        private List<EmployeeDTO> employees;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class InfoDTO {

                private String title;
                private String description;
                private String category;
                private String manager;
                private boolean state;
                private int duration;

        }
        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class EmployeeDTO {
            private String email;
            private boolean validator;
            private boolean promoter;
        }

}
