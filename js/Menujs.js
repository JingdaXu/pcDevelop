/**
 * Created by 王丫丫 on 2017/9/30.
 * Update by Archer on 2018/01/31
 */
$(document).ready(function () {
    $(".leftNav").click(function () {
        var flag = $(this).children(".leftNavSubWrap").is(":visible");
        if (flag == true) {
            $(this).children(".leftNavSubWrap").slideUp(500);
            $(this).find('.navLeftIcon2').removeClass("hoverdown").addClass("hoverup");
            $(this).css({
                "background-color": "#252a2e"
            })
        }
        else {
            $(this).children(".leftNavSubWrap").slideDown(500).parent().siblings().children(".leftNavSubWrap").slideUp(500);
            $(this).find('.navLeftIcon2').removeClass("hoverup").addClass("hoverdown").parents().siblings().find('.navLeftIcon2').removeClass("hoverdown").addClass("hoverup");
            $(this).css({
                "background-color": "#30373f"
            });
            $(this).children(".leftNavSubWrap").parent().siblings().css({
                "background-color": "#252a2e"
            });
            $(this).children(".leftNavSubWrap").children(".leftNavSub").css({
                "border-top": "1px solid #414447"
            })
        }
        $(".leftNav").first().css({
            "background-color": "#252a2e"
        })
    })
});