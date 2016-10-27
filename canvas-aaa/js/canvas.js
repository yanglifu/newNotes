$(function(){
    $(".list ul").css({display:"none"});
    $(".list ul:nth-child(1)").css({display:"block"});
    var tool = $(".tool ul li");
    var uls = $(".list ul");
    var list = $(".list ul li");
    var sp1 = $(".tool ul li span");
    tool.hover(function(){
        $(this).css({animation:"hover 1s ease forwards"});
        sp1.eq($(this).index()).css({animation:"xz 2s ease"});
    },function(){
        $(this).css({animation:""});
        sp1.eq($(this).index()).css({animation:""});
    });

    tool.click(function(){
        uls.css({display:"none"});
        uls.eq($(this).index()).css({display:"block"});
        list.css({animation:"show 1.5s ease forwards"});
    });

    list.hover(function(){
        $(this).css({animation:"hover 1s ease forwards"});
    },function(){
        $(this).css({animation:""});
    });

    /* 左侧颜色选择 */
   $(".tiaojie ul li").hover(function(){
       $(this).css({animation:"td 0.6s ease forwards"});
   },function(){
       $(this).css({animation:""});
   });

    //画布
    var copy = $(".drawing .left");
    var canvas = $(".c1");
    var cobj = canvas[0].getContext("2d");
    canvas.attr({width:copy.width(),height:copy.height()});
    var obj = new shape(copy[0],canvas[0],cobj,$(".xp"),$(".xuanze"));

    /* 快捷选择颜色 */
    $(".tiaojie ul li").click(function(){
        var color = $(this).attr("data-color");
        obj.bordercolor = color;
        obj.fillStyle = color;
    });

    /* 画图 */
    $(".uls1 li").click(function(){
        if($(this).attr("data-role") == "pen"){
            obj.pen();
        }else{
            obj.shaps = $(this).attr("data-role");
            obj.draw();
        }
    });

    /* 文件的操作 */
    $(".uls2 li").click(function(){
        var index = $(this).index(".uls2 li");
        if(index == 0){
            if(obj.history.length>0){
                var yes = window.confirm("亲，是否保存？");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
                }else{
                    obj.history = [];
                    cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
                }
            }
        }else if(index==1){
            if(obj.history.length<=0){
                alert("亲,没有要保存的内容");
            }else{
                location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
            }
        }else if(index==2){
            if(obj.history.length == 0){
                alert("亲,没有历史记录");
                cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
                return;
            }else{
                var pop = obj.history.pop();
                cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
                cobj.putImageData(pop,0,0);
            }
        }
    });
    /* 类型 */
    $(".uls3 li").click(function(){
        obj.type = $(this).attr("data-role");
    });
    /* 线条的颜色 */
    $(".xcolor").change(function(){
        obj.bordercolor = $(this).val();
    });

    /* 填充的颜色 */
    $(".tcolor").change(function(){
        obj.fillStyle = $(this).val();
    });

    /*线条粗细 */
    $(".uls6 li").click(function(){
        obj.lineWidth = $(this).attr("data-role");
    });

    /* 橡皮檫 */
    $(".uls7 li").click(function(){
        var w = $(this).attr("data-role");
        var h = $(this).attr("data-role");
        var xobj = $(".xp");
        obj.xp(xobj,w,h);
    });

    /* 选择工具 */
    $(".tool-xuanze").click(function(){
        obj.select($(".xuanze"));
    });
});