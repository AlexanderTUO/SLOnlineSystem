package com.nice.demo.bean;


import lombok.Data;

import java.util.Date;

/**
 * @Author: tyk
 * @Date: 2018/12/21 10:09
 * @Description:
 */
@Data
public class RainQueryBean extends PagingParam{
    private Date fromTime;
    private Date toTime;
    private Integer minRain;
    private Integer maxRain;
}
