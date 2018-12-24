package com.nice.demo.controller;

import com.nice.demo.bean.RainQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.RainEntity;
import com.nice.demo.service.RainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @Author: tyk
 * @Date: 2018/12/21 11:13
 * @Description:
 */
@Controller
@RequestMapping("/rain/")
public class RainController {
    @Autowired
    public RainService rainService;

    @RequestMapping("getRainInfo")
    @ResponseBody
    public PagingResult<RainEntity> getRainInfo(@RequestBody RainQueryBean rainQueryBean) {
        PagingResult<RainEntity> pagingResult = rainService.getRainInfo(rainQueryBean);
        return pagingResult;
    }

    @RequestMapping("getRainBySite/{site}")
    @ResponseBody
    public List<RainEntity> getRainBySite(@PathVariable("site")String site) {
        List<RainEntity> rainEntities = rainService.getRainBySite(site);
        return rainEntities;
    }

    @RequestMapping("getRainBySiteCharts/{site}")
    @ResponseBody
    public List<Map<String,Object>> getRainBySiteCharts(@PathVariable("site")String site) {
        List<Map<String, Object>> maps = rainService.getRainBySiteCharts(site);
        return maps;
    }

    @RequestMapping("getMaxRainfall")
    @ResponseBody
    public PagingResult<Map> getMaxRainfall(@RequestBody RainQueryBean rainQueryBean) {
        PagingResult<Map> list = rainService.getMaxRainfall(rainQueryBean);
        return list;
    }

}
