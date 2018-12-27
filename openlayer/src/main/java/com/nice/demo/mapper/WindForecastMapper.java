package com.nice.demo.mapper;

import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindInfoEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
@Mapper
public interface WindForecastMapper {
    /**
     * 获取台风预测信息
     * @return
     */
    List<WindInfoEntity> getWindForecasts();
}
