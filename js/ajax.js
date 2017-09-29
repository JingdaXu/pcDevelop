//ajax提交form表单的方式
$('#formAddHandlingFee').submit(function() {
        var AjaxURL= "../OrderManagement/AjaxModifyOrderService.aspx";
        alert($('#formAddHandlingFee').serialize());
        $.ajax({
            type: "POST",
            dataType: "html",
            url: AjaxURL + '?Action=' + 'SubmitHandlingFee' + '&OrderNumber=' + $.trim($("#<%=this.txtOrderNumber.ClientID %>").val()),
            data: $('#formAddHandlingFee').serialize(),
            success: function (data) {
                var strresult = data;
                alert(strresult);
                //加载最大可退金额
                $("#spanMaxAmount").html(strresult);
            },
            error: function(data) {
                alert("error:"+data.responseText);
            }
        });
    }
);