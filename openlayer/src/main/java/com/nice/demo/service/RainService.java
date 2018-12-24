package com.nice.demo.service;

import com.nice.demo.bean.RainQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.RainEntity;

import java.util.List;
import java.util.Map;

/**
 * @Author: tyk
 * @Date: 2018/12/21 10:22
 * @Description:
 */
public interface RainService {
    /**
     * 根据条件查询雨情分页信息
     * @param rainQueryBean
     * @return
     */
    PagingResult<RainEntity> getRainInfo(RainQueryBean rainQueryBean);

    /**
     * 根据站点查询雨情信息
     * @param site
     * @return
     */
    List<RainEntity> getRainBySite(String site);

    /**
     * 根据站点查询雨情信息(表格)
     * @param site
     * @return
     */
    List<Map<String,Object>> getRainBySiteCharts(String site);

    /**
     * 获取各市最大雨量
     * @return
     */
    PagingResult<Map> getMaxRainfall( RainQueryBean rainQueryBean);

//    /**
//     * 根据条件查询各市最大雨量行数
//     * @param rain 水情类型
//     * @return
//     */
//    Integer getMaxRainRows(RainQueryBean rain);

}
