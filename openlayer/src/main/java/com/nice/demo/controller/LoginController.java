package com.nice.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: tyk
 * @Date: 2018/11/26 11:14
 * @Description:
 */
@Controller
public class LoginController {

    @RequestMapping("index")
    public String index() {
        return "index";
    }
}
