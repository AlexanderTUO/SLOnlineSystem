$(function () {
    //图层
    var googleLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0' //交通图
        })

    });

    var newId = 1;
    //保存绘制的feature
    var drawFeature = null;

    // 动画圆圈的图层
    var vectorLayer =  new ol.layer.Vector({
        source: new ol.source.Vector()
    })

    // 保存绘制线的图层
    var lineLayer =  new ol.layer.Vector({
        source: new ol.source.Vector(),
        style:new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 4
            })
        })
    })

    var projection = ol.proj.get("EPSG:3857");
    //视图
    var view = new ol.View({
        center: [12308196.042592192, 2719935.2144997073],
        // projection: projection,
        zoom:6,
    })

    //控件
    var controls_extend = new ol.control.defaults({
        attribution:true
    }).extend([
        new ol.control.FullScreen(),
        new ol.control.MousePosition(),
        new ol.control.OverviewMap(),
        new ol.control.ScaleLine(),
        new ol.control.ZoomSlider(),
        new ol.control.ZoomToExtent(),
        new ol.control.Attribution()
    ]);

    //
    var map = new ol.Map({
        layers: [googleLayer],
        view: view,
        controls:controls_extend,
        target: 'map'
    })

    function loadGoogleMap(mapType) {
        // url: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}' //交通图2
        // url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}' //影像图
        // url: 'http://www.google.cn/maps/vt?lyrs=t@189&gl=cn&x={x}&y={y}&z={z}' //地形图
        // url: 'http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}' //影像注记层地址
        // url: '' //交通图
        switch (mapType){
            case "terrain":
                googleLayer = new ol.layer.Tile({
                    source:new ol.source.XYZ({
                        url: 'http://www.google.cn/maps/vt?lyrs=t@189&gl=cn&x={x}&y={y}&z={z}' //地形图
                    })
                });
                break;
            case "vector":
                googleLayer = new ol.layer.Tile({
                    source:new ol.source.XYZ({
                        url: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}' //交通图2
                    })
                });
                break;
            case "raster":
                googleLayer = new ol.layer.Tile({
                    source:new ol.source.XYZ({
                        url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}' //影像图
                    })
                });
                break;
            case "road":
                googleLayer = new ol.layer.Tile({
                    source:new ol.source.XYZ({
                        url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0' //交通图
                    })
                });
            default:
        }
        map.addLayer(googleLayer);

    }

    function onlayerSwitchBtn() {
        var layerType = $("#layerSwitcherBtn option:selected").val();
        map.removeLayer(googleLayer);
        loadGoogleMap(layerType);
    }
    // 绑定地图切换按钮
    document.getElementById("layerSwitcherBtn").onclick = onlayerSwitchBtn;

    // 注记层
    var annotationLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}' //影像注记层地址
        })
    });

    // 绑定注记切换按钮
    $("#annotation").change(function () {
        var annotation = $("#annotation").prop('checked');
        if (annotation) {
            map.addLayer(annotationLayer);
        } else {
            map.removeLayer(annotationLayer);
        }
    })


    var reservoirInfo;
    var riverInfo;

    var type;


    var isRiver = true;
    var isReser = false;

    var riverArray=null;
    var rverArray=null;

    var riverTable;
    var rverTable;

    /**
     * 地图移动到要素
     * @param feature 坐标
     */
    function moveTo(feature) {
        var geo = feature.getGeometry();
        var coordinate = geo.getCoordinates();
        // map.getView().setCenter(coordinate);
        map.getView().animate({
            center: coordinate,
            duration: 1000,
            zoom: 8
        })
    }
    /*********************************实时水情START********************************************/

    /**
     * 绑定实时水情切换按钮
     */
    $("#sssq").change(function () {
        var sssq = $("#sssq").prop('checked');

        reservoirInfo = $("#RverInfo").prop('checked');
        riverInfo = $("#riverInfo").prop('checked');

        if (sssq) {
            isRiver = true;
            isReser = false;
            $(".sqDiv").show();
            $(".hlxxContent").show();
            // $("#skxxTab").hide();
            queryWaterInfo("river");

        } else {//不选中实时水情
            clearMarkers("river");
            $("#RverInfo").attr('checked',false);
            $("#river").attr('checked',true);
            $(".sqDiv").hide();
            $(".hlxxContent").hide();
        }
    })
    
    function queryWaterInfo(type) {
        if (type == "reservoir" && isReser) {
            $.ajax({
                url: "/water/getWaterInfo",
                type: "post",
                data: JSON.stringify({
                    type: "zz"
                }),
                dataType: "json",
                contentType: "application/json",
                success: function (pagingResult) {
                    addMarkers(pagingResult.data);
                    // addToTable(type);
                }
            });
            if (rverTable == null) {
                rverTable = $("#reservoir").DataTable({
                    serverSide: true,
                    ajax: {
                        url: "/water/getWaterInfo",
                        type: "post",
                        data: function (d) {
                            var type = "zz";
                            d.type = type;
                            return JSON.stringify(d);
                        },
                        // dataSrc: ""
                        dataType: "json",
                        contentType: "application/json",
                    },
                    //默认最后一列（最后更新时间）降序排列
                    // order: [[ 2, "desc" ]],
                    columnDefs: [
                        {
                            targets: 0,
                            data: "stationCode",
                            title: "站码",
                        },
                        {
                            targets: 1,
                            data: "stationName",
                            title: "站名",
                        },
                        {
                            targets: 2,
                            data: "riverName",
                            title: "河流名",
                        },
                        {
                            targets: 3,
                            data: "category",
                            title: "分类",
                        },
                        {
                            targets: 4,
                            data: "address",
                            title: "站址",
                        },
                    ]

                });
            } else {
                rverTable.ajax.reload();
            }

            /**
             * 行点击事件
             */
            $('#reservoir tbody').on('click', 'tr', function () {

                var data = rverTable.row(this).data();
                var type = "zz";
                var stationCode = data.stationCode;
                $.ajax({
                    url: "/water/getWaterBySite?type=" + type + "&site=" + stationCode,
                    type: "get",
                    success: function (waterInfo) {
                        if (waterInfo) {
                            var lon = waterInfo[0].longitude;
                            var lat = waterInfo[0].latitude;
                            var coordinate = [parseFloat(lon), parseFloat(lat)];

                            var point = new ol.geom.Point(coordinate);

                            var feature = new ol.Feature({
                                geometry: point,
                                name: waterInfo[0].address,
                                type: "reservoir",
                                info: waterInfo[0].stationCode,
                            })
                            moveTo(feature);
                            showWaterDetail(feature);
                        }
                    }
                })


            })
        }
        if (type == "river" && isRiver) {
            $.ajax({
                url: "/water/getWaterInfo",
                type: "post",
                data: JSON.stringify({
                    type: "rr"
                }),
                dataType: "json",
                contentType: "application/json",
                success: function (pagingResult) {
                    addMarkers(pagingResult.data);
                    // addToTable(type);
                }
            });
            if (riverTable == null) {
                riverTable = $("#river").DataTable({
                    serverSide: true,
                    ajax: {
                        url: "/water/getWaterInfo",
                        type: "post",
                        data:function(d){
                            var type = "rr";
                            d.type = type;
                            return JSON.stringify(d);
                        },
                        // dataSrc: ""
                        dataType: "json",
                        contentType: "application/json",
                    },
                    //默认最后一列（最后更新时间）降序排列
                    // order: [[ 2, "desc" ]],
                    columns: [
                        {
                            targets: 0,
                            data: "stationCode",
                            title: "站码",
                        },
                        {
                            targets: 1,
                            data: "stationName",
                            title: "站名",
                        },
                        {
                            targets: 2,
                            data: "riverName",
                            title: "河流名",
                        },
                        {
                            targets: 3,
                            data: "category",
                            title: "分类",
                        },
                        {
                            targets: 4,
                            data: "address",
                            title: "站址",
                        },
                        // {
                        //     targets: 5,
                        //     data: null,
                        //     title: "行号",
                        // },
                    ]
                });
            } else {
                riverTable.ajax.reload();
            }

            /**
             * 行点击事件
             */
            $('#river tbody').on('click', 'tr', function () {

                var data = riverTable.row(this).data();
                var type = "rr";
                var stationCode = data.stationCode;
                $.ajax({
                    url: "/water/getWaterBySite?type=" + type + "&site=" + stationCode,
                    type: "get",
                    success:function (waterInfo) {
                        if (waterInfo) {
                            var lon = waterInfo[0].longitude;
                            var lat = waterInfo[0].latitude;
                            var coordinate = [parseFloat(lon), parseFloat(lat)];

                            var point = new ol.geom.Point(coordinate);

                            var feature = new ol.Feature({
                                geometry: point,
                                name:waterInfo[0].address,
                                type: "river",
                                info: waterInfo[0].stationCode,
                            })
                            moveTo(feature);
                            showWaterDetail(feature);
                        }
                    }
                })

            } );

            // riverTable.on("draw.dt",function () {
            //
            //     // riverTable.Columns.Add("operateStr");
            //     riverTable.column(5,{
            //         search: "applied",
            //         order: "applied"
            //     }).nodes().each(function (cell,i) {
            //         i = i + 1;
            //         var page = riverTable.page.info();
            //         var pageno = page.page;
            //         var length = page.length;
            //
            //         var columnIndex = i + pageno * length;
            //         cell.innerHTML = columnIndex;
            //     })
            // })
        };


    }

    var ssslLayer;
    var ssslSource =new ol.source.Vector();

    /**
     * 添加标注
     * @param waterInfo
     */
    function addMarkers(waterInfo) {
        if (ssslLayer == null) {
            ssslLayer =  new ol.layer.Vector({
                source: new ol.source.Vector()
            })
            map.addLayer(ssslLayer);
        }

        reservoirInfo = $("#RverInfo").prop('checked');
        riverInfo = $("#riverInfo").prop('checked');
        // var markerFeature;
        var riverFeature;
        var reservoirFeature;

        if (isRiver&&riverInfo) {
            for (var index = 0; index < waterInfo.length; index++) {
                var lon = waterInfo[index].longitude;
                var lat = waterInfo[index].latitude;
                var point = new ol.geom.Point([parseFloat(lon), parseFloat(lat)]);

                var imgURL = "images/sssq-green.png";
                if (waterInfo[index].waterPos < waterInfo[index].normalNum) {
                    imgURL = "images/sssq-red.png";
                }
                riverFeature = new ol.Feature({
                    geometry: point,
                    name:waterInfo[index].address,
                    type: "river",
                    imgURL:imgURL,
                    info: waterInfo[index].stationCode,
                    fid: "river" + index.toString()
                })
                riverFeature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        src: imgURL
                    })
                }));
                ssslLayer.getSource().addFeature(riverFeature);
                if (riverArray == null) {
                    riverArray = new Array();
                }
                riverArray.push(riverFeature);
            }

        }

        if (isReser&&reservoirInfo) {
            for (var index = 0; index < waterInfo.length; index++) {
                var lon = waterInfo[index].longitude;
                var lat = waterInfo[index].latitude;
                var point = new ol.geom.Point([parseFloat(lon), parseFloat(lat)]);

                var imgURL = "images/sssq-green.png";
                if (waterInfo[index].waterPos < waterInfo[index].normalNum) {
                    imgURL = "images/sssq-red.png";
                }
                reservoirFeature = new ol.Feature({
                    geometry: point,
                    name:waterInfo[index].address,
                    type: "reservoir",
                    imgURL:imgURL,
                    info: waterInfo[index].stationCode,
                    fid: "reservoir" + index.toString()
                })
                reservoirFeature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        src: imgURL
                    })
                }));
                ssslLayer.getSource.addFeature(reservoirFeature);

                if (rverArray == null) {
                    rverArray = new Array();
                }
                rverArray.push(reservoirFeature);
            }

        }
        // ssslLayer.setSource(ssslSource);
        // map.removeLayer(ssslLayer);
        // map.addLayer(ssslLayer);
    }

    /**
     * 清空标注
     * @param type
     */
    function clearMarkers(type) {
        if (ssslLayer != null){
            if (type == 'river' && riverArray != null) {
                for (var index = 0; index < riverArray.length; index++) {
                    ssslLayer.getSource().removeFeature(riverArray[index]);
                }
                riverArray = null;
                // ssslLayer.setSource(ssslSource);
            }
            if (type == 'reservoir' && rverArray != null) {
                for (var index = 0; index < rverArray.length; index++) {
                    ssslLayer.getSource().removeFeature(rverArray[index]);
                }
                rverArray = null;
                // ssslLayer.setSource(ssslSource);
            }
        }
    }

    /**
     * 显示水情信息
     * @param type
     */
    function showWaterInfo(type) {
        reservoirInfo = $("#RverInfo").prop('checked');
        riverInfo = $("#riverInfo").prop('checked');

        switch (type) {
            case "river":
                if (riverInfo) {
                    isRiver = true;
                    queryWaterInfo("river");
                    $("#hlxxTab").show();
                } else {
                    $("#hlxxTab").hide();
                    clearMarkers("river");
                    isRiver = false;
                }
                break;
            case "reservoir":
                if (reservoirInfo) {
                    isReser = true;
                    queryWaterInfo("reservoir");
                    $("#skxxTab").show();
                } else {
                    $("#skxxTab").hide();
                    clearMarkers("reservoir");
                    isRiver = false;
                }
                break;
            default:

        }




    }

    // 绑定水库复选框
    $("#RverInfo").change(function () {
        showWaterInfo("reservoir");

    })

    // 绑定河流复选框
    $("#riverInfo").change(function () {
        showWaterInfo("river");
    })

    /**
     * 鼠标选中标注时变成小手
     */
    map.on("pointermove",function (e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? "pointer" : "";
    })

    // 添加pop到map
    var popElement = document.getElementById('popup');
    var popContent = $("#popup-content");
    var popCloser = $("#popup-closer");
    var pop = new ol.Overlay({
        element: popElement,
        positioning: "bottom-center",
        stopEvent: false,
        autoPanAnimation:{
            during: 250
        }
    });
    map.addOverlay(pop);

    popCloser.on("click",function () {
        pop.setPosition(undefined);
        popCloser.blur();
        return false;
    })



    /**
     * 地图点击事件
     */
    map.on("singleclick",function (e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? "pointer" : "";

        var feature = map.forEachFeatureAtPixel(e.pixel,function (feature) {
            return feature;
        })

        if (feature) {
            popContent.html("");
            if (feature.get("type") == "river" || feature.get("type") == "reservoir") {
                showWaterDetail(feature);
            }else if (feature.get("type") == "rain") {
                showRainDetail(feature);
            }

            // var element = pop.getElement();
            // var coordinate = e.coordinate;
            //
            // $(element).popover("destroy");
            // pop.setPosition(coordinate);
            //
            // $(element).popover({
            //     placement: "top",
            //     animate: false,
            //     html: true,
            // })
            //
            // $(element).popover("show");
        }
    })

    /**
     * 展示标注点详情
     * @param feature 矢量
     */
    function showWaterDetail(feature) {

        var type = feature.get("type");
        var stationCode = feature.get("info");
        $.ajax({
            url: "/water/getWaterBySiteCharts?type="+type+"&site="+stationCode,
            type: "get",
            success:function (data) {

                if ($("#ChartRltdiv").length > 0) {
                    $("#ChartRltdiv").remove();
                }

                var html = '<div id="ChartRltdiv" style="width:300px;height:200px;"></div></br>'
                    + '<div style="font-size: 13px;line-height: 20px;">最新水位：' + data[0].value + '</br>时间：' + data[0].label + '</br>站址：' + feature.get("name") + '</div>';
                popContent.html(html);
                // FusionCharts表格
                var chart = new FusionCharts({
                    type: "Column3D",
                    renderAt: "ChartRltdiv",
                    width: "300",
                    height: "200"
                }).render();

                var showDataMap = {'data': data};
                chart.setJSONData(showDataMap);

                var coordinate = feature.getGeometry().getCoordinates();
                pop.setPosition(coordinate);

            }
        })
    }



    /**
     * 时间格式化
     * @param format
     * @returns {*}
     */
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
    /*********************************实时水情END********************************************/

    /*********************************实时雨情START********************************************/

    var rainTable = null;
    var maxRainTable = null;
    var ssyqLayer;
    var ssyqArray;

    $("#ssyqfrom1,#ssyqfrom2").datepicker({
        // format: "yyyy-mm-dd"
        format: "yyyy-mm-dd",
        autoclose: true,
    })

    /**
     * 绑定实时雨情切换按钮事件
     */
    $("#ssyq").change(function () {
        var rainCheck = $("#ssyq").prop('checked');;
        if (rainCheck) {
            addRainInfoToRainTable();
            addRainInfoToMaxRainTable();
            // addRainInfoToStaTable();
            $(".ssyqDiv").show();
            $("#gszdylTab").show();
        }else {
            clearSsyqMarkers();
            $(".ssyqDiv").hide();
        }

    });

    $("#fromTime").change(function () {
        clearSsyqMarkers();
        addRainInfoToRainTable();
        addRainInfoToMaxRainTable();
    });

    $("#toTime").change(function () {
        clearSsyqMarkers();
        addRainInfoToRainTable();
    });

    $(".ylxxCheckbox ").change(function () {
        // var check = $(this).prop;
        // if (check) {
        //     $(this).attr("checked",false)
        // }else {
        //     $(this).attr("checked",true)
        // }
        // var data = rainTable.ajax.params();
        rainTable.draw(false);
    });

    /**
     * 获取雨量范围信息
     * @returns {*}
     */
    function getRainfall() {
        var rainfall = new Array();
        var min = -1;
        var max = -1;
        var result = new Array();

        $(".ylxxCheckbox").each(function () {
            if ($(this).prop('checked')) {
                rainfall.push($(this).val());
            }
        })
        // rainfall = rainfall.sort();
        var length = rainfall.length;
        if (length >=1) {
            min = rainfall[0];
            max = rainfall[length - 1];
        }
        result.push(min);
        result.push(max);
        return result;
    }

    /**
     * 雨量信息表
     */
    function addRainInfoToRainTable() {
        //起始时间
        var from = $("#ssyqfrom1").val() +" "+ $("#fromTime").val() + ":00:00";
        // 截止时间
        var to = $("#ssyqfrom2").val() +" "+ $("#toTime").val() + ":00:00";
        // 雨量
        var rainfall = getRainfall();
        var data = {
            fromTime: from,
            toTime: to,
            min: rainfall[0],
            max: rainfall[1]
        };

        $.ajax({
            url: "/rain/getRainInfo",
            type: "post",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (pagingResult) {
                addSsyqMarkers(pagingResult.data);
                var a = pagingResult.data;
            }
        });

        if (rainTable == null) {
            rainTable = $("#rainTable").DataTable({
                serverSide: true,
                autoWidth: false,
                ajax: {
                    url: "/rain/getRainInfo",
                    type: "post",
                    data: function (d) {
                        var from = $("#ssyqfrom1").val()+$("#fromTime").val()+":00:00";
                        var to = $("#ssyqfrom2").val()+$("#toTime").val()+":00:00";

                        // var fromTime = $("#fromTime").val();
                        // var toTime = $("#toTime").val();

                        var rainfall=getRainfall();

                        d.fromTime = from;//起始时间
                        d.toTime = to;//结束时间

                        d.minRain = rainfall[0];//最小雨量
                        d.maxRain = rainfall[1];//最大雨量
                        // d.minRain = 0;

                        return JSON.stringify(d);
                    },
                    // dataSrc: ""
                    dataType: "json",
                    contentType: "application/json",
                },
                //默认最后一列（最后更新时间）降序排列
                // order: [[ 2, "desc" ]],
                columns: [
                    {
                        // width: "20%",
                        targets: 0,
                        data: "stationCode",
                        title: "站码",
                    },
                    {
                        targets: 1,
                        data: "stationName",
                        title: "站名",
                    },
                    {
                        targets: 2,
                        data: "rainfall",
                        title: "雨量",
                    },
                    {
                        targets: 3,
                        data: "address",
                        title: "站址",
                    },
                ]

            });
        } else {
            rainTable.ajax.reload();
        }

        /**
         * 行点击事件
         */
        $('#rainTable tbody').on('click', 'tr', function () {

            var data = rainTable.row(this).data();
            var stationCode = data.stationCode;
            $.ajax({
                url: "/rain/getRainBySite/"+stationCode,
                type: "get",
                success: function (rainInfo) {
                    if (rainInfo) {
                        var lon = rainInfo[0].longitude;
                        var lat = rainInfo[0].latitude;
                        var coordinate = [parseFloat(lon), parseFloat(lat)];

                        var point = new ol.geom.Point(coordinate);

                        var feature = new ol.Feature({
                            geometry: point,
                            name: rainInfo[0].address,
                            type: "rain",
                            info: rainInfo[0].stationCode,
                        })
                        moveTo(feature);
                        showRainDetail(feature);
                    }
                }
            })


        })

    }

    /**
     * 显示雨情详情
     * @param feature
     */
    function showRainDetail(feature) {
        var stationCode = feature.get("info");
        $.ajax({
            url: "/rain/getRainBySiteCharts/"+stationCode,
            type: "get",
            success:function (data) {

                if ($("#ChartRltdiv").length > 0) {
                    $("#ChartRltdiv").remove();
                }

                var html = '<div id="ChartRltdiv" style="width:300px;height:200px;"></div></br>'
                    + '<div style="font-size: 13px;line-height: 20px;">最新水位：' + data[0].value + '</br>时间：' + data[0].label + '</br>站址：' + feature.get("name") + '</div>';
                popContent.html(html);
                // FusionCharts表格
                var chart = new FusionCharts({
                    type: "line",
                    renderAt: "ChartRltdiv",
                    width: "300",
                    height: "200"
                }).render();

                var showDataMap = {'data': data};
                chart.setJSONData(showDataMap);

                var coordinate = feature.getGeometry().getCoordinates();
                pop.setPosition(coordinate);

            }
        })
    }
    /**
     * 添加标注
     * @param waterInfo
     */
    function addSsyqMarkers(rainInfo) {

        if (ssyqLayer == null) {
            ssyqLayer =  new ol.layer.Vector({
                source: new ol.source.Vector()
            })
            map.addLayer(ssyqLayer);
        }

        var rainFeature;

        for (var index = 0; index < rainInfo.length; index++) {
            var lon = rainInfo[index].longitude;
            var lat = rainInfo[index].latitude;
            var point = new ol.geom.Point([parseFloat(lon), parseFloat(lat)]);

            var imgURL = null;
            if (rainInfo[index].rainfall > 0.0&&rainInfo[index].rainfall <= 9.9) {
                imgURL = "images/shishiyuqing/yq00.png";
            }else if (rainInfo[index].rainfall > 9.9&&rainInfo[index].rainfall <= 24.9) {
                imgURL = "images/shishiyuqing/yq01.png";
            }else if (rainInfo[index].rainfall > 24.9&&rainInfo[index].rainfall <= 49.9) {
                imgURL = "images/shishiyuqing/yq02.png";
            }else if (rainInfo[index].rainfall > 49.9&&rainInfo[index].rainfall <= 99.9) {
                imgURL = "images/shishiyuqing/yq03.png";
            }else if (rainInfo[index].rainfall > 99.9&&rainInfo[index].rainfall <= 249.9) {
                imgURL = "images/shishiyuqing/yq04.png";
            }else if (rainInfo[index].rainfall > 249.9&&rainInfo[index].rainfall < 259.9) {
                imgURL = "images/shishiyuqing/yq05.png";
            }else if (rainInfo[index].rainfall > 259.9) {
                imgURL = "images/shishiyuqing/yq06.png";
            }
            rainFeature = new ol.Feature({
                geometry: point,
                name:rainInfo[index].address,
                type: "rain",
                imgURL:imgURL,
                info: rainInfo[index].stationCode,
                fid: "rain" + index.toString()
            })
            rainFeature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    src: imgURL
                })
            }));
            ssyqLayer.getSource().addFeature(rainFeature);
            if (ssyqArray == null) {
                ssyqArray = new Array();
            }
            ssyqArray.push(rainFeature);
        }
    }

    /**
     * 清空标注
     * @param type
     */
    function clearSsyqMarkers() {
        for (var index = 0; index < ssyqArray.length; index++) {
            ssyqLayer.getSource().removeFeature(ssyqArray[index]);
        }
        ssyqArray = null;
    }

    /**
     * 各市最大雨量表
     */
    function addRainInfoToMaxRainTable() {

        if (maxRainTable == null) {
            maxRainTable = $("#maxRainTable").DataTable({
                serverSide: true,
                autoWidth: false,
                searching: false,
                info: false,
                lengthChange: false,
                ajax: {
                    url: "/rain/getMaxRainfall",
                    type: "post",
                    data: function (d) {
                        var from = $("#ssyqfrom1").val()+$("#fromTime").val()+":00:00";
                        var to = $("#ssyqfrom2").val()+$("#toTime").val()+":00:00";

                        // var fromTime = $("#fromTime").val();
                        // var toTime = $("#toTime").val();

                        var rainfall=getRainfall();

                        d.fromTime = from;//起始时间
                        d.toTime = to;//结束时间

                        d.minRain = rainfall[0];//最小雨量
                        d.maxRain = rainfall[1];//最大雨量
                        // d.minRain = 0;

                        return JSON.stringify(d);
                    },
                    // dataSrc: ""
                    dataType: "json",
                    contentType: "application/json",
                },
                //默认最后一列（最后更新时间）降序排列
                // order: [[ 2, "desc" ]],
                columns: [
                    {
                        // width: "20%",
                        targets: 0,
                        data: "suboffice",
                        title: "市名",
                    },
                    {
                        targets: 1,
                        data: "max",
                        title: "最大雨量",
                    }
                ]

            });
        } else {
            maxRainTable.ajax.reload();
        }

    }


    function addRainInfoToStaTable() {

    }

})



