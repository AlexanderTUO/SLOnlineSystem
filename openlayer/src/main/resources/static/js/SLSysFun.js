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
                ssslSource.addFeature(riverFeature);
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
                ssslSource.addFeature(reservoirFeature);

                if (rverArray == null) {
                    rverArray = new Array();
                }
                rverArray.push(reservoirFeature);
            }

        }
        ssslLayer.setSource(ssslSource);
        map.removeLayer(ssslLayer);
        map.addLayer(ssslLayer);
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
            showWaterDetail(feature);
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

    $("#ssyqfrom1,#ssyqfrom2").datepicker({
        // format: "yyyy-mm-dd"
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
    })

    /**
     * 绑定实时雨情切换按钮事件
     */
    $("#ssyq").change(function () {
        var rainCheck = $("#ssyq").prop;
        if (rainCheck) {
            addRainInfoToRainTable();
            addRainInfoToMaxRainTable();
            addRainInfoToStaTable();
            $(".ssyqDiv").show();
        }else {
            $(".ssyqDiv").hide();
        }

    });

    /**
     * 雨量信息表
     */
    function addRainInfoToRainTable() {
        if (rainTable == null) {
            rainTable = $("#rainTable").DataTable({
                serverSide: true,
                ajax: {
                    url: "/rain/getRainInfo",
                    type: "post",
                    data: function (d) {
                        var fromTime = $("#ssyqfrom1").val();
                        var toTime= $("#ssyqfrom2").val();
                        var rainfall;
                        d.fromTime = fromTime;
                        d.toTime = toTime;
                        d.rainfall = rainfall;
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
            rverTable.ajax.reload();
        }
    }

    function addRainInfoToMaxRainTable() {

    }

    function addRainInfoToStaTable() {

    }

})