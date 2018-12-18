package com.nice.demo.test;

import com.nice.demo.util.DateUtils;

import java.text.DateFormat;
import java.util.Date;

/**
 * @Author: tyk
 * @Date: 2018/12/18 15:27
 * @Description:
 */
public class date {
    public static void main(String[] args){
        Date now = new Date();
        String s;

        s = DateFormat.getDateInstance().format(now);

        s = DateUtils.format(now,"yyyy-MM-dd HH:mm:ss");
        System.out.println(s);

    }
}
