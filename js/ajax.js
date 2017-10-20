//公司管理ajax提交form表单的方式
$(document).ready(//当页面准备好加载完成的时候触发
        $("#submit").click(function () {//当鼠标点击或离开时触发
            var form = new FormData();
            $.ajax( {
                url: "http://39.108.160.55:11116/control-center/app/organization/1",
                type: "GET",
                data: form,
                //dataType:"json",
                //jsonp:"callback",
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Cotent-Type请求头
                success: function (data, status, xhr) {//data中的数据就是De页面中count的数据
                    if (xhr.status == 200 && xhr.status == 201) {
                        console.log("成功上传");
                    } else {
                        console.log("失败1");
                    }
                },
                error: function () {
                    console.log("失败2 ");
                }
            });
        })
    );