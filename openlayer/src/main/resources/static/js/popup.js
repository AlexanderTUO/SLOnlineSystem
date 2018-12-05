$(document).ready(function () {
    //初始化osm地图
    var view = new ol.View({
        projection: ol.proj.get('EPSG:4326'),
        zoom: 10,
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

    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#19ff0f',
            width: 2
        }),
        fill:new ol.style.Fill({
            color: 'rgba(255,255,255,0.2)'
        }),
        image: new ol.style.Circle({
            radius: 15,
            fill:new ol.style.Fill({
                color: '#ff382d',
            })
        })
    })

    // 气泡popup
    var popup = new ol.Overlay({
        element: document.getElementById('popup')
    })
    map.addOverlay(popup);

    // 地图点击事件
    map.on('click',function (ev) {
        var element = popup.getElement();
        var popCoordinate = ev.coordinate;
        var hdms = ol.coordinate.toStringHDMS(popCoordinate);
        $(element).popover('destroy');
        popup.setPosition(popCoordinate);
        $(element).popover({
            placement: 'top',
            animation: false,
            html: true,
            content: '<p>您当前位置为：</p><code>' + hdms + '</code>'
        })
        $(element).popover('show');
    });
})


