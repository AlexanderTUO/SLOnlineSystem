package com.nice.demo.service;

import com.nice.demo.bean.PagingParam;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindBasicEntity;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
public interface WindBasicService {
    /**
     * 获取台风基础信息
     * @return
     */
    PagingResult<WindBasicEntity> getWindBasicInfo(PagingParam pagingParam);
}
