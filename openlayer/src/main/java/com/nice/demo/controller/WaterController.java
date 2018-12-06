package com.nice.demo.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @Author: tyk
 * @Date: 2018/12/6 16:49
 * @Description:
 */
@Controller
@RequestMapping("/water/")
public class WaterController {

    @RequestMapping("getWaterInfo")
    public Object getWaterInfo(@RequestParam("type") String type) {
        return null;
    }
}
