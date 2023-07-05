package com.escruadronlobo.devs.sivtickets.models.dto.res;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PageDTO<T> {

    private List<T> content;
    private Integer page;
    private Integer limit;
    private long total ;
    private Integer total_pages;

    public PageDTO(Page<T> data) {

            content = data.getContent();

            page = data.getPageable().getPageNumber();

            limit = data.getSize();

            total = data.getTotalElements();

            total_pages = data.getTotalPages();
    }
}
