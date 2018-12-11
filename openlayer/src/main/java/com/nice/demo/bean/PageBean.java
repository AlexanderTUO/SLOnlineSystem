package com.nice.demo.bean;

import lombok.Data;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/11 14:27
 * @Description:
 */
@Data
public class PageBean {
    private Integer draw;
    private Integer recordsTotal;
    private Integer recordsFiltered ;
    private List data;
}
