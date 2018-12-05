$(document).ready(function () {

    //初始化osm地图
    var view = new ol.View({
        zoom: 2,
        center: [104.068, 30.664]
    })

    // 高德地图图层
    var gaodeLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });

    // osm地图图层
    var OSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    })

    // 百度地图图层
    var resolutions = [];
    for (var i = 0; i <= 18; i++) {
        resolutions[i] = Math.pow(2, 18 - i);
    }

    var tileGrid = new ol.tilegrid.TileGrid({
        origin: [0, 0],
        resolutions: resolutions
    });

    var baiduSource = new ol.source.TileImage({
        // projection: "EPSG:3857",
        tileGrid: tileGrid,
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            if (!tileCoord) {
                return "";
            }

            var z = tileCoord[0];

            var x = tileCoord[1];

            var y = tileCoord[2];

            if (x < 0) {
                x = 'M' + (-x);
            }
            if (y < 0) {
                y = 'M' + (-y);
            }
            return "http://online0.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
        }
    });

    var baiduLayer = new ol.layer.Tile({
        source: baiduSource
    });

    // CanvasMap高德地图
    var canvasMap = new ol.Map({
        target: 'canvasMap',
        layers: [gaodeLayer],
        view: view //osmView
    });

    // domMap osm地图
    var domMap = new ol.Map({
        target: 'domMap',
        layers: [OSM],
        view: canvasMap.getView() //osmView
    });

    // webgl百度地图
    var webglMap = new ol.Map({
        target: 'webglMap',
        layers: [baiduLayer],
        view: view //osmView
    });



})


