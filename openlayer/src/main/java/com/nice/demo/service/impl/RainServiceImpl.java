package com.nice.demo.service.impl;

import com.nice.demo.bean.RainQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.RainEntity;
import com.nice.demo.mapper.RainMapper;
import com.nice.demo.service.RainService;
import jdk.internal.org.objectweb.asm.commons.Remapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/21 10:25
 * @Description:
 */
@Service
public class RainServiceImpl implements RainService {

    @Autowired
    RainMapper rainMapper;


    @Override
    public PagingResult<RainEntity> getRainInfo(RainQueryBean rainQueryBean) {
        Integer rows = rainMapper.getRainRows(rainQueryBean);
        List<RainEntity> list = rainMapper.getRainInfo(rainQueryBean);

        PagingResult<RainEntity> pagingResult = new PagingResult<>();
        pagingResult.setData(list);
        pagingResult.setDraw(rainQueryBean.getDraw());
        pagingResult.setRecordsTotal(rows);

        return pagingResult;
    }

    @Override
    public List<RainEntity> getRainBySite(String site) {
        return null;
    }
}
