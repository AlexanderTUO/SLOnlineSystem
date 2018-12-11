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

    <!-- jQuery库 -->
    <script src="lib/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="lib/datatable/jquery.dataTables.js"></script>

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
       $("#issueTable").DataTable({
           ajax: {
               url: "/water/getWaterInfo",
               // url: "https://api.github.com/repos/ssy341/datatables-cn/issues",
               type: "post",
               data: {
                   type: "zz"
               },
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
               // {
               //     targets: 2,
               //     data: "stationCode",
               //     title: "最后更新时间",
               //     render: function (data, type, row, meta) {
               //         return new Date(Date.parse(data)).Format("yyyy-MM-dd hh:mm:ss");
               //     }
               // },
               // {
               //     targets: 1,
               //     data: null,
               //     title: "发表人",
               //     render: function (data, type, row, meta) {
               //         return "<a href='" + row.user.html_url + "' target='_blank'>" + row.user.login + "</a>"
               //     }
               // },
               // {
               //     targets: 0,
               //     data: "title",
               //     title: "问题",
               //     render: function (data, type, row, meta) {
               //         var labels = "";
               //         if (row.labels.length) {
               //             labels += "【";
               //             for (var j = 0, labelslen = row.labels.length; j < labelslen; j++) {
               //                 labels += "<span style='color:#" + row.labels[j].color + "' >" +
               //                     row.labels[j].name + "</span>";
               //                 if (j != labelslen - 1) {
               //                     labels += ",";
               //                 }
               //             }
               //             labels += "】";
               //         }
               //         var hot = "";
               //         if(labels.indexOf("置顶")>0){
               //             hot = "<span class='hot'></span>"
               //         }
               //         return "<a href='" + row.html_url + "' target='_blank'>" + row.title + "</a>" + labels +
               //             "<i class='icon Hui-iconfont'>&#xe622;</i>"+row.comments +hot;
               //     }
               // }
           ],
           initComplete:function(){
               $("#toolbar").append("<a href='https://github.com/ssy341/datatables-cn/issues/new' " +
                   "class='btn btn-primary btn-sm'>我也要提问</a>");
           }
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

</body>
</html>
