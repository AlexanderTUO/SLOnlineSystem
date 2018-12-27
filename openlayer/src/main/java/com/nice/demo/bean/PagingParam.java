package com.nice.demo.bean;

import lombok.Data;

import java.io.Serializable;

/**
 * @Author: tyk
 * @Date: 2018/12/11 14:27
 * @Description:
 */
@Data
public class PagingParam implements Serializable {
    private Integer draw;
    private Integer start;
    private Integer length;
}
