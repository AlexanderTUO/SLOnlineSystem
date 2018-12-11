package com.nice.demo.controller;

import com.nice.demo.bean.PageBean;
import com.nice.demo.entity.WaterEntity;
import com.nice.demo.service.WaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

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
    public WaterEntity getWaterBySite(String site) {
        return waterService.getWaterBySite(site);
    }

}
