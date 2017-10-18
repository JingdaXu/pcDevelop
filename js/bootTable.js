/**
 * Created by user on 2017/10/17.
 */
$(function () {
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
});
function actionFormatter(value, row, index) {
    var id = row.organizationId;

    return [
        '<a class="edit ml10" href="modifyCompany.html?organizationId=' + id + '" title="Edit">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>'
    ].join('');
}


var TableInit = function () {
    var oTableInit = new Object();

    var row = 1; //$("#rowField").val();
    var params = "";
    if (row && row != "") {
        params = "?page=1&row=" + row;
    }

    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: 'http://39.108.160.55:11116/control-center/app/organization/page/1',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            dataType: "json",
            contentType: "application/json",
            crossDomain: true,
            striped: true,                      //是否显示行间隔色
            //cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            //pagination: true,                   //是否显示分页（*）
            //sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
//           queryParams: 1,						// oTableInit.queryParams,//传递参数（*）
            //sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            //pageNumber: 1,                       //初始化加载第一页，默认第一页
            //pageSize: 10,                       //每页的记录行数（*）
            //pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 600,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            //uniqueId: "",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            //cardView: false,                    //是否显示详细视图
            //detailView: false,                   //是否显示父子表
            columns: [
                {title: "编号", field: 'organizationId', align: 'center'},
                {title: "公司名称", field: "organizationName", align: 'center'},
                {title: "公司简称", field: "organizationShortName", align: 'center'},
                {title: "公司状态.", field: "status", align: 'center'},
                {title: "操作", formatter: "actionFormatter", align: 'center'}
            ],
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: 10, // params.limit,   //页面大小
            offset: 1, // params.offset,  //页码
            departmentname: '', //$("#txt_search_departmentname").val(),
            statu: 'A' //$("#txt_search_statu").val()
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };

    return oInit;
};
$(document).ready(function () {
    $('#tb_departments').bootstrapTable('showLoading');
    $.ajax({
        url: 'http://39.108.160.55:11116/control-center/app/organization/page/1',         //请求后台的URL（*）
        type: "get",
        //data: "1",
        dataType: "json",
        success: function (data) {
            //$('#tb_departments').bootstrapTable('hideLoading');
            //$('#tb_departments').hide();
            $('#tb_departments').bootstrapTable('load', data);
        }
    });
		
		
		
		
    $("#detailForm").validate({
        rules: {
            addressLine1: {
                required: true
            }
        },
        onsubmit: false
    });

    $("#btn_query").click(function (e) {
        var orgId = 2;
        $.ajax({
            url: "http://39.108.160.55:11116/control-center/app/organization/" + orgId,
            type: "get",
            success: function (data, textStatus, xhr) {
                console.log("status: " + status);


                alert(data['status'])
            },
            error: function (xhr, textStatus, ex) {
                if (xhr.status == 404) {
                    alert('no such object');
                } else {
                    alert(ex);
                }
            }
        });
    });

    $("#createButton").click(function (e) {

        alert('Start')
        // this event request server to create this entry regardless.
        if ($("#detailForm").valid()) {
            var formData = $("#detailForm").serializeObject();
            $.ajax({
                url: "http://39.108.160.55:11116/control-center/app/organization/",
                type: "post",
                data: formData,
                success: function (data, status, xhr) {
                    console.log("status: " + status);

                    if (xhr.status == 200 || xhr.status == 201) {
                        $("#detailForm").populateObject(data);
                    }

                    alert('ok');
                },
                error: function (xhr, textStatus, ex) {
                    if (xhr.status == 400) {
                        var response = JSON.parse(xhr.responseText);
                        //alert('400 error');
                        if (response.errors) {
                            $("#detailForm").validate().showErrors(response.errors);
                        }
                    } else {
                        alert(textStatus);
                    }
                }
            });
        }
    });

    $("#updateButton").click(function (e) {
        if ($("#detailForm").valid()) {
            var formData = $("#detailForm").serializeObject();
            $.ajax({
                url: "http://39.108.160.55:11116/control-center/app/organization/" + formData.organizationId,
                //url: "/control-center/app/organization/update",
                type: "put",
                data: formData,
                success: function (data, status, xhr) {
                    console.log("status: " + status);

                    if (xhr.status = 200 || xhr.status == 201) {
                        $("#detailForm").populateObject(data);
                    }

                    alert('ok');
                },
                error: function (xhr, textStatus, ex) {
                    if (xhr.status == 400) {
                        var response = JSON.parse(xhr.responseText);
                        //alert('400 error');
                        if (response.errors) {
                            $("#detailForm").validate().showErrors(response.errors);
                        }
                    } else {
                        alert(textStatus);
                    }
                }
            });
        }
    });

    $("#resetButton").click(function (e) {
        $("#detailForm").validate().resetForm();
    });

    $("#totalButton").click(function (e) {
        $.ajax({
            url: "http://39.108.160.55:11116/control-center/app/organization/",
            type: "get",
            success: function (data, textStatus, xhr) {
                $("#totalField").val(data);
            },
            error: function (xhr, textStatus, e) {
                alert(textStatus);
            }
        })
    });

    $("#pageButton").click(function (e) {
        var page = $("#pageField").val();
        var row = $("#rowField").val();
        var params = "";
        if (row && row != "") {
            params = "row=" + row;
        }

        $.ajax({
            url: "http://39.108.160.55:11116/control-center/app/organization/page/" + page,
            type: "get",
            data: params,
            success: function (data, textStatus, xhr) {
                $("#hunterTable1").empty();

                for (var i in data) {
                    var ent = data[i];
                    var elem1 = $("<tr></tr>");
                    elem1.append("<td>" + ent.organizationId + "</td>");
                    elem1.append("<td>" + ent.organizationName + "</td>");
                    elem1.append("<td>" + ent.organizationShortName + "</td>");
                    elem1.append("<td>" + ent.status + "</td>");

                    $("#hunterTable1").append(elem1);
                }
            },
            error: function (xhr, textStatus, e) {
                alert(textStatus);
            }
        });
    });
});