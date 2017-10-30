/**
 * Created by user on 2017/10/13.
 */

$(document).ready(function () {
    $("#detailForm").validate({
        rules: {
            addressLine1: {
                required: true
            }
        },
        onsubmit: false
    });
//公司管理查询公司
    $("#btn_query").click(function (e) {
        var orgId = $("#query_org_id").val();

        alert(orgId);
        $.ajax({
            url: "http://39.108.160.55:11116/control-center/app/organization/{orgId}",
            type: "get",
            success: function (data, textStatus, xhr) {
                console.log("status: " + status);

                $("#detailForm").populateObject(data);

                //alert('ok');
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
//公司管理新增公司
    $("#createButton").click(function (e) {
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
//保存公司
    $("#submit").click(function (e) {
        if ($("#detailForm").valid()) {
            var formData = $("#detailForm").serializeObject();
            $.ajax({
                url: "http://39.108.160.55:11116/control-center/app/organization/" + formData.organizationId,
                //url: "http://39.108.160.55:11116/control-center/app/organization/update",
                type: "put",
                data: formData,
                success: function (data, status, xhr) {
                    alert("OK");
                    console.log("status: " + status);
                    $('#name').val(data.organizationName);
                    $('#sname').val(data.organizationShortName);
                    $('#industry').val(data.status);
                    $('#mail').val(data.email);
                    $('#place1').val(data.addressLine1);
                    $('#place2').val(data.addressLine2);
                    $('#place3').val(data.addressLine3);
                    $('#phone').val(data.phone);

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
            url: "/control-center/app/organization/page/total",
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
            url: "/control-center/app/organization/page/" + page,
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
