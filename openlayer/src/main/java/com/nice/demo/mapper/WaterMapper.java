package com.nice.demo.mapper;

import com.nice.demo.entity.WaterEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/6 17:02
 * @Description:
 */
@Mapper
public interface WaterMapper {
    /**
     * 根据水情类型查询水信息
     * @param type
     * @return
     */
    List<WaterEntity> getWaterInfo(@Param("type") String type);

    /**
     * 根据站点查询水情信息
     * @param site
     * @return
     */
    WaterEntity getWaterBySite(String site);
}
