<%--
  Created by IntelliJ IDEA.
  User: TYK
  Date: 2018/12/11
  Time: 15:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>dataTable</title>


    <link href="lib/datatable/jquery.dataTables.css" rel="stylesheet" type="text/css">
    <link href="lib/bootstrap-datepicker/css/bootstrap-datepicker.css" rel="stylesheet" type="text/css">

    <!-- jQuery库 -->
    <script src="lib/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="lib/datatable/jquery.dataTables.js"></script>



    <%--bootstrap库--%>
    <script src="lib/bootstrap-3.3.7-dist/js/bootstrap.js" type="text/javascript"></script>

    <script src="lib/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>


</head>
<script type="text/javascript">
    //配置DataTables默认参数
   $(function () {
       $.extend(true, $.fn.dataTable.defaults, {
           // "language": {
           //     "url": "/assets/Chinese.txt"
           // },
           "dom": "<'row'<'col-md-6'l<'#toolbar'>><'col-md-6'f>r>" +
           "t" +
           "<'row'<'col-md-5 sm-center'i><'col-md-7 text-right sm-center'p>>"
       });

       //DataTables初始化
       var issueTable = $("#issueTable").DataTable({
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
           ],
           initComplete: function () {
               $("#toolbar").append("<a href='https://github.com/ssy341/datatables-cn/issues/new' " +
                   "class='btn btn-primary btn-sm'>我也要提问</a>");
           }
       });

       $('#issueTable tbody').on('click', 'tr', function () {
           var data = issueTable.row( this ).data();
           alert( 'You clicked on '+data[0]+'\'s row' );
       } );


       $('.form-control').datepicker({
           format: "yyyy-mm-dd",
           startDate: '-3d'
       });

       $( "#datepicker" ).datepicker({
           format: "yyyy-mm-dd",
           startDate: '-3d'
       });

       Date.prototype.Format = function (fmt) { //author: meizz
           var o = {
               "M+": this.getMonth() + 1,
               //月份
               "d+": this.getDate(),
               //日
               "h+": this.getHours(),
               //小时
               "m+": this.getMinutes(),
               //分
               "s+": this.getSeconds(),
               //秒
               "q+": Math.floor((this.getMonth() + 3) / 3),
               //季度
               "S": this.getMilliseconds() //毫秒
           };
           if (/(y+)/.test(fmt)) {
               fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
           }
           for (var k in o) {
               if (new RegExp("(" + k + ")").test(fmt)) {
                   fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
               }
           }
           return fmt;
       };
   })

</script>
<body>
    <div>
        <table id="issueTable">
            <thead>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </thead>
        </table>
    </div>
    <div class="input-group date" data-provide="datepicker">
        <input type="text" class="form-control">
        <div class="input-group-addon">
            <span class="glyphicon glyphicon-th"></span>
        </div>
    </div>
    <p>Date: <input type="text" id="datepicker"></p>
</body>
</html>
