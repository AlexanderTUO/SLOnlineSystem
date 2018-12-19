package com.nice.demo.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/19 11:16
 * @Description:
 */
@Data
public class PagingResult<T> implements Serializable {
    private Integer draw ;
    private Integer recordsTotal ;
    private Integer recordsFiltered;
    private List<T> data;

    public Integer getRecordsFiltered() {
        return recordsTotal;
    }
}
