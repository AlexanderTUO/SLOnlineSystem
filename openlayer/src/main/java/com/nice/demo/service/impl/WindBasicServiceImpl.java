package com.nice.demo.service.impl;

import com.nice.demo.bean.PagingParam;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindBasicEntity;
import com.nice.demo.mapper.WindBasicMapper;
import com.nice.demo.service.WindBasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
@Service
public class WindBasicServiceImpl implements WindBasicService {

    @Autowired
    public WindBasicMapper windBasicMapper;

    @Override
    public PagingResult<WindBasicEntity> getWindBasicInfo(PagingParam pagingParam) {
        List<WindBasicEntity> windBasicEntities = windBasicMapper.getWindBasicInfo(pagingParam);
        Integer rows = windBasicMapper.getWindBasicRows();

        PagingResult<WindBasicEntity> pagingResult = new PagingResult<>();
        pagingResult.setData(windBasicEntities);
        pagingResult.setRecordsTotal(rows);
        pagingResult.setDraw(pagingParam.getDraw());
        return pagingResult;
    }

}
