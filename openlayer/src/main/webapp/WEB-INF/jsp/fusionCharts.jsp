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

        // var dataSource = {
        //     "chart": {
        //         "caption": "Salary Hikes by Country",
        //         "subcaption": "2016 - 2017",
        //         "showhovereffect": "1",
        //         "numbersuffix": "%",
        //         "rotatelabels": "1",
        //         "theme": "fusion"
        //     },
        //     "categories": [
        //         {
        //             "category": [
        //                 {
        //                     "label": "Australia"
        //                 },
        //                 {
        //                     "label": "New-Zealand"
        //                 },
        //                 {
        //                     "label": "India"
        //                 },
        //                 {
        //                     "label": "China"
        //                 },
        //                 {
        //                     "label": "Myanmar"
        //                 },
        //                 {
        //                     "label": "Bangladesh"
        //                 },
        //                 {
        //                     "label": "Thailand"
        //                 },
        //                 {
        //                     "label": "South Korea"
        //                 },
        //                 {
        //                     "label": "Hong Kong"
        //                 },
        //                 {
        //                     "label": "Singapore"
        //                 },
        //                 {
        //                     "label": "Taiwan"
        //                 },
        //                 {
        //                     "label": "Vietnam"
        //                 }
        //             ]
        //         }
        //     ],
        //     "dataset": [
        //         {
        //             "seriesname": "2016 Actual Salary Increase",
        //             "plottooltext": "Salaries increased by <b>$dataValue</b> in 2016",
        //             "data": [
        //                 {
        //                     "value": "3"
        //                 },
        //                 {
        //                     "value": "3"
        //                 },
        //                 {
        //                     "value": "10"
        //                 },
        //                 {
        //                     "value": "7"
        //                 },
        //                 {
        //                     "value": "7.4"
        //                 },
        //                 {
        //                     "value": "10"
        //                 },
        //                 {
        //                     "value": "5.4"
        //                 },
        //                 {
        //                     "value": "4.5"
        //                 },
        //                 {
        //                     "value": "4.1"
        //                 },
        //                 {
        //                     "value": "4"
        //                 },
        //                 {
        //                     "value": "3.7"
        //                 },
        //                 {
        //                     "value": "9.3"
        //                 }
        //             ]
        //         },
        //         {
        //             "seriesname": "2017 Projected Salary Increase",
        //             "plottooltext": "Salaries expected to increase by <b>$dataValue</b> in 2017",
        //             "renderas": "line",
        //             "data": [
        //                 {
        //                     "value": "3"
        //                 },
        //                 {
        //                     "value": "2.8"
        //                 },
        //                 {
        //                     "value": "10"
        //                 },
        //                 {
        //                     "value": "6.9"
        //                 },
        //                 {
        //                     "value": "6.7"
        //                 },
        //                 {
        //                     "value": "9.4"
        //                 },
        //                 {
        //                     "value": "5.5"
        //                 },
        //                 {
        //                     "value": "5"
        //                 },
        //                 {
        //                     "value": "4"
        //                 },
        //                 {
        //                     "value": "4"
        //                 },
        //                 {
        //                     "value": "4.5"
        //                 },
        //                 {
        //                     "value": "9.8"
        //                 }
        //             ]
        //         },
        //         {
        //             "seriesname": "Inflation rate",
        //             "plottooltext": "$dataValue projected inflation",
        //             "renderas": "area",
        //             "showanchors": "0",
        //             "data": [
        //                 {
        //                     "value": "1.6"
        //                 },
        //                 {
        //                     "value": "0.6"
        //                 },
        //                 {
        //                     "value": "5.6"
        //                 },
        //                 {
        //                     "value": "2.3"
        //                 },
        //                 {
        //                     "value": "7"
        //                 },
        //                 {
        //                     "value": "5.6"
        //                 },
        //                 {
        //                     "value": "0.2"
        //                 },
        //                 {
        //                     "value": "1"
        //                 },
        //                 {
        //                     "value": "2.6"
        //                 },
        //                 {
        //                     "value": "0"
        //                 },
        //                 {
        //                     "value": "1.1"
        //                 },
        //                 {
        //                     "value": "2.4"
        //                 }
        //             ]
        //         }
        //     ]
        // };

        // FusionCharts.ready(function() {
        //     var myChart = new FusionCharts({
        //         type: "mscombi3d",
        //         renderAt: "chart-container",
        //         width: "100%",
        //         height: "100%",
        //         dataFormat: "json",
        //         dataSource:dataSource
        //     }).render();
        // });
        $("#bt").on("click",function () {
            $.ajax({
                url: "/water/getWaterBySite?type=reservoir&site=80407000",
                type: "get",
                success:function (data) {
                    // dataSource.categories = null;
                    // myChart.dataSource = dataSource;

                    var dataXml = "<graph caption='水位信息' yAxisName='水位(m)' baseFontSize='12' baseFont='微软雅黑' showNames='1' decimalPrecision='0' formatNumberScale='0' bgColor='#EEEEEE'  bgAlpha='70'>";
                    // for (var i = 0; i < data.length; i++) {
                    //     dataXml += "<set name='" + data[i].time + "' value='" + data[i].waterPos + "'/>";
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

                    var chartId = 1;
                    var myChart2 = new FusionCharts("mscombi3d","myChartId2", "800","600");
                    myChart2.setTransparent(true);
                    // myChart2.setXMLData(dataXml);
                    myChart2.setDataURL("fusion.xml");
                    myChart2.render("chart-container");

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
