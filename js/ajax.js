//公司管理ajax提交form表单的方式
$(document).ready(//当页面准备好加载完成的时候触发
        $("#submit").click(function () {//当鼠标点击或离开时触发
            var formData = new FormData();
            var name = $("#name").val();
            var sname = $("#sname").val();
            var industry = $("#industry").val();
            var people = $("#people").val();
            var Onumber = $("#Onumber").val();
            var code = $("#code").val();
            var region = $("#region").val();
            var postcode = $("#postcode").val();
            var mail = $("#mail").val();
            var website = $("#website").val();
            var place1 = $("#place1").val();
            var place2 = $("#place2").val();
            var place3 = $("#place3").val();
            var place3 = $("#businesslicense").val();
            var place3 = $("#logo").val();
            var place3 = $("#personalId").val();
            formData.append("file1", $("#Logo").file);
            //formData.append("file2", $("#businesslicense")[0].files[1]);
            //formData.append("file3", $("#personalId")[0].files[2]);
            formData.append("name", name);
            formData.append("sname", sname);
            formData.append("industry", industry);
            formData.append("people", people);
            formData.append("Onumber", Onumber);
            formData.append("code", code);
            formData.append("region", region);
            formData.append("postcode", postcode);
            formData.append("mail", mail);
            formData.append("website", website);
            formData.append("place1", place1);
            formData.append("place2", place2);
            formData.append("place3", place3);
            $.ajax( {
                url: "http://39.108.160.55:11116/control-center/app/organization/1",
                type: "GET",
                //dataType:"json",
                //jsonp:"callback",
                //processData: false,  // 告诉jQuery不要去处理发送的数据
                //contentType: false, // 告诉jQuery不要去设置Cotent-Type请求头
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