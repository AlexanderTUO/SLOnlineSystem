package com.nice.demo.controller;

import com.nice.demo.bean.WindInfoQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindInfoEntity;
import com.nice.demo.service.WindInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Author: tyk
 * @Date: 2018/12/27 17:13
 * @Description:
 */
@Controller
@RequestMapping("/windInfo/")
public class WindInfoController {
    @Autowired
    public WindInfoService windInfoService;

    @RequestMapping("getWindInfos")
    @ResponseBody
    public PagingResult<WindInfoEntity> getWindInfos(@RequestBody WindInfoQueryBean windInfoQueryBean) {
        PagingResult<WindInfoEntity> pagingResult = windInfoService.getWindInfos(windInfoQueryBean);
        return pagingResult;
    }

    @RequestMapping("getWindInfoById/{id}")
    @ResponseBody
    public WindInfoEntity getWindInfoById(@PathVariable("id") Integer id) {
        WindInfoEntity windInfoEntity = windInfoService.getWindInfoById(id);
        return windInfoEntity;
    }
}
