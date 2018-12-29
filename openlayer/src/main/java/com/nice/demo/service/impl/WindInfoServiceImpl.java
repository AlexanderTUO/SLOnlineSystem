package com.nice.demo.service.impl;

import com.nice.demo.bean.WindInfoQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindInfoEntity;
import com.nice.demo.mapper.WindInfoMapper;
import com.nice.demo.service.WindInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
@Service
public class WindInfoServiceImpl implements WindInfoService {
    @Autowired
    public WindInfoMapper windInfoMapper;

    @Override
    public PagingResult<WindInfoEntity> getWindInfos(WindInfoQueryBean windInfoQueryBean) {
        List<WindInfoEntity> list = windInfoMapper.getWindInfos(windInfoQueryBean);
        Integer rows = windInfoMapper.getWindInfoRows(windInfoQueryBean);

        PagingResult<WindInfoEntity> pagingResult = new PagingResult<>();
        pagingResult.setDraw(windInfoQueryBean.getDraw());
        pagingResult.setData(list);
        pagingResult.setRecordsTotal(rows);
        return pagingResult;
    }

    @Override
    public WindInfoEntity getWindInfoById(Integer id) {
        WindInfoEntity windInfoEntity = windInfoMapper.getWindInfoById(id);
        return windInfoEntity;
    }
}
