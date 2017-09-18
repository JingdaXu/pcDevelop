$.validator.setDefaults({
    submitHandler: function() {
        alert("提交事件!");
    }
});
$().ready(function() {
    //公司管理表单
    $("#company-basic").validate({
        rules: {
            name: {
                required:true,
                minlength:5,
                maxlength:50
            },
           sname: {
                required:true,
                minlength:2,
                maxlength:20
            },
            industry: {
                required: true,
                minlength: 2
            },
            people: {
                minlength: 1
            },
            onumber: {
                required: true,
                minlength: 1
            },
            code: {
                required: true,
                minlength: 1
            },
            country: {
                required: true,
                minlength: 1
            },
            postcode:{
                requirde:false
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "请输入您公司名称,最少5个字",
            sname: "请输入您公司简称",
            industry: {
                required: "请输入行业",
                minlength: "行业至少有2个字"
            },
            people: {
                required: "请输入公司人数",
                minlength: "公司人数不能小于 1"
            },
            onumber: {
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
            place: "请输入公司地址",
            minlength: "地址最少2个字"
        }
    });
    //登录表单
    $("#login-form").validate({
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        rules: {
            usermail:{
                required:true,
                minlength:2
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
        },
        messages: {
            usermail: "请确保输入正确的邮箱地址",
            username: "请输入用户名",
            registeredPassword: "请输入登录密码",
            passwordConfirm: {
                required:"请再次输入登录密码",
                equalTo:"密码与确认密码不一致"
            },
            confirm: "请输入验证码"
        }
    })


});
/**
 * Created by user on 2017/9/15.
 */
