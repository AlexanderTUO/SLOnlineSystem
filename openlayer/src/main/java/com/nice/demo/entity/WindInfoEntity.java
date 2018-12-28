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
    private String windPower;
    private String windSpeed;
    private String airPressure;
    private String moveSpeed;
    private String moveDirect;
    private Integer sevRadius;
    private Integer tenRadius;

}
