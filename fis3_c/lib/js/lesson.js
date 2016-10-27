$(function(){
//选项卡
    /*
     $(function(){
     */
     var listbtn = $(".jf-lookups li"),
     lisbox = $(".jf-grade");
     listbtn.click(function(){
     listbtn.removeClass("jf-looks");
     $(this).addClass("jf-looks");
     lisbox.addClass("lf-hide").eq($(this).index()).removeClass("lf-hide");
     });

//课件选项卡

    var lists = $(".jf-chapter-inner .right .list-list li"),
        boxs = $(".list-box");
    lists.click(function(){
        lists.removeClass("jf-dome");
        $(this).addClass("jf-dome");
        boxs.addClass("fn-hide").eq($(this).index()).removeClass("fn-hide");
    });

// 查看下载
    var jfsee = $("#uls .jf-see"),
        seelist = $(" #uls .jf-see .jf-see-select"),
        download = $("#uls .jf-download"),
        downlist = $("#uls .jf-download .jf-see-select");
    see(download,downlist);
    see(jfsee,seelist);

    function see(see,list){
        see.hover(function(){
            $(this).children("ul").removeClass("fn-hide");
            //$(this).css({background:"#ffffff  /url(img/jf-j-s.png) no-repeat 70px center"});
        },function(){
            $(this).children("ul").addClass("fn-hide");
            //$(this).css({background:"#ffffff  url(/img/jf-j-x.png) no-repeat 70px center"});
        });
    }

//树状图
    $(".nav-img-btn").click(function(){
        if($(this).parent().find(".nav-uls").css("height") == "0px"){
            $(this).parent().find(".nav-uls").removeClass("fn-height");
            $(this).attr("src","images/jian.png");
        }else{
            $(this).parent().find(".nav-uls").addClass("fn-height");
            $(this).attr("src","images/jf-l-jia.png");
        }
    });
});


