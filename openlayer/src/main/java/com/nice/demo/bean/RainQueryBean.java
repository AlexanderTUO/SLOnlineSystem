package com.nice.demo.bean;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

/**
 * @Author: tyk
 * @Date: 2018/12/21 10:09
 * @Description:
 */
@Data
public class RainQueryBean extends PagingParam{
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date fromTime;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date toTime;
    private Integer minRain;
    private Integer maxRain;
}
