package com.nice.demo.service;

import com.nice.demo.bean.WaterQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WaterEntity;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/6 17:02
 * @Description:
 */
public interface WaterService {
    /**
     * 根据水情类型分页查询水信息
     * @param water
     * @return
     */
    PagingResult<WaterEntity> getWaterInfo(WaterQueryBean water);

    /**
     * 根据站点查询水情信息
     * @param type
     * @param site
     * @return
     */
    List<WaterEntity> getWaterBySite(String type,String site);

}
