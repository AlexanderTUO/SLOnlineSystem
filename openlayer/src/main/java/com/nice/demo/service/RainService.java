package com.nice.demo.service;

import com.nice.demo.bean.RainQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.RainEntity;

import java.util.List;

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



}
