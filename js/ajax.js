//公司管理ajax提交form表单的方式
$(document).ready(//当页面准备好加载完成的时候触发
    function getval() {
        $("#TextBox1").blur(function () {//当鼠标点击或离开时触发
            var txt = $(this).val();//获取文本框的值
            //使用ajax发送出来文本框的值
            $.ajax( {
                url: "De.aspx",
                type: "POST",
                data: {id:txt},
                //接收数据库返回的信息
                datatype: "xml",
                success: function (data) {//data中的数据就是De页面中count的数据
                    var co = $(data).text();
                    if (parseInt(co) == 0) {
                        var lbl = document.getElementById("Label1");//利用js输出
                        lbl.innerHTML = "√";
                    } else {
                        var lbl = document.getElementById("Label1");
                        lbl.innerHTML = "此用户名已注册";
                    }

                }
            });
        });
    });