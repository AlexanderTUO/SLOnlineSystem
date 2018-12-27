package com.nice.demo.controller;

import com.nice.demo.bean.PagingParam;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindBasicEntity;
import com.nice.demo.service.WindBasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Author: tyk
 * @Date: 2018/12/27 15:21
 * @Description:
 */
@Controller
@RequestMapping("/windBasic/")
public class WindBasicController {
    @Autowired
    WindBasicService windBasicService;

    @RequestMapping("getWindBasicInfo")
    @ResponseBody
    public PagingResult<WindBasicEntity> getWindBasicInfo(PagingParam pagingParam) {
        PagingResult<WindBasicEntity> pagingResult = windBasicService.getWindBasicInfo(pagingParam);
        return pagingResult;
    }

}