/******************************实时雨情END**************************************/
/******************************台风路径START**************************************/

var landfallTable = null;
var landfallConTable = null;

var landfallInfoArray = null;

var landfallTimer = null;

var landfallRouteLayer = null;
var landfallMarkerLayer = null;
var landfallPntLayer = null;


    $("#tflj").change(function () {
        var landfall = $(this).prop("checked");
        if (landfall) {
            addLandfallConTable();
            $(".tfDiv").show();

        } else {
            $(".tfDiv").hide();
        }
    })



/**
 * 台风条件表
 */
function addLandfallConTable() {
        if (landfallConTable == null) {
            landfallConTable = $("#landfallConTable").DataTable({
                serverSide: true,
                autoWidth: false,
                searching: false,
                info: false,
                lengthChange: false,
                ajax: {
                    url: "/rain/getMaxRainfall",
                    type: "post",
                },
                //默认最后一列（最后更新时间）降序排列
                // order: [[ 2, "desc" ]],
                columns: [
                    // {
                    //     // width: "20%",
                    //     targets: 0,
                    //     data: "suboffice",
                    //     title: "选择",
                    // },
                    {
                        targets: 1,
                        data: "windId",
                        title: "台风编码",
                    },
                    {
                        targets: 2,
                        data: "name",
                        title: "台风名",
                    },
                    {
                        targets: 3,
                        data: "engName",
                        title: "英文名",
                    }
                ]
            });
        } else {
            landfallConTable.ajax.reload();
        }
    /**
     * 行选中事件
     */
    $('#landfallConTable .windId').on('change', function () {
        var windIdCheck = $(this).prop("checked");
        if (windIdCheck) {
            var data = landfallTable.row(this).data();
            var windId = data.windId;
            $.ajax({
                url: "/landfall/getLandfallBySite/" + windId,
                type: "get",
                success: function (landfallInfo) {
                    // 表格显示选中台风的详细
                    addLandfallRouteTable(landfallInfo);
                    // 绘制台风路径
                    drawRoute(landfallInfo);
                    // 利用popup显示详细信息，预测信息
                    showLandfallDetail(landfallInfo);
                    // if (rainInfo) {
                    //     var lon = rainInfo[0].longitude;
                    //     var lat = rainInfo[0].latitude;
                    //     var coordinate = [parseFloat(lon), parseFloat(lat)];
                    //
                    //     var point = new ol.geom.Point(coordinate);
                    //
                    //     var feature = new ol.Feature({
                    //         geometry: point,
                    //         name: rainInfo[0].address,
                    //         type: "rain",
                    //         info: rainInfo[0].stationCode,
                    //     })
                    //     moveTo(feature);
                    //     showRainDetail(feature);
                    // }
                }
            });
        } else {
            // 清除表格选中台风的详细
            clearLandfallRouteTable();
            // 清除台风路径
            clearRoute();
            // 隐藏popup详细信息，预测信息
            clearLandfallDetail();
        }



    })

    }

