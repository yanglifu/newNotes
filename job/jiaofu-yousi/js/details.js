$(function(){
var pcwidth=$(window).width(),
    pcheight=$(window).height(),
    pcframe=$(".ex8-appointment"),
    pcinputbox=$(".jf-login .jf-code .left"),
    pcframewidth=pcframe.width(),
    pcframeheight=pcframe.height(),
    textarea = $(".jf-login textarea"),
    abut=$(".opinion"),
    mask=$(".mask");
pcframe.css({left:(pcwidth-pcframewidth)/2,top:(pcheight-pcframeheight)/2});
abut.click(function(){
    mask.removeClass("fn-hide");
    pcframe.removeClass("fn-hide");
});
pcinputbox.click(function(){
    mask.addClass("fn-hide");
    pcframe.addClass("fn-hide");
});
mask.click(function(){
    mask.addClass("fn-hide");
    pcframe.addClass("fn-hide");
});

//意见反馈

var opinionbtn = $(".jf-opinion"),
    opinion = $(".jf-feedback"),
    opinionwidth = opinion.width(),
    opinionheight = opinion.height(),
    cancel = $(".jf-code .left");
    opinion.css({left:(pcwidth-opinionwidth)/2,top:(pcheight-opinionheight)/2});
    opinionbtn.click(function(){
        mask.removeClass("fn-hide");
        opinion.removeClass("fn-hide");
    });
    cancel.click(function(){
        mask.addClass("fn-hide");
        opinion.addClass("fn-hide");
    });
    mask.click(function(){
        mask.addClass("fn-hide");
        opinion.addClass("fn-hide");
    });


//我要评价

var evaluate = $(".jf-comments"),
    evaluatebtn = $(".evaluate"),
    xing = $(".jf-comments-p .right images"),
    spans = $(".jf-comments p span"),
    textareas = $(".jf-comments-textarea .left textarea"),
    cancels = $(".jf-comments .cancel"),   // 关闭
    mycomments = $(".jf-comments .review"), //评论
    imgnum,inner,
    user = $("#username").html(),
    userphoto = $("#user-photo").attr("src"),
    dataComment = $("#data-comment"),
    titlenum = $("input[name=title]").val();
    flag = true;
    evaluatebtn.click(function(){
        if(flag){
            evaluate.removeClass("fn-hide");
            flag = false;
        }else{
            evaluate.addClass("fn-hide");
            flag = true;
        }
    });
    var imgs = ["images/jf-xx-1.png","images/jf-xx-2.png"];
    xing.click(function(){
        xing.attr("src",imgs[0]);
        var index = $(this).index();
        imgnum = index+1;
        xing.each(function(i,obj){
            if(i<=index){
                $(obj).attr("src",imgs[1]);
            }
        });
    });

    textareas.bind('keydown keyup mouseout ',function(){
        inner = $(this).val();
        var num = 150 - inner.length;
        if(num<=1){
            spans.html("0");
            textareas.val(inner.substring(0,149));
        }
        spans.html(num);
    });

    cancels.click(function(){
        evaluate.addClass("fn-hide");
        flag = true;
    });
    mycomments.click(function(){
        if(user){
            if((!inner) || (inner =="客官，给个评价吧～么么哒")){
                alert("请输入，内容");
                return;
            }else{
                commentajax(inner,imgnum,user);
            }
        }else{
            mask.removeClass("fn-hide");
            pcframe.removeClass("fn-hide");
        }
    });

    function commentajax(inner,num,title){
        if(!num){
            num = 0;
        }
        $.ajax({
            type:"post",
            url:"www.hei.com",
            dataType:"json",
            data:{
                inner:inner,
                num:num,
                title:title
            },
            success:function(msg){
                if(msg == "error code"){
                    alert("你输入的验证码不正确");
                    return;
                }
                if(msg == "error"){
                    alert("提交失败,请填写完整");
                    return;
                }
                if(msg == "ok"){
                    alert("评论成功,等待审核");
                    xing.attr("src",imgs[0]);
                    textareas.val("");
                    $("#codes").val("");
                    // 时间
                    var d = new Date(),timestr='';
                    timestr += d.getFullYear()+'/';
                    timestr += d.getMonth()+1+'月';

                    var str = "<div class='data-list'><div class='fn-left left'> <images src='images/jf-j-100.png' alt=''></div><ul class='fn-left right'> <li class='top'><span>宁远君</span> &nbsp;&nbsp;&nbsp;"
                    for(var i=1;i<=5;i++){
                        if(i<=imgnum){
                            str+="<images src='images/jf-b-yellow.png' alt=''>";
                        }else {
                            str+="<images src='images/jf-b-ccc.png' alt=''>";
                        }

                    }
                    str = str+"</li> <li> <p>"+inner+"</p> </li> <li class='bottom'> <span>"+timestr+"</span> </li> </ul> </div>";
                    dataComment.prepend(str);
                }
            }
        });
    }

    // 点赞
    $(".jf-bg1").click(function(){
        if(!userphoto){
            return;
        }
        str="<li class='fn-right right'><images src='"+userphoto+"' alt=''></li>";
        $(".uls-photo").append(str);
        $.ajax({
            type:"post",
            url:"www",
            dataType:"json",
            data:{
                pic:userphoto,
                title:titlenum
            },
            success:function(data){
                // 返回数据处理
            }
        });
    });

    // 刷新 换一批
    $(".right-icon").click(function(){
        $.ajax({
            type:"post",
            url:"www",
            dataType:"json",
            success:function(data){
                //返回数据处理
            }
        });
    });

    // share  加入收藏夹
    $(".jf-bg2").click(function(){
        $.ajax({
            type:"post",
            url:"",
            dataType:"json",
            data:{
                title:titlenum
            },
            success:function(msg){
                if(msg == "error"){
                    alert("加入失败,请稍后重试");
                    return;
                }
                if(msg == "ok") {
                    alert("加入收藏夹成功");
                }
            }
        });
    });
});

