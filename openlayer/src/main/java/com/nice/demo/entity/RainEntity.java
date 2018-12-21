package com.nice.demo.entity;

import lombok.Data;

import java.util.Date;

/**
 * @Author: tyk
 * @Date: 2018/12/21 10:12
 * @Description:
 */
@Data
public class RainEntity extends PagingResult{
    private String stationCode;
    private String stationName;
    private String longitude;//经度
    private String latitude;//纬度
    private String riverName;
    private String category;
    private String city;
    private String suboffice;
    private String address;
    private double rainfall;
    private Date rainTime;

}
