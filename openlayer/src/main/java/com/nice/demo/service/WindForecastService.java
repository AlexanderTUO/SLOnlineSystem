package com.nice.demo.service;

import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindInfoEntity;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
public interface WindForecastService {
    /**
     * 获取台风预测信息
     * @return
     */
    PagingResult<WindInfoEntity> getWindForecasts();
}
