package com.nice.demo.mapper;

import com.nice.demo.bean.WaterQueryBean;
import com.nice.demo.entity.PagingResult;
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
     * @param water
     * @return
     */
    List<WaterEntity> getWaterInfo(WaterQueryBean water);

    /**
     * 根据站点查询水情信息
     * @param type
     * @param site
     * @return
     */
    List<WaterEntity> getWaterBySite(@Param("type")String type,@Param("site")String site);

    /**
     * 根据水情类型查询水情信息行数
     * @param water 水情类型
     * @return
     */
    Integer getWaterRows(WaterQueryBean water);
}
