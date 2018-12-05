$(document).ready(function () {


    var blur = document.getElementById('blur');
    var radius = document.getElementById('radius');
    //初始化osm地图
    var view = new ol.View({
        projection: ol.proj.get('EPSG:4326'),
        zoom: 4,
        center: [104.068, 30.664],
    })
    var map = new ol.Map({
        target: 'map',
        layer: null,
        view: view
    });
    // osm地图
    var OSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    })

    // 高德地图
    var gaodeMapLayer = new ol.layer.Tile({
        source:new ol.source.XYZ({
            url:'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });


    map.addLayer(gaodeMapLayer);


    var vectorLayer = new ol.layer.Heatmap({
        source: new ol.source.Vector({
            url: 'data/kml/2012_Earthquakes_Mag5.kml',
            format: new ol.format.KML({
                extractStyles: false
            })
        }),
        blur: parseInt(blur.value, 10),
        radius: parseInt(radius.value, 10)
    });

    // 为矢量要素增加添加监听事件
    vectorLayer.getSource().on("addfeature",function (ev) {
        var name = ev.feature.get('name');
        var magnitude = parseFloat((name.substr(2)));
        ev.feature.set('weight', magnitude - 5);
    })

    map.addLayer(vectorLayer);

    // 为参数控件设置监听器
    radius.addEventListener('input',function (ev) {
        vectorLayer.setRadius(parseInt(radius.value), 10);
    })

    blur.addEventListener('input',function (ev) {
        vectorLayer.setRadius(parseInt(blur.value), 10);
    })



})


