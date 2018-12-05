<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/11/26
  Time: 11:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Apricot 1.3</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Le styles -->
    <script type="text/javascript" src="assets/js/jquery.min.js"></script>

    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/loader-style.css">
    <link rel="stylesheet" href="assets/css/bootstrap.css">

    <link href="assets/css/icons-style.css" rel="stylesheet">

    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="http://jqueryui.com/resources/demos/style.css">





    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- Fav and touch icons -->
    <link rel="shortcut icon" href="assets/ico/minus.png">
</head>

<body><div id="awwwards" class="right black"><a href="http://www.awwwards.com/best-websites/apricot-navigation-admin-dashboard-template" target="_blank">best websites of the world</a></div>
<!-- Preloader -->
<div id="preloader">
    <div id="status">&nbsp;</div>
</div>

<jsp:include page="included.jsp" flush="true"></jsp:include>

<!--  PAPER WRAP -->
<div class="wrap-fluid">
    <div class="container-fluid paper-wrap bevel tlbr">

        <!-- CONTENT -->
        <!--TITLE -->
        <div class="row">
            <div id="paper-top">
                <div class="col-sm-3">
                    <h2 class="tittle-content-header">
                        <i class="icon-preview"></i>
                        <span>Icon
                            </span>
                    </h2>

                </div>

                <div class="col-sm-7">
                    <div class="devider-vertical visible-lg"></div>
                    <div class="tittle-middle-header">

                        <div class="alert">
                            <button type="button" class="close" data-dismiss="alert">×</button>
                            <span class="tittle-alert entypo-info-circled"></span>
                            Welcome back,&nbsp;
                            <strong>Dave mattew!</strong>&nbsp;&nbsp;Your last sig in at Yesterday, 16:54 PM
                        </div>

                    </div>

                </div>
                <div class="col-sm-2">
                    <div class="devider-vertical visible-lg"></div>
                    <div class="btn-group btn-wigdet pull-right visible-lg">
                        <div class="btn">
                            Widget</div>
                        <button data-toggle="dropdown" class="btn dropdown-toggle" type="button">
                            <span class="caret"></span>
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul role="menu" class="dropdown-menu">
                            <li>
                                <a href="#">
                                    <span class="entypo-plus-circled margin-iconic"></span>Add New</a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="entypo-heart margin-iconic"></span>Favorite</a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="entypo-cog margin-iconic"></span>Setting</a>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </div>
        <!--/ TITLE -->

        <!-- BREADCRUMB -->
        <ul id="breadcrumb">
            <li>
                <span class="entypo-home"></span>
            </li>
            <li><i class="fa fa-lg fa-angle-right"></i>
            </li>
            <li><a href="#" title="Sample page 1">Home</a>
            </li>
            <li><i class="fa fa-lg fa-angle-right"></i>
            </li>
            <li><a href="#" title="Sample page 1">Feature</a>
            </li>
            <li class="pull-right">
                <div class="input-group input-widget">

                    <input style="border-radius:15px" type="text" placeholder="Search..." class="form-control">
                </div>
            </li>
        </ul>

        <!-- END OF BREADCRUMB -->


        <div class="content-wrap">
            <div class="row">
                <div class="col-sm-12">
                    <%--<div class="nest" id="DripClose">--%>
                        <div id="menu">
                            <label>几何图形类型：&nbsp;</label>
                            <select id="type">
                                <option value="Point">点</option>
                                <option value="LineString">线</option>
                                <option value="Polygon">面</option>
                            </select>
                            <input type="button" value="清空" id="empty">
                            <input type="button" value="查询" id="query">
                        </div>
                        <div id="dialog-confirm" title="图形属性信息设置">
                            <label >图形类型（GeoType）：</label>
                            <select id="geoType">
                                <option value="Point" selected="selected" disabled="disabled">点</option>
                                <option value="LineString" disabled="disabled">线</option>
                                <option value="Polygon" disabled="disabled">多边形</option>
                            </select><br/>
                            <label >信息类别（infoType）：</label>
                            <select id="infoType">
                                <option value="Point" selected="selected" disabled="disabled">兴趣点</option>
                                <option value="LineString" disabled="disabled">道路线</option>
                                <option value="Polygon" disabled="disabled">高校区域</option>
                            </select><br/>
                            <label>名称（name）：<input id='name' type="text" value=""></label><br/>
                            <label>省市（city）：<input id='city' type="text" value=""></label>
                        </div>
                        <div id="map"></div>
                    <%--</div>--%>
                </div>
            </div>
        </div>

        <!-- /END OF CONTENT -->



        <!-- FOOTER -->
        <div class="footer-space"></div>
        <div id="footer">
            <div class="devider-footer-left"></div>
            <div class="time">
                <p id="spanDate">
                <p id="clock">
            </div>
            <div class="copyright">Make with Love
                <span class="entypo-heart"></span>Collect from <a href="http://www.cssmoban.com/" title="网页模板" target="_blank">网页模板</a> All Rights Reserved</div>
            <div class="devider-footer"></div>

        </div>
        <!-- / END OF FOOTER -->


    </div>
</div>
<!--  END OF PAPER WRAP -->


<!-- MAIN EFFECT -->
<script type="text/javascript" src="assets/js/preloader.js"></script>
<script type="text/javascript" src="assets/js/bootstrap.js"></script>
<script type="text/javascript" src="assets/js/app.js"></script>
<script type="text/javascript" src="assets/js/load.js"></script>
<script type="text/javascript" src="assets/js/main.js"></script>






<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>

<%--openlayer--%>
<link rel="stylesheet" href="ol-5.3.0/ol.css" type="text/css" />
<script src="ol-5.3.0/ol.js" type="text/javascript" charset="utf-8"></script>

<%--jquery-ui--%>

<script type="text/javascript" src="lib/jquery-ui.js"></script>

<%--自定义--%>
<script type="text/javascript" src="js/feature.js"></script>
<link rel="stylesheet" href="css/feature.css">


<!-- /MAIN EFFECT -->
<script>
    $('.entypo-tooltip > ul > li').tooltip({
        "margin-top": "50px"
    });
</script>





</body>

</html>
