package com.nice.demo.mapper;

import com.nice.demo.bean.RainQueryBean;
import com.nice.demo.bean.WaterQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.RainEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @Author: tyk
 * @Date: 2018/12/21 10:25
 * @Description:
 */
@Mapper
public interface RainMapper {
    /**
     * 根据条件查询雨情分页信息
     * @param rainQueryBean
     * @return
     */
    List<RainEntity> getRainInfo(RainQueryBean rainQueryBean);

    /**
     * 根据站点查询雨情信息
     * @param site
     * @return
     */
    List<RainEntity> getRainBySite(@Param("site") String site);

    /**
     * 根据条件查询雨情信息行数
     * @param rain 水情类型
     * @return
     */
    Integer getRainRows(RainQueryBean rain);

    /**
     * 获取各市最大雨量
     * @return
     */
    List<Map> getMaxRainfall( RainQueryBean rainQueryBean);

    /**
     * 根据条件查询各市最大雨量行数
     * @param rain 水情类型
     * @return
     */
    Integer getMaxRainRows(RainQueryBean rain);
}
