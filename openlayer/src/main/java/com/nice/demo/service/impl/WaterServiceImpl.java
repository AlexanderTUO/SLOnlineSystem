package com.nice.demo.service.impl;

import com.nice.demo.bean.WaterQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WaterEntity;
import com.nice.demo.mapper.WaterMapper;
import com.nice.demo.service.WaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/6 17:02
 * @Description:
 */
@Service
public class WaterServiceImpl implements WaterService {

    @Autowired
    public WaterMapper waterMapper;

    @Override
    public PagingResult<WaterEntity> getWaterInfo(WaterQueryBean water) {

        List<WaterEntity> list = waterMapper.getWaterInfo(water);
        Integer rows = waterMapper.getWaterRows(water);
        PagingResult<WaterEntity> pagingResult = new PagingResult<>();
        pagingResult.setData(list);
        pagingResult.setRecordsTotal(rows);
        pagingResult.setDraw(water.getDraw());
        return pagingResult;
    }

    @Override
    public List<WaterEntity> getWaterBySite(String type, String site) {
        if ("river".equals(type)) {
            type = "RR";
        }
        if ("reservoir".equals(type)) {
            type = "ZZ";
        }
        return waterMapper.getWaterBySite(type,site);
    }

}
