package com.nice.demo.mapper;

import com.nice.demo.bean.WindInfoQueryBean;
import com.nice.demo.entity.PagingResult;
import com.nice.demo.entity.WindInfoEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/12/27 14:21
 * @Description:
 */
@Mapper
public interface WindInfoMapper {
    /**
     * 获取台风路径信息
     * @param windInfoQueryBean
     * @return
     */
    List<WindInfoEntity> getWindInfos(WindInfoQueryBean windInfoQueryBean);

    /**
     * 更加id查询台风路径点详情
     * @param id
     * @return
     */
    WindInfoEntity getWindInfoById(Integer id);

    /**
     * 获取台风台风路径信息的行数
     * @param windInfoQueryBean
     * @return
     */
    Integer getWindInfoRows(WindInfoQueryBean windInfoQueryBean);
}
