package com.nice.demo.entity;

import lombok.Data;

import java.sql.Timestamp;

/**
 * @Author: tyk
 * @Date: 2018/12/7 09:44
 * @Description:站点信息Entity
 */
@Data
public class WaterEntity {
    private String stationCode;
    private String stationName;
    private String longitude;//经度
    private String latitude;//纬度
    private String riverName;
    private String category;
    private String city;
    private String suboffice;
    private String address;
    private double waterPos;
    private double normalNum;
    private Timestamp time;

}
