package com.nice.demo.controller;

import com.nice.demo.bean.WaterQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WaterEntity;
import com.nice.demo.service.WaterService;
import com.nice.demo.util.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
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

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping("getWaterInfo")
    @ResponseBody
    public PagingResult<WaterEntity> getWaterInfo(@RequestBody WaterQueryBean water) {
        logger.info("hello log");
        PagingResult<WaterEntity> pagingResult = waterService.getWaterInfo(water);
        return pagingResult;
    }

    @RequestMapping("getWaterBySite")
    @ResponseBody
    public List<WaterEntity> getWaterBySite(@RequestParam("type")String type,@RequestParam("site")String site) {
        List<WaterEntity> waterEntities = waterService.getWaterBySite(type,site);
        return waterEntities;
    }

    @RequestMapping("getWaterBySiteCharts")
    @ResponseBody
    public List<Map<String,Object>> getWaterBySiteCharts(@RequestParam("type")String type,@RequestParam("site")String site) {
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
