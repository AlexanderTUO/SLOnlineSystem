package com.nice.demo.mapper;

import com.nice.demo.bean.RainQueryBean;
import com.nice.demo.bean.WaterQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.RainEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

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
    List<RainEntity> getRainBySite(String site);

    /**
     * 根据条件查询雨情信息行数
     * @param rain 水情类型
     * @return
     */
    Integer getRainRows(RainQueryBean rain);
}
