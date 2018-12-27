package com.nice.demo.service.impl;

import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindInfoEntity;
import com.nice.demo.service.WindForecastService;
import org.springframework.stereotype.Service;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
@Service
public class WindForecastServiceImpl implements WindForecastService {
    @Override
    public PagingResult<WindInfoEntity> getWindForecasts() {
        return null;
    }
}
