package com.nice.demo.mapper;

import com.nice.demo.entity.FeatureEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/11/22 09:23
 * @Description:
 */
@Mapper
public interface FeatureMapper {
    void saveFeature(FeatureEntity featureEntity);

    List<FeatureEntity> listFeatures();
}
