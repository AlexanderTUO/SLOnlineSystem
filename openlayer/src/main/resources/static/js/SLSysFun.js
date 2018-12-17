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
        projection: projection,
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

    function waterChoose() {
        reservoirInfo = $("#RverInfo").prop('checked');
        riverInfo = $("#riverInfo").prop('checked');

        if (riverInfo) {//河流选中
            type = "rr";
            $.ajax({
                url: "/water/getWaterInfo",
                type: "post",
                data: {
                    type: "rr",
                },
                success: function (data) {
                    addMarkers(data);
                }
            })
        }else{
            type = "wu";
            addMarkers(null);
        }

        if (reservoirInfo) {//水库选中
            type = "zz";
            $.ajax({
                url: "/water/getWaterInfo",
                type: "post",
                data: {
                    type: "zz",
                },
                success: function (data) {
                    addMarkers(data);
                }
            });
        } else {
            type = "wu";
        }

    }


    var isRiver = true;
    var isReser = false;

    var riverArray;
    var rverArray;

    var riverTable;
    var rverTable;
// 绑定实时水情切换按钮
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
            $("#RverInfo").attr('checked',false);
            $("#river").attr('checked',true);
            $(".sqDiv").hide();
            $(".hlxxContent").hide();
        }
    })
    
    function queryWaterInfo(type) {
        if (type == "reservoir" && isReser) {
            $.ajax({
                url: "/water/getWaterInfo?type=zz",
                type: "get",
                success: function (waterInfo) {
                    addMarkers(waterInfo);
                    // addToTable(type);
                }
            });
            if (rverTable == null) {
                rverTable = $("#reservoir").DataTable({
                    ajax: {
                        url: "/water/getWaterInfo?type=zz",
                        type: "get",
                        dataSrc: ""
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
                    ]

                });
            } else {
                rverTable.ajax.reload();
            }

        };
        if (type == "river" && isRiver) {
            $.ajax({
                url: "/water/getWaterInfo?type=rr",
                type: "get",
                success: function (waterInfo) {
                    addMarkers(waterInfo);
                    // addToTable(type);
                }
            });
            if (riverTable == null) {
                riverTable = $("#river").DataTable({
                    ajax: {
                        url: "/water/getWaterInfo?type=rr",
                        type: "get",
                        dataSrc: ""
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
                    ]

                });
            } else {
                riverTable.ajax.reload();
            }

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
                    name:waterInfo[index].riverName,
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

        if (reservoirInfo) {
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
                    name:waterInfo[index].riverName,
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

    // 清空标注
    function clearMarkers(type) {
        if (type == 'river' && riverArray != null) {
            for (var index = 0; index < riverArray.length; index++) {
                ssslSource.removeFeature(riverArray[index]);
            }
            riverArray = null;
            // ssslLayer.setSource(ssslSource);
        }
        if (type == 'reservoir' && rverArray != null) {
            for (var index = 0; index < rverArray.length; index++) {
                ssslSource.removeFeature(rverArray[index]);
            }
            rverArray = null;
            // ssslLayer.setSource(ssslSource);
        }
    }

    // 显示水情信息
    function showWaterInfo() {
        reservoirInfo = $("#RverInfo").prop('checked');
        riverInfo = $("#riverInfo").prop('checked');
        if (riverInfo) {
            isRiver = true;
            queryWaterInfo("river");
            $("#hlxxTab").show();
        } else {
            $("#hlxxTab").hide();
            clearMarkers("river");
            isRiver = false;
        }

        if (reservoirInfo) {
            isReser = true;
            queryWaterInfo("reservoir");
            $("#skxxTab").show();
        } else {
            $("#skxxTab").hide();
            clearMarkers("reservoir");
            isRiver = false;
        }
    }

    // 绑定水库复选框
    $("#RverInfo").change(function () {
        showWaterInfo();

    })

    // 绑定河流复选框
    $("#riverInfo").change(function () {
        showWaterInfo();
    })

    // 鼠标选中标注时变成小手
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

    function showWaterDetail(feature) {

        var stationCode = feature.get("info");
        var type = feature.get("type");
        $.ajax({
            url: "/water/getWaterBySite?type="+type+"&site="+stationCode,
            type: "get",
            success:function (data) {
                alert(232)
                var dataSource = {
                    "chart": {
                        "caption": "南宁市水情表",
                        "subcaption": "",
                        "showhovereffect": "1",
                        // "numbersuffix": "%",
                        "rotatelabels": "1",
                        "theme": "fusion"
                    },
                    "categories": [
                        {
                            "category": [
                                {
                                    "label": "Australia"
                                },
                                {
                                    "label": "New-Zealand"
                                },
                                {
                                    "label": "India"
                                },
                            ]
                        }
                    ],
                    "dataset": [
                        {
                            "seriesname": "2016 Actual Salary Increase",
                            // "plottooltext": "Salaries increased by <b>$dataValue</b> in 2016",
                            "data": [
                                {
                                    "value": "3"
                                },
                                {
                                    "value": "3"
                                },
                                {
                                    "value": "10"
                                },
                            ]
                        },
                    ]
                };
            }
        })
    }

})