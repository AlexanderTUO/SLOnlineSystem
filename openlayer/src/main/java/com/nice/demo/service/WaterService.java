package com.nice.demo.service;

import com.nice.demo.entity.WaterEntity;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/6 17:02
 * @Description:
 */
public interface WaterService {
    /**
     * 根据水情类型查询水信息
     * @param type
     * @return
     */
    List<WaterEntity> getWaterInfo(String type);

    /**
     * 根据站点查询水情信息
     * @param site
     * @return
     */
    WaterEntity getWaterBySite(String site);
}
