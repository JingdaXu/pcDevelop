    <html>
        <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="cache-control" content="no-cache">
        <title>Welcome</title>
        <script src="/control-center/resources/js/jquery-1.7.2.min.js" type="text/javascript"></script>
        <script src="/control-center/resources/js/extend.js" type="text/javascript"></script>
        <script src="/control-center/resources/js/jquery.validate.js" type="text/javascript" charset="utf-8"></script>
        <script type="text/javascript">
        $(document).ready(function() {
        $("#detailForm").validate({
        rules: {
        addressLine1: {
        required: true
        }
        },
        onsubmit: false
        });

        $("#button1").click(function(e) {
        var orgId = $("#query_org_id").val();
        $.ajax({
        url: "/control-center/app/organization/" + orgId,
        type: "get",
        success: function(data, textStatus, xhr) {
        console.log("status: " + status);

        $("#detailForm").populateObject(data);

        //alert('ok');
        },
        error: function(xhr, textStatus, ex) {
        if (xhr.status == 404) {
        alert('no such object');
        } else {
        alert(ex);
        }
        }
        });
        });

        $("#createButton").click(function(e) {
        // this event request server to create this entry regardless.
        if ($("#detailForm").valid()) {
        var formData = $("#detailForm").serializeObject();
        $.ajax({
        url: "/control-center/app/organization" ,
        type: "post",
        data: formData,
        success: function(data, status, xhr) {
        console.log("status: " + status);

        if (xhr.status == 200 || xhr.status == 201) {
        $("#detailForm").populateObject(data);
        }

        alert('ok');
        },
        error: function(xhr, textStatus, ex) {
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

        $("#updateButton").click(function(e) {
        if ($("#detailForm").valid()) {
        var formData = $("#detailForm").serializeObject();
        $.ajax({
        url: "/control-center/app/organization/" + formData.organizationId,
        //url: "/control-center/app/organization/update",
        type: "put",
        data: formData,
        success: function(data, status, xhr) {
        console.log("status: " + status);

        if (xhr.status = 200 || xhr.status == 201) {
        $("#detailForm").populateObject(data);
        }

        alert('ok');
        },
        error: function(xhr, textStatus, ex) {
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

        $("#resetButton").click(function(e) {
        $("#detailForm").validate().resetForm();
        });

        $("#totalButton").click(function(e) {
        $.ajax({
        url: "/control-center/app/organization/page/total",
        type: "get",
        success: function(data, textStatus, xhr) {
        $("#totalField").val(data);
        },
        error: function(xhr, textStatus, e) {
        alert(textStatus);
        }
        })
        });

        $("#pageButton").click(function(e) {
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
        success: function(data, textStatus, xhr) {
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
        error: function(xhr, textStatus, e) {
        alert(textStatus);
        }
        });
        });
        });
        </script>
        </head>
        <body>
        <h1 align="center">Hello world</h1>
        <form>
        Enter organizationId to get organization object and show in following form.
        <input id="query_org_id" name="orgId">
        <button type="button" id="button1">Get</button>
        </form>

        <form id="detailForm">
        <table>
        <tr>
        <td>organizationId</td>
        <td><input name="organizationId" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>organizationCode</td>
        <td><input name="organizationCode" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>organizationName</td>
        <td><input name="organizationName" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>organizationShortName</td>
        <td><input name="organizationShortName" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>addressLine1</td>
        <td><input name="addressLine1" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>addressLine2</td>
        <td><input name="addressLine2" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>addressLine3</td>
        <td><input name="addressLine3" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>phone</td>
        <td><input name="phone" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>email</td>
        <td><input name="email" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>status</td>
        <td><input name="status" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td>lastUpdateDate</td>
        <td><input name="lastUpdateDate" style="width: 150px;" ></td>
        </tr>
        <tr>
        <td colspan="2" align="right">
        <button id="createButton" type="button">Create</button>
        <button id="updateButton" type="button">Update</button>
        <button id="resetButton" type="reset">Reset</button>
        </td>
        </table>
        </form>

        <form>
        Get the total number of organization
        <input id="totalField" readonly="readonly">
        <button id="totalButton" type="button">Get Total</button>
        </form>

        <form>
        Page: <input id="pageField">
        Row (aka page size, optional): <input id="rowField">
        <button id="pageButton" type="button">Go to page</button>
        </form>

        <table id="hunterTable1" border="1">
        </table>
        </body>
        </html>