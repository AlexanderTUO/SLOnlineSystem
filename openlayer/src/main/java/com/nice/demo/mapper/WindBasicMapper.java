package com.nice.demo.mapper;

import com.nice.demo.bean.PagingParam;
import com.nice.demo.entity.WindBasicEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
@Mapper
public interface WindBasicMapper {
    /**
     * 获取台风基础信息
     * @return
     */
    List<WindBasicEntity> getWindBasicInfo(PagingParam pagingParam);

    /**
     * 获取台风基础信息的行数
     * @return
     */
    Integer getWindBasicRows();
}
