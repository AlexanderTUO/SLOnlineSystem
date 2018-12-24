package com.nice.demo.service.impl;

import com.nice.demo.bean.RainQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.RainEntity;
import com.nice.demo.mapper.RainMapper;
import com.nice.demo.service.RainService;
import com.nice.demo.util.DateUtils;
import jdk.internal.org.objectweb.asm.commons.Remapper;
import org.apache.jasper.tagplugins.jstl.core.ForEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
        List<RainEntity> rainEntities = rainMapper.getRainBySite(site);
        return rainEntities;
    }

    @Override
    public List<Map<String,Object>> getRainBySiteCharts(String site) {
        List<RainEntity> rainEntities = rainMapper.getRainBySite(site);
        List<Map<String, Object>> maps = new ArrayList<>();

        if (null != rainEntities && rainEntities.size() > 0) {
            for(RainEntity rain:rainEntities){
                Map<String,Object> map = new HashMap();
                Date rainTime = rain.getRainTime();
                Double rainfall = rain.getRainfall();
                map.put("label", DateUtils.format(rainTime, "yyyy-MM-dd HH:mm:ss"));
                map.put("value", rainfall);
                maps.add(map);
            }
        }
        return maps;
    }

    @Override
    public PagingResult<Map> getMaxRainfall( RainQueryBean rainQueryBean) {
//        List<Map> list = rainMapper.getMaxRainfall(rainQueryBean);
//        return list;

        Integer rows = rainMapper.getMaxRainRows(rainQueryBean);
        List<Map> list = rainMapper.getMaxRainfall(rainQueryBean);

        PagingResult<Map> pagingResult = new PagingResult<>();
        pagingResult.setData(list);
        pagingResult.setDraw(rainQueryBean.getDraw());
        pagingResult.setRecordsTotal(rows);

        return pagingResult;
    }
}
