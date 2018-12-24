<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/11/26
  Time: 11:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>水利信息在线分析服务系统</title>
    <link href="lib/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link type="text/css" rel="stylesheet" href="lib/bootstrap-3.3.7-dist/css/bootstrap.css" />
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <link href="lib/bootstrap-datepicker/css/bootstrap-datepicker.css" rel="stylesheet" type="text/css">

    <!-- jQuery库 -->
    <script src="lib/jquery-3.3.1.min.js" type="text/javascript"></script>
    <!--OL3库-->
    <!--    <script src="Libs/ol/ol.js" type="text/javascript"></script>-->
    <script src="lib/ol-5.3.0/ol.js" type="text/javascript"></script>
    <link href="lib/ol-5.3.0/ol.css" rel="stylesheet" type="text/css" />
    <!--OL3扩展库-->
    <%--<script src="Libs/ol/source/GoogleMapSource.js" type="text/javascript"></script>--%>
    <%--<script src="Libs/ol/layer/GoogleMapLayer.js" type="text/javascript"></script>--%>
    <!-- 第三方插件库 统计图插件 -->
    <script src="lib/fusioncharts/fusioncharts.js" type="text/javascript"></script>
    <script src="lib/fusioncharts/fusioncharts.charts.js" type="text/javascript"></script>
    <!-- 第三方插件库 -->
    <script src="lib/jquery-ui-1.12.1/jquery-ui.js" type="text/javascript"></script>
    <%--<script src="Libs/jquery.ui.datepicker-zh-CN.js" type="text/javascript"></script>--%>

    <%--bootstrap库--%>
    <script src="lib/bootstrap-3.3.7-dist/js/bootstrap.js" type="text/javascript"></script>

    <%--datatable--%>
    <%--<link href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" rel="stylesheet">--%>
    <%--<script type="text/javascript" src="//cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>   --%>
    <link href="lib/datatable/jquery.dataTables.css" rel="stylesheet">
    <script type="text/javascript" src="lib/datatable/jquery.dataTables.js"></script>
    <%--datepicker--%>
    <script src="lib/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>

</head>
<body>
<div class="backgroundDiv">
</div>
<!-- 地图底图切换列表 -->
<input type="checkbox" id="annotation">
<select class="layerSwitcherDiv" id="layerSwitcherBtn">
    <option value="road" selected="selected">谷歌交通图</option>
    <option value="terrain">谷歌地形图</option>
    <option value="vector">谷歌矢量图</option>
    <option value="raster">谷歌遥感图</option>
</select>
<div class="logoImg"></div>
<!-- 功能模块面板 start -->
<div class="containerBack" id="coverLayer"></div>
<div class="applyImg" id="imgApply">
    综合应用
</div>
<div class="closeDiv">
    <div class="closeImg" id="closeFun">
    </div>
</div>
<div class="applyContainer" id="comApply">
    <ul>
        <li><input class="applyInput" type="checkbox" id="sssq"/><label for="sssq">实时水情</label></li>
        <li><input class="applyInput" type="checkbox" id="ssyq"/><label for="ssyq">实时雨情</label></li>
        <li><input class="applyInput" type="checkbox" id="tflj"/><label for="tflj">台风路径</label></li>
        <li><input class="applyInput" type="checkbox" id="wxyt"/><label for="wxyt">卫星云图</label></li>
    </ul>
</div>
<!-- 功能模块面板 end -->
<!-- 地图容器-->
<div id="map">
    <!-- Popup -->
    <div id="popup" class="ol-popup" >
        <div id="popup-closer" class="ol-popup-closer"></div>
        <div id="popup-content">
        </div>
    </div>
</div>
<!-- 功能结果展示 -->
<div class="LabelList">
    <ul id="labelUL"></ul>
</div>
<!-- 实时水情start -->
<div class="sqDiv">
    <div class="sqTop">
        <div class="sqHeader">
            条件选择</div>
        <div class="sqContent">
            <input class="sqCheckBox" id="RverInfo" type="checkbox"/>水库
            <input class="sqCheckBox" id="riverInfo" type="checkbox" checked="checked" />河流
        </div>
    </div>
    <div class="sqMain">
        <div class="skxx">
            <div class="sqHeader" >
                水库信息(单位：m)</div>
            <div class="hlxxContent" id="skxxTab">
                <table id="reservoir">
                    <thead>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </thead>
                </table>
            </div>
        </div>
        <div class="hlxx">
            <div class="sqHeader" >
                河流信息(单位：m)
            </div>
            <div class="hlxxContent" id="hlxxTab">
                <table id="river">
                    <thead>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="sqSplitDiv" id="sqSplitBtn"></div>
