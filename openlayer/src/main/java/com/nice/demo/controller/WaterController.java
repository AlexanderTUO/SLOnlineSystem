package com.nice.demo.controller;

import com.nice.demo.bean.PageBean;
import com.nice.demo.entity.WaterEntity;
import com.nice.demo.service.WaterService;
import com.nice.demo.util.DateUtils;
import org.apache.jasper.tagplugins.jstl.core.ForEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: tyk
 * @Date: 2018/12/6 16:49
 * @Description:
 */
@Controller
@RequestMapping("/water/")
public class WaterController {

    @Autowired
    public WaterService waterService;

    @RequestMapping("getWaterInfo")
    @ResponseBody
    public Object getWaterInfo(@RequestParam("type") String type) {
        Integer rows = waterService.getWaterRows(type);
        List<WaterEntity> waterEntities = waterService.getWaterInfo(type);

        PageBean pageBean = new PageBean();
        pageBean.setRecordsTotal(rows);
        pageBean.setData(waterEntities);
        pageBean.setDraw(10);
        return waterEntities;
    }

    @RequestMapping("getWaterBySite")
    @ResponseBody
    public List getWaterBySite(@RequestParam("type")String type,@RequestParam("site")String site) {
        List<WaterEntity> waterEntities = waterService.getWaterBySite(type,site);
        List<Map<String,Object>> maps = new ArrayList<Map<String, Object>>();


        if (null != waterEntities && waterEntities.size() > 0) {
            for (int index = 0; index < waterEntities.size(); index++) {
                Map<String, Object> map = new HashMap<String, Object>();

                Timestamp waterTime = waterEntities.get(index).getWateTime();

                map.put("label", DateUtils.format(waterTime, "yyyy-MM-dd HH:mm:ss"));
                map.put("value", waterEntities.get(index).getWaterPos()+"");
                maps.add(map);
            }
        }

        return maps;
    }

}
