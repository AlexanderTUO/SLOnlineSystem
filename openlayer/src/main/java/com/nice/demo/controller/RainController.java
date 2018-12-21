package com.nice.demo.controller;

import com.nice.demo.bean.RainQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.RainEntity;
import com.nice.demo.service.RainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
