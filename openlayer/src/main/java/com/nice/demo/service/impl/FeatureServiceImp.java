package com.nice.demo.service.impl;

import com.nice.demo.entity.FeatureEntity;
import com.nice.demo.mapper.FeatureMapper;
import com.nice.demo.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/11/22 09:20
 * @Description:
 */
@Service
public class FeatureServiceImp implements FeatureService {

    @Autowired
    public FeatureMapper featureMapper;

    @Override
    public void saveFeature(FeatureEntity featureEntity) {
        featureMapper.saveFeature(featureEntity);
    }

    @Override
    public List<FeatureEntity> list() {
        List<FeatureEntity> list = featureMapper.listFeatures();
        return list;
    }
}
