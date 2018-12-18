package com.nice.demo.util;

/**
 * <p>Company:www.scbdlbs.com</p>
 *
 * @Filename: DateUtils
 * Description:
 * @Version: 1.0
 * @Author: why
 * @Date: 2018/8/20
 */

import com.alibaba.fastjson.JSON;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

public class DateUtils {
    /**
     * 时间格式(yyyy-MM-dd)
     */
    public final static String DATE_PATTERN = "yyyy-MM-dd";

    //12小时后过期
    public final static int EXPIRE = 3600 * 12 * 30;

    public final static int INTERVAL = 3600 * 12 * 15 * 1000;
    /**
     * 时间格式(yyyy-MM-dd HH:mm:ss)
     */
    public final static String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

    public static String format(Date date) {
        return format(date, DATE_PATTERN);
    }

    public static String format(Date date, String pattern) {
        if (date != null) {
            SimpleDateFormat df = new SimpleDateFormat(pattern);
            return df.format(date);
        }
        return null;
    }

    /**
     * 通过时间秒毫秒数判断两个时间的间隔
     *
     * @param date1
     * @param date2
     * @return
     */
    public static double differentDaysByMillisecond(Date date1, Date date2) {
        double days = (double) ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24.0));
        return days;
    }

    /**
     * 获取当前系统时间
     * @return date(Thu Jan 18 10:14:25 CST 2018)
     */
    public static Date getCurrentTime(){
        Calendar ca = Calendar.getInstance();
//        int year = ca.get(Calendar.YEAR);//获取年份
//        int month=ca.get(Calendar.MONTH);//获取月份
//        int day=ca.get(Calendar.DATE);//获取日
//        int minute=ca.get(Calendar.MINUTE);//分
//        int hour=ca.get(Calendar.HOUR);//小时
//        int second=ca.get(Calendar.SECOND);//秒
//        int WeekOfYear = ca.get(Calendar.DAY_OF_WEEK); //显示今天是一周的第几天
        return ca.getTime();//获取当前时间(Thu Jan 18 10:14:25 CST 2018)
    }

    /**
     * 得到日期字符串 默认格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
     */
    public static String formatDate(Date date, Object... pattern) {
        String formatDate = null;
        if (pattern != null && pattern.length > 0) {
            formatDate = DateFormatUtils.format(date, pattern[0].toString());
        } else {
            formatDate = DateFormatUtils.format(date, "yyyy-MM-dd");
        }
        return formatDate;
    }

    /**
     * 获取两个日期之间的天数
     *
     * @param before
     * @param after
     * @return
     */
    public static double getDistanceOfTwoDate(Date before, Date after) {
        long beforeTime = before.getTime();
        long afterTime = after.getTime();
        return (afterTime - beforeTime) / (1000 * 60 * 60 * 24);
    }

    /**
     * 获取两个日期是否为同一天
     * @param before 开始时间
     * @param after 结束时间
     * @return boolean
     */
    public static boolean isSameDate(Date before,Date after){
        boolean flag = false;
        String start = formatDate(before,"yyyy-MM-dd");
        String end = formatDate(after,"yyyy-MM-dd");
        if(start.equals(end)){
            flag = true;
        }
        return flag;
    }

    /**
     * 获取增加 days 天数后的日期
     * @param date
     * @param days 需要增加的天数
     * @return
     */
    public static Date getAddDate(Date date,int days){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DAY_OF_MONTH, days);// date + days天
        return c.getTime();
    }

    /**
     * 通过时间秒毫秒数判断两个时间的间隔
     *
     * @param date1
     * @param date2
     * @return 秒
     */
    public static int differentDaysBySecond(Date date1, Date date2) {
        int second = (int) ((date2.getTime() - date1.getTime()) / 1000);
        return second;
    }

    /**
     * 是否是在线时间段
     * @param d1 上传数据的时间
     * @param d2 当前系统时间
     * @param interval 时间间隔: 秒
     * @return boolean
     */
    public static boolean isOnLineTime(Date d1,Date d2,int interval){
        return differentDaysBySecond(d1,d2) < interval;
    }

    /**
     * 将长时间格式字符串转换为时间 yyyy-MM-dd HH:mm:ss
     *
     * @param strDate
     * @return
     */
    public static Date strToDateLong(String strDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        ParsePosition pos = new ParsePosition(0);
        Date strtodate = formatter.parse(strDate, pos);
        return strtodate;
    }

    /**
     * 将短时间格式字符串转换为时间 yyyy-MM-dd
     *
     * @param strDate
     * @return
     */
    public static Date strToDateShort(String strDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        ParsePosition pos = new ParsePosition(0);
        Date strtodate = formatter.parse(strDate, pos);
        return strtodate;
    }

    public static Date strToDate(String strDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date strtodate = null;
        try {
            strtodate = formatter.parse(strDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return strtodate;
    }

    /**
     * 获取日期的类型，0：工作日；1：周末；2：节假日
     * @param httpArg 日期字符串，格式：20180215
     * @return
     */
    public static  String getDateType(String httpArg){
        //返回数据：{"code":10000,"date":2}
        String httpUrl="http://api.goseek.cn/Tools/holiday";
        BufferedReader reader;
        String result = null;
        StringBuffer sbf = new StringBuffer();
        httpUrl = httpUrl + "?date=" + httpArg;
        try {
            URL url = new URL(httpUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();
            InputStream is = connection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String strRead;
            while ((strRead = reader.readLine()) != null) {
                sbf.append(strRead);
                sbf.append("\r\n");
            }
            reader.close();
            result = sbf.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        Map map = JSON.parseObject(result);
        return map.get("date").toString();
    }
}
