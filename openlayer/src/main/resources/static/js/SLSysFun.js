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

// 绑定实时水情切换按钮
    $("#sssq").change(function () {
        var sssq = $("#sssq").prop('checked');

        reservoirInfo = $("#RverInfo").prop('checked');
        riverInfo = $("#riverInfo").prop('checked');

        if (sssq) {
            // waterChoose();
            if (riverInfo){
                type = "rr";
                queryWaterInfo(type);
            }else {
                type = "wu";
                queryWaterInfo(type);
            }

            if (reservoirInfo){
                type = "zz";
                queryWaterInfo(type);
            }else {
                type = "wu";
                queryWaterInfo(type);
            }

            $(".sqDiv").show();
            $(".hlxxContent").show();

        } else {//不选中实时水情
            $(".sqDiv").hide();
            $(".hlxxContent").hide();
        }
    })
    
    function queryWaterInfo(type) {

        if (type=="zz") {
            $.ajax({
                url: "/water/getWaterInfo?type=" + type,
                type: "get",
                success:function (waterInfo) {
                    addMarkers(waterInfo);
                    // addToTable(type);
                }
            })
            $("#reservoir").DataTable({
                ajax: {
                    url: "/water/getWaterInfo?type="+type,
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
        };
        if (type=="rr") {
            $.ajax({
                url: "/water/getWaterInfo?type=" + type,
                type: "get",
                success:function (waterInfo) {
                    addMarkers(waterInfo);
                    // addToTable(type);
                }
            })
            $("#river").DataTable({
                ajax: {
                    url: "/water/getWaterInfo?type="+type,
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
        };


    }

    var ssslLayer;

    function addMarkers(waterInfo) {
        if (ssslLayer == null) {
            ssslLayer =  new ol.layer.Vector({
                source: new ol.source.Vector()
            })
            map.addLayer(ssslLayer);
        }

        var ssslSource = new ol.source.Vector();

        reservoirInfo = $("#RverInfo").prop('checked');
        riverInfo = $("#riverInfo").prop('checked');
        // var markerFeature;
        var riverFeature;
        var reservoirFeature;

        if (riverInfo) {
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
                    info: waterInfo[index],
                    fid: "river" + index.toString()
                })
                riverFeature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        src: imgURL
                    })
                }));
                ssslSource.addFeature(riverFeature);
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
                    info: waterInfo[index],
                    fid: "reservoir" + index.toString()
                })
                reservoirFeature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        src: imgURL
                    })
                }));
                ssslSource.addFeature(reservoirFeature);
            }
        }
        ssslLayer.setSource(ssslSource);
        map.addLayer(ssslLayer);
    }

    $("#RverInfo").change(function () {
        if (riverInfo){
            type = "rr";
            queryWaterInfo(type);
        }else {
            type = "wu";
            queryWaterInfo(type);
        }

        if (reservoirInfo){
            type = "zz";
            queryWaterInfo(type);
        }else {
            type = "wu";
            queryWaterInfo(type);
        }
    })

    $("#riverInfo").change(function () {
        if (riverInfo){
            type = "rr";
            queryWaterInfo(type);
        }else {
            type = "wu";
            queryWaterInfo(type);
        }

        if (reservoirInfo){
            type = "zz";
            queryWaterInfo(type);
        }else {
            type = "wu";
            queryWaterInfo(type);
        }
    })


})