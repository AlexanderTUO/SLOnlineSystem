package com.nice.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: tyk
 * @Date: 2018/11/26 11:14
 * @Description:菜单
 */
@Controller
//@RequestMapping("/map/")
public class MapController {



    @RequestMapping("gaode")
    public String gaode() {
        return "gaode";
    }

    @RequestMapping("feature")
    public String feature() {
        return "feature";
    }

    @RequestMapping("popup")
    public String popup() {
        return "popup";
    }

    @RequestMapping("cluster")
    public String cluster() {
        return "cluster";
    }

    @RequestMapping("template")
    public String template() {
        return "template";
    }

    @RequestMapping("projectionTransformation")
    public String projectionTransformation() {
        return "projectionTransformation";
    }

    @RequestMapping("MultiViewLinkage")
    public String MultiViewLinkage() {
        return "MultiViewLinkage";
    }

    @RequestMapping("heatMap")
    public String heatMap() {
        return "heatMap";
    }

}
