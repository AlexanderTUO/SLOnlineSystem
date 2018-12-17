package com.nice.demo.service.impl;

import com.nice.demo.entity.WaterEntity;
import com.nice.demo.mapper.WaterMapper;
import com.nice.demo.service.WaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/6 17:02
 * @Description:
 */
@Service
public class WaterServiceImpl implements WaterService {

    @Autowired
    public WaterMapper waterMapper;

    @Override
    public List<WaterEntity> getWaterInfo(String type) {
        return waterMapper.getWaterInfo(type);
    }

    @Override
    public List<WaterEntity> getWaterBySite(String type, String site) {
        if ("river".equals(type)) {
            type = "RR";
        }
        if ("reservoir".equals(type)) {
            type = "ZZ";
        }
        return waterMapper.getWaterBySite(type,site);
    }

    @Override
    public Integer getWaterRows(String type) {
        return waterMapper.getWaterRows(type);
    }
}
