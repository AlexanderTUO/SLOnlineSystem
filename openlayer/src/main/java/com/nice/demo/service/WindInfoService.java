package com.nice.demo.service;

import com.nice.demo.bean.WindInfoQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindInfoEntity;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
public interface WindInfoService {

    /**
     * 获取台风路径信息
     * @param windInfoQueryBean
     * @return
     */
    PagingResult<WindInfoEntity> getWindInfos(WindInfoQueryBean windInfoQueryBean);

    /**
     * 更加id查询台风路径点详情
     * @param id
     * @return
     */
    WindInfoEntity getWindInfoById(Integer id);
}
