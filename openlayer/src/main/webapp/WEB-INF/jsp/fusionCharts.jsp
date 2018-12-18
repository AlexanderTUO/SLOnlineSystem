<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/12/11
  Time: 15:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>fusionCharts</title>

    <!-- jQuery库 -->
    <script src="lib/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="lib/fusioncharts/fusioncharts.js" type="text/javascript"></script>
    <script src="lib/fusioncharts/fusioncharts.charts.js" type="text/javascript"></script>

</head>
<script type="text/javascript">






    //配置DataTables默认参数
    $(function () {



        $("#bt").on("click", function () {
            $.ajax({
                url: "/water/getWaterBySite?type=reservoir&site=80407000",
                type: "get",
                success: function (data) {
                    // dataSource.categories = null;
                    // myChart.dataSource = dataSource;

                    var dataXml = "<graph caption='水位信息' yAxisName='水位(m)' baseFontSize='12' baseFont='微软雅黑' showNames='1' decimalPrecision='0' formatNumberScale='0' bgColor='#EEEEEE'  bgAlpha='70'>";
                    // for (var i = 0; i < date.length; i++) {
                    //     dataXml += "<set name='" + date[i].time + "' value='" + date[i].waterPos + "'/>";
                    // }
                    var names = new Array();
                    var values = new Array();


                    for (var i = 0; i < data.length; i++) {
                        names[i] = data[i].wateTime;
                        values[i] = data[i].waterPos + "";


                        dataXml += "<set name='" + names[i] + "' value='" + values[i] + "' />";
                    }

                    dataXml += "</graph>";

                    // if ($("#ChartRltdiv").length > 0) {
                    //     $("#ChartRltdiv").remove();
                    // }






                    var chartDataMap = {
                        // 'caption': '消防档案完成度统计图',
                        // 'formatnumberscale': '1',
                        // 'showBorder': '1',
                        // 'showpercentvalues': '1',
                        // 'pieslicedepth': '30',
                        // 'numberSuffix': '%',
                        // 'yAxisMinValue': '10',
                        // 'yAxisMaxValue': '100',
                        // //                     'xAxisName':'单位名称',
                        // //                     'yAxisName':'完成度百分比',
                        // "canvasbgColor": "#1790e1",
                        // "canvasbgAlpha": "10",
                        // "showCanvasBorder": "1",
                        // "showLabels": "sdfsd",
                        // //                     "labelDisplay": "rotate"
                        // //                     "labelDisplay": "auto"
                        // "toolTipSepChar": "：",
                        // "baseFontSize": "14"
                        "caption": "Monthly revenue for last year",
                        "subCaption": "Harry's SuperMart",
                        "xAxisName": "Month", //X轴坐标名称
                        "yAxisName": "Revenues (In USD)", //Y轴坐标名称
                        "theme": "fint", //这个就是图表的显示主题，所以不用自定义那么多的属性了。
                    };

                    // 就是这个
                    var chart = new FusionCharts({
                        type: "Column3D",
                        renderAt: "chart-container",
                    }).render();

                    var showDataMap = {'data': data};
                    chart.setJSONData(showDataMap);


                    var myChart2 = new FusionCharts("mscombi3d", "myChartId2", "800", "600","json");
                    myChart2.setTransparent(true);
                    // myChart2.setXMLData(dataXml);
                    // myChart2.setDataURL("fusion.xml");
                    myChart2.setChartData({
                        chart: {
                            caption: "Market Share Impact",
                            numberPrefix: "USD"
                        },
                        data: [
                            { label: "Current Prototype", value: "13773" },
                            { label: "Revised Prototype", value: "16069" },
                            { label: "Previous Prototype", value: "11477" },
                            { label: "Recalled Prototype", value: "4591" }
                        ]
                    }, "json");
                    myChart2.setJSONData()
                    // myChart2.render("chart-container");

            var MyChart = new FusionCharts({
            "type": "column3d", //显示图表类型
            "renderAt": "chart-container", //显示区域ID
            "width": "500",
            "height": "300",
            "dataFormat": "json", //数据源格式
            "dataSource": {
                "chart": { //图表属性
                    "caption": "Monthly revenue for last year",
                    "subCaption": "Harry's SuperMart",
                    "xAxisName": "Month", //X轴坐标名称
                    "yAxisName": "Revenues (In USD)", //Y轴坐标名称
                    "theme": "fint", //这个就是图表的显示主题，所以不用自定义那么多的属性了。
                },
                "data":data
                // "date": [{
                //     "label": "Jan",
                //     "value": "420000"
                // }, {
                //     "label": "Feb",
                //     "value": "810000"
                // }, {
                //     "label": "Mar",
                //     "value": "720000"
                // }, {
                //     "label": "Apr",
                //     "value": "550000"
                // }, {
                //     "label": "May",
                //     "value": "910000"
                // }, {
                //     "label": "Jun",
                //     "value": "510000"
                // }, {
                //     "label": "Jul",
                //     "value": "680000"
                // }]
            }
        });
            // MyChart.setJSONData(date)
        // MyChart.render();

                }
            })
        })
    })

</script>
<body>
<button id="bt">请求数据</button>
<div id="chart-container">
</div>
</body>
</html>