<!-- 实时水情end -->
<!-- 实时雨情statr -->
<div class="ssyqDiv" id="ssyqFun">
    <div class="yqTop">
        <div class="sqHeader">
            条件选择</div>
        <div class="yqTopTime">
            &nbsp&nbsp 从<input id="ssyqfrom1" name="from" type="text" value="2008-05-15 " />
            <select id="fromTime">
                <option value="00" selected="selected">0时</option>
                <option value="06">6时</option>
                <option value="12">12时</option>
                <option value="18">18时</option>
            </select><br />
            <br />
            &nbsp&nbsp 到<input id="ssyqfrom2" name="from" type="text" value="2008-05-16 " />
            <select id="toTime">
                <option value="00">0时</option>
                <option value="06" selected="selected">6时</option>
                <option value="12">12时</option>
                <option value="18">18时</option>
            </select>
        </div>
    </div>
    <div class="yqCnter">
        <div class="sqHeader">
            雨量范围（单位：mm）</div>
        <div class="yqContent">
            <ul>
                <li style="background: url('images/shishiyuqing/yq00.png') no-repeat;">
                    <input class="ylxxCheckbox" type="checkbox" value="0"
                           checked="true" />0</li>
                <li style="background: url('images/shishiyuqing/yq01.png') no-repeat;">
                    <input class="ylxxCheckbox" type="checkbox" value="10"/>10</li>
                <li style="background: url('images/shishiyuqing/yq02.png') no-repeat;">
                    <input class="ylxxCheckbox" type="checkbox" value="25"/>25</li>
                <li style="background: url('images/shishiyuqing/yq03.png') no-repeat;">
                    <input class="ylxxCheckbox" type="checkbox" value="50"/>50</li>
                <li style="background: url('images/shishiyuqing/yq04.png') no-repeat;">
                    <input class="ylxxCheckbox" type="checkbox" value="100"
                           checked="true" />100</li>
                <li style="background: url('images/shishiyuqing/yq05.png') no-repeat;">
                    <input class="ylxxCheckbox" type="checkbox" value="250"/>250</li>
                <li style="background: url('images/shishiyuqing/yq06.png') no-repeat;">
                    <input class="ylxxCheckbox" type="checkbox" value="260"/>250以上</li>
            </ul>
        </div>
    </div>
    <div class="yqBottom">
        <div id="ylxx">
            <div class="yqHeader">
                雨量信息(单位：mm)</div>
            <div class="ylxxContent" id="ylxxTab" style="display: block">
                <table id="rainTable" style="width: 250px;">
                    <thead>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </thead>
                </table>
            </div>
        </div>
        <div id="gszdyl">
            <div class="yqHeader">
                各市最大雨量</div>
            <div class="ylxxContent" id="gszdylTab">
                <table id="maxRainTable" style="width: 250px;">
                    <thead>
                    <td></td>
                    <td></td>
                    </thead>
                </table>
            </div>
        </div>
        <div id="ljtj">
            <div class="yqHeader">
                量级统计</div>
            <div class="ylxxContent" id="ljtjTab">
                <table id="ljtjTable">
                    <tr class='ssyqTrInfo c'>
                        <th>
                            雨量范围（单位：mm）
                        </th>
                        <th>
                            区县数
                        </th>
                    </tr>
                    <tr class='ssyqTrInfo c'>
                        <td>
                            0.1-9.9
                        </td>
                        <td id="tr0">
                            0
                        </td>
                    </tr>
                    <tr class='ssyqTrInfo c'>
                        <td>
                            10-24.0
                        </td>
                        <td id="tr1">
                            0
                        </td>
                    </tr>
                    <tr class='ssyqTrInfo c'>
                        <td>
                            25-49.9
                        </td>
                        <td id="tr2">
                            0
                        </td>
                    </tr>
                    <tr class='ssyqTrInfo c'>
                        <td>
                            50-99.9
                        </td>
                        <td id="tr3">
                            0
                        </td>
                    </tr>
                    <tr class='ssyqTrInfo c'>
                        <td>
                            100-249.9
                        </td>
                        <td id="tr4">
                            0
                        </td>
                    </tr>
                    <tr class='ssyqTrInfo c'>
                        <td>
                            250以上
                        </td>
                        <td id="tr5">
                            0
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
<!-- 实时雨情end -->
<!-- 台风路径start -->
<div class="tfDiv">
    <div class="tuliCoverLayer" id="tuliCoverLayer"></div>
    <div class="tuliDiv">
        <div class="tuliHeader">
            台风图例
        </div>
        <div class="closeDivTF">
            <div class="closeImgTF" id="closeFunTF">
            </div>
        </div>
        <div class="tuliContent">
            <ul>
                <li style="background: url('images/taifeng/Wind01.png') no-repeat;">超强台风</li>
                <li style="background: url('images/taifeng/Wind03.png') no-repeat;">强台风</li>
                <li style="background: url('images/taifeng/Wind02.png') no-repeat;">台风</li>
                <li style="background: url('images/taifeng/Wind04.png') no-repeat;">强热带风暴</li>
                <li style="background: url('images/taifeng/Wind05.png') no-repeat;">热带风暴</li>
                <li style="background: url('images/taifeng/Wind06.png') no-repeat;">热带气压</li>
            </ul>
        </div>
    </div>
    <div class="tfRightDiv">
        <div class="choiceDiv">
            <div class="tfHeader">
                条件选择
            </div>
            <div class="tftjxzContent" id="tftjxzTab">
            </div>
        </div>
        <div class="resDiv">
            <div class="tfHeader">
                台风路径
            </div>
            <div class="tfljContent" id="tfljTab">
            </div>
        </div>
    </div>
</div>
<!-- 台风路径end -->
<!-- 卫星云图start -->
<div id="dialog" title="卫星云图">
    <iframe id="wxytIframe"></iframe>
</div>
<!-- 卫星云图end -->
<!-- 系统功能库 -->
<script src="js/SLSysFun.js" type="text/javascript"></script>
</body>
</html>
