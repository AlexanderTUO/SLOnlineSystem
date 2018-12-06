package com.nice.demo.service;

import com.nice.demo.entity.Water;
import org.omg.PortableInterceptor.Interceptor;

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
    List<Water> getWaterInfo(String type);

    /**
     * 根据站点查询水情信息
     * @param site
     * @return
     */
    Water getWaterBySite(String site);
}
