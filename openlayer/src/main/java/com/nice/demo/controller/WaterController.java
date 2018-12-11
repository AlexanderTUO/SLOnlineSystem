package com.nice.demo.controller;

import com.nice.demo.entity.WaterEntity;
import com.nice.demo.service.WaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
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
    public List<WaterEntity> getWaterInfo(@RequestParam("type") String type) {
        List<WaterEntity> waterEntities = waterService.getWaterInfo(type);
        return waterEntities;
    }
}