/**
 * 台风路径表
 */
function addLandfallRouteTable(landfallInfo) {
        if (landfallTable == null) {
            landfallTable = $("#landfallTable").DataTable({
                autoWidth: false,
                searching: false,
                info: false,
                lengthChange: false,
                data: landfallInfo,
                // ajax: {
                //     url: "/landfall/getMaxRainfall",
                //     type: "post",
                // },
                //默认最后一列（最后更新时间）降序排列
                // order: [[ 2, "desc" ]],
                columns: [
                    {
                        // width: "20%",
                        targets: 0,
                        data: "windTime",
                        title: "时间",
                    },
                    {
                        targets: 1,
                        data: "windPower",
                        title: "风力",
                    },
                    {
                        targets: 2,
                        data: "windSpeed",
                        title: "风速",
                    }
                ]

            });
        } else {
            landfallTable.ajax.reload();
        }
    }

/**
 * 显示台风路径详细信息
 */
function showLandfallDetail(landfallInfo) {

}
/**
 * 绘制台风路径
 */
function drawRoute(landfallInfo) {
    // 绘制路径点

    // 绘制路径线
}

/**
 *  清除
 */
function clearLandfallRouteTable() {

}

function clearRoute() {

}

function clearLandfallDetail() {

}

function addTfljLine() {
    var landfallDrawLineLayer = null;
    if (landfallDrawLineLayer != null) {
        landfallDrawLineLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        })
        map.addLayer(landfallDrawLineLayer);
    }
    // 第一条标线
    var dots1 = new Array();
    dots1.push([11757464.4300438, 2154935.91508589]);
    dots1.push([12474016.8603311, 2154935.91508589]);
    dots1.push([12474016.8603311, 3123471.74910458]);

    var line1 = new ol.geom.LineString(dots1);
    var lineFeature1 = new ol.Feature({
        geometry: line1
    })

    var feaStyle1 = new ol.style.Style({
        stroke:new ol.style.Stroke({
            color: "#990000",
            width: 0.5
        })
    })

    lineFeature1.setStyle(feaStyle1);
    landfallDrawLineLayer.getSource().addFeature(lineFeature1);

    // 第二条标线
    var dots2 = new Array();
    dots2.push([12052238.4416644, 1804722.76625729]);
    dots2.push([13358338.895192, 1804722.76625729]);
    dots2.push([13358338.8951928, 3096586.04422852]);

    var line2 = new ol.geom.LineString(dots2);
    var lineFeature2= new ol.Feature({
        geometry: line2
    })

    var feaStyle2 = new ol.style.Style({
        stroke:new ol.style.Stroke({
            color: "#660066",
            width: 0.5
        })
    })

    lineFeature1.setStyle(feaStyle2);
    landfallDrawLineLayer.getSource().addFeature(lineFeature2);

    // 第三条标线
    var dots3 = new Array();
    dots3.push([12245143.9872601, 1689200.13960789]);
    dots3.push([14137575.3307457, 2511525.23484571]);
    dots3.push([14137575.3307457, 4028802.02613441]);

    var line3 = new ol.geom.LineString(dots3);
    var lineFeature3 = new ol.Feature({
        geometry: line3
    })

    var feaStyle3 = new ol.style.Style({
        stroke:new ol.style.Stroke({
            color: "#6666FF",
            width: 0.5
        })
    })

    lineFeature1.setStyle(feaStyle3);
    landfallDrawLineLayer.getSource().addFeature(lineFeature3);

    // 第四条标线
    var dots4 = new Array();
    dots4.push([12245143.9872601, 1689200.13960789]);
    dots4.push([13914936.3491592, 1689200.13960789]);
    dots4.push([14694172.7847121, 2511525.23484571]);
    dots4.push([14694172.7847121, 4028802.02613441]);

    var line4 = new ol.geom.LineString(dots4);
    var lineFeature4 = new ol.Feature({
        geometry: line4
    })

    var feaStyle4 = new ol.style.Style({
        stroke:new ol.style.Stroke({
            color: "#009900",
            width: 0.5
        })
    })

    lineFeature1.setStyle(feaStyle4);
    landfallDrawLineLayer.getSource().addFeature(lineFeature4);
}

