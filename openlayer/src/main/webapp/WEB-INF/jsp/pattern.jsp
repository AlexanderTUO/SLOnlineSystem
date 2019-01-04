<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2019/1/4
  Time: 17:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>菜鸟教程(runoob.com)</title>
</head>
<body>

<%--<p>图片应用:</p>--%>
<%--<img src="img_lamp.jpg" id="lamp">--%>
<%--<p>画布:</p>--%>
<%--<button onclick="draw('repeat')">重复</button>--%>
<%--<button onclick="draw('repeat-x')">重复-x</button>--%>
<%--<button onclick="draw('repeat-y')">重复-y</button>--%>
<%--<button onclick="draw('no-repeat')">不重复</button>--%>
<%--<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">--%>
    <%--您的浏览器不支持 HTML5 canvas 标签。--%>
<%--</canvas>--%>
<!-- jQuery库 -->
<script src="lib/jquery-3.3.1.min.js" type="text/javascript"></script>
<script>
    // function draw(direction)
    // {
    //     var c=document.getElementById("myCanvas");
    //     var ctx=c.getContext("2d");
    //     ctx.clearRect(0,0,c.width,c.height);
    //     var img=document.getElementById("lamp")
    //
    //     var pat=ctx.createPattern(img,direction);
    //     ctx.rect(0,0,220,128);
    //     ctx.fillStyle=pat;
    //     ctx.fill();
    // }
    $(function () {
        var cnv = document.createElement('canvas');
        var ctx = cnv.getContext('2d');
        var img = new Image();
        img.src = 'images/Railroad.png';
        img.height = 5;
        img.width = 5;

        img.onload = function(){
            var pattern = ctx.createPattern(img, 'repeat');
            lineString.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: pattern,
                    width: 5,
                    height:5
                })
            }));
        };
    })
</script>

</body>
</html>
