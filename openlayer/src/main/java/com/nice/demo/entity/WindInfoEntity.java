package com.nice.demo.entity;

import lombok.Data;

import java.util.Date;

/**
 * @Author: tyk
 * @Date: 2018/12/27 13:24
 * @Description:
 */
@Data
public class WindInfoEntity {
    private Integer id;
    private String windId;
    private Date windTime;
    private Double longitude;
    private Double latitude;
    private Integer windPower;
    private Integer windSpeed;
    private Integer airPressure;
    private Integer moveSpeed;
    private Integer moveDirect;
    private Integer sevRadius;
    private Integer tenRadius;

}
