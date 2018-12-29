<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/12/29
  Time: 15:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>定时器</title>
    <!-- jQuery库 -->
    <script src="lib/jquery-3.3.1.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        // var int=self.setInterval("clock()",1000);
        // function clock()
        // {
        //     var d=new Date();
        //     var t=d.toLocaleTimeString();
        //     document.getElementById("clock").value=t;
        // }
        var int= setInterval(function () {
            var d=new Date();
            var t=d.toLocaleTimeString();
            document.getElementById("clock").value=t;
        },1000);
    </script>

</head>
<body>
    <input type="text" id="clock" />
    <button onclick="int=window.clearInterval(int)">停止</button>
</body>
</html>
