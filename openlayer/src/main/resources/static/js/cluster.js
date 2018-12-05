$(document).ready(function () {
    //初始化高德地图
    var viewGaode = new ol.View({
        projection: ol.proj.get('EPSG:4326'),
        zoom: 10,
        center: [104.068, 30.664]
    })

    //初始化osm地图
    var view = new ol.View({
        zoom: 2,
        center: [0,0]
    })

    var map = new ol.Map({
        target: 'map',
        layer: null,
        // view: view //高德view
        view: view //osmView
    });
    // osm地图
    var OSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    })

    // 高德地图
    var gaodeMapLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });


    map.addLayer(OSM);
    // map.addLayer(gaodeMapLayer);


    // var style = new ol.style.Style({
    //     stroke: new ol.style.Stroke({
    //         color: '#19ff0f',
    //         width: 2
    //     }),
    //     fill: new ol.style.Fill({
    //         color: 'rgba(255,255,255,0.2)'
    //     }),
    //     image: new ol.style.Circle({
    //         radius: 15,
    //         fill: new ol.style.Fill({
    //             color: '#ff382d',
    //         })
    //     })
    // })

    // 设置聚合标注
    var count = 10000;
    var e = 4500000;
    var features = new Array(count);
    for (var index = 0; index < count; index++) {
        var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
        features[index] = new ol.Feature(new ol.geom.Point(coordinates));
    }

    var source = new ol.source.Vector({
        features: features
    })

    var clusterSource = new ol.source.Cluster({
        distance: 40,
        source: source
    })

    var styleCache = {};
    var clusters = new ol.layer.Vector({
        source: clusterSource,
        style: function (feature, resolution) {
            var size = feature.get("features").length;
            var style = styleCache[size];
            if (!style) {
                style = [new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 10,
                        stroke: new ol.style.Stroke({
                            color: "#fff"
                        }),
                        fill: new ol.style.Fill({
                            color: "#3399cc"
                        })
                    }),
                    text: new ol.style.Text({
                        text: size.toString(),
                        fill: new ol.style.Fill({
                            color: "#fff"
                        })
                    })
                })];
                styleCache[size] = style;
            }
            return style;
        }
    })

    map.addLayer(clusters);

    document.getElementById("addCluster").onclick = function () {

        var currentFeatures = clusterSource.getSource().getFeatures();

        if (currentFeatures.length == 0) {
            clusterSource.getSource().addFeatures(features);
            clusters.setSource(clusterSource);
            map.addLayer(clusters);
        }
    }

    document.getElementById("removeCluster").onclick = function () {
        clusterSource.getSource().clear();
        map.removeLayer(clusters);
    }

})


