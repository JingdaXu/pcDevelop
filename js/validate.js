
$(function () {
    $("#submit").click(function () {
        if ($("#confirm").val() == "") {
            $("#confirm").val("不能为空");
        }
    })
})
function beforeSubmitValidate(formData, jqForm, options) {
    for (var i = 0; i < formData.length; i++) {
        if (!formData[i].value) {
            alert("表单内容不能为空!");
            return false;
        }
    }
    var queryString = $.param(fomData);
    return true;
}
$().ready(function() {
    //新增公司表单
    $("#detailForm").validate({
        rules: {
            organizationName: {
                required:true,
                minlength:5,
                maxlength:50
            },
            organizationShortName: {
                required:true,
                minlength:2,
                maxlength:20
            },
            industry: {
                required: true,
                minlength: 2
            },
            size: {
                minlength: 1
            },
            Onumber: {
                required: true,
                minlength: 1,
                number: true
            },
            code: {
                required: true,
                minlength: 1,
                number: true
            },
            country: {
                required: true,
                minlength: 1
            },
            postalCode: {
                requirde:false
            },
            email: {
                required: true,
                email: true
            },
            websitePlace: {
                required: false
            }
        },
        messages: {
            organizationName: "请输入您公司名称,最少5个字",
            organizationShortName: "请输入您公司简称",
            industry: {
                required: "请输入行业",
                minlength: "行业至少有2个字"
            },
            Onumber: {
                required: "请输入组织机构代码",
                minlength: "组织机构代码不能小于 1"
            },
            code: {
                required: "请输入税务登记代码",
                minlength: "税务登记代码不能小于 1"
            },
            email: "请输入一个正确的邮箱",
            country: "请选择一个国家"
        }
    });
    $("#company-place").validate({
        rules: {
            place: "required"
        },
        messages: {
            place: "请输入公司正确的地址",
            minlength: "地址最少2个字"
        }
    });
    //登录表单
    $("#login-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            $( element )
                .closest( "form" )
                .find("label[for='" + element.attr("id") + "']")
                .append(error);
        },
        errorElement: "span",
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required:true,
                minlength:2
            }
        },
        messages: {
            username: "请输入账号",
            password: "请输入密码"
        }
    });
    //注册表单
    $("#registered-form").validate({
        errorPlacement: function(error, element) {
            error.appendTo(element.parent())
        },
        ignore: "#confirm",
        submitHandler: beforeSubmitValidate,
        messages: {
            usermail: "请输入一个正确的邮箱",
            username: "请输入用户名",
            password: "请输入6位数的登录密码",
            passwordConfirm: {
                required:"请再次输入登录密码",
                equalTo:"密码与确认密码不一致"
            },
            confirm: "请输入验证码"
        },
        rules: {
            usermail:{
                required: true,
                email: true
            },
            username:{
                required:true,
                minlength:2
            },
            registeredPassword:{
                required:true,
                minlength: 2
            },
            passwordConfirm:{
                required:true,
                minlength: 2,
                equalTo:"#registeredPassword"
            },
            confirm: "required"
        }})
});