/**
 * 添加台风标注点到图层
 * @param i
 * @param landfallInfoE
 */
function addLandfallPath(i, landfallInfoE) {
    var landfallCurMarker = null;

    var lon = landfallInfoE.longitude;
    var lat = landfallInfoE.latitude;

    var size = map.getSize();
    var bound = map.getView().calculateExtent(size);

    if (lon < bound[0] || lon > bound[3] || lat < bound[0] || lat > bound[2]) {
        map.getView().setCenter([lon, lat]);
        map.getView().setZoom(7);
    }

    var coordinate = [lon, lat];

    landfallCurMarker = new ol.Feature({
        geometry: new ol.geom.Point(coordinate),
        type: 'landfallMarker'
    })

    if (landfallCurMarker != null) {
        landfallPntLayer.getSource().removeFeature(landfallCurMarker);
    }

    var curImage = "images/taifeng/taifeng.gif";

    var curMarkerStyle = new ol.style.Style({
        image:new ol.style.Icon({
            anchorOrigin: 'bottom-left',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            offsetOrigin:'bottom-left',
            scale:1,
            opacity: 1,
            src: curImage
        })
    });

    landfallCurMarker.setStyle(curMarkerStyle);
    landfallPntLayer.addFeature(landfallCurMarker);

    // 绘制台风路径
    var grade = 5;
    var imgUrl = null;

    if (landfallInfoE.power!=null) {
        grade = landfallInfoE.power;
    }

    if (grade == 4 || grade == 5 || grade == 6) {
        imgUrl = 'images/taifeng/Wind00.png';
    }else if (grade == 7) {
        imgUrl = 'images/taifeng/Wind06.png';
    }else if (grade == 8 || grade == 9) {
        imgUrl = 'images/taifeng/Wind05.png';
    }else if (grade == 10 || grade == 11) {
        imgUrl = 'images/taifeng/Wind04.png';
    }else if (grade == 12 || grade == 13) {
        imgUrl = 'images/taifeng/Wind03.png';
    }else if (grade == 14 || grade == 15) {
        imgUrl = 'images/taifeng/Wind02.png';
    }else if (grade == 16) {
        imgUrl = 'images/taifeng/Wind01.png';
    }

    // var routeStyle = new ol.style.Style({
    //
    // })


}

/**
 * 绘制台风预测路线
 */
function drawLandfallForcast() {

}

function drawLandfallRoute() {

    //添加台风路径图层
    if (landfallRouteLayer) {
        landfallRouteLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        })
        map.addLayer(landfallRouteLayer)
    }
    //添加台风标注图层
    if (landfallMarkerLayer) {
        landfallMarkerLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        })
        map.addLayer(landfallMarkerLayer)
    }
    //添加台风点图层
    if (landfallPntLayer) {
        landfallPntLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        })
        map.addLayer(landfallPntLayer);
    }

    // 将地图中心设置为第一个点的位置并设置缩放等级为7
    map.getView().setCenter([landfallInfoArray[0].longitude, landfallInfoArray[0].latitude]);
    map.getView().setZoom(7);

    var i = 0;
    // 设置定时器显示台风点标注
    landfallTimer = setInterval(function () {
        if (i < landfallInfoArray.length) {
            addLandfallPath(i, landfallInfoArray[i++]);
        } else {
            drawLandfallForcast();
            if (landfallTimer != null) {
                clearInterval(landfallTimer);
                landfallTimer = null;
            }
        }
    })

}


/******************************台风路径END**************************************/
