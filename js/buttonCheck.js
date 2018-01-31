/**
 * Created by 王丫丫 on 2017/10/16.
 */
/*新建合同*/
$(function () {
    /*单选按钮*/
    $("span.radio-icon").click(function () {
        $(this).addClass("active").parents().siblings().find("span.radio-icon").removeClass("active");
    });
    $(".minTemplateWrap").click(function () {

        $(this).siblings("p").children("span.radio-icon").addClass("active").parents().siblings().find("span.radio-icon").removeClass("active");
    });
    /*解除冻结*/
    $("#liftFreeze").click(function () {
        $(".companyState1").html("待审核");
        $(this).css("display", "none")
    });
    /*选择系统模板*/
    $(".minTemplate").mouseover(function () {
        $(this).children(".minTemplateWrap").addClass("hover");
    });
    $(".minTemplate").mouseout(function () {
        $(this).children(".minTemplateWrap").removeClass("hover")
    })
});