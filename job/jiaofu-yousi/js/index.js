
//头部下拉
var navselect = $(".jf-search .left"),
    selectlist = $(".jf-select"),
    select = $(".jf-select li"),
    navspan = $(".jf-search .left span"),
    flag=true;
    navselect.click(function(){
        if(flag){
            selectlist.removeClass("fn-hide");
            $(this).css({background:" #f5f5f5 url(images/jf-bottom-red.png) no-repeat 44px 18px"});
            flag=false;
        }else{
            selectlist.addClass("fn-hide");
            $(this).css({background:" #f5f5f5 url(images/jf-bottom.png) no-repeat 44px 18px"});
            flag=true;
        }
    });
    select.click(function(){
        var index=$(this).html();
        navspan.html(index);
    });

var video = $(".carousel-center li"),videoFlash= $(".jf-video");
video.click(function () {
    var flv = $(this).find('images');
    var src = $(flv).data('flv');
    var html = '<object class="" id="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="550" height="284">'+
        '<param name="movie" value="flvplayer.swf">'+
        '<param name="quality" value="high">'+
        '<param name="allowFullScreen" value="true">'+
        '<param name="FlashVars" value="vcastr_file='+ src +'&LogoText=www.yousi.com&BufferTime=3&IsAutoPlay=1">'+
        '<embed src="flvplayer.swf" allowfullscreen="true" flashvars="vcastr_file='+ src +'&LogoText=www.yousi.com&IsAutoPlay=1" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="550" height="284"></embed>'+
        '</object>';
    videoFlash.html(html);
});

//年级选择
var grade = $(".jf-top-left-grade"),
    gradelist = $(".grade-list"),
    gradeli = $(".grade-list li"),
    gradespan = $(".jf-top-left-grade span"),
    gradebox = $(".grade-grade");
    grade.click(function(){
        if(flag){
            gradelist.removeClass("fn-hide");
            $(this).css({background:" #f5f5f5 url(images/jf-i-s.png) no-repeat 54px center"});
            flag=false;
        }else{
            gradelist.addClass("fn-hide");
            $(this).css({background:" #f5f5f5 url(images/jf-i-x.png) no-repeat 54px center"});
            flag=true;
        }
    });
    gradeli.click(function(){
        var index=$(this).html();
        gradespan.html(index);
        if($(this).index()==0){
            var grade = "<li class='data1' data-id='1'><a href='javascript:void(0)'>一年级</a></li><li class='data1' data-id='2'><a href='javascript:void(0)'>二年级</a></li><li class='data1' data-id='3'><a href='javascript:void(0)'>三年级</a></li><li class='data1' data-id='4'><a href='javascript:void(0)'>四年级</a></li><li class='data1' data-id='5'><a href='javascript:void(0)'>五年级</a></li><li class='data1' data-id='6'><a href='javascript:void(0)'>六年级(初中预备)</a></li>";
            gradebox.html("").append(grade);
        }
        if($(this).index()==1){
            var grade = "<li class='data1' data-id='21'><a href='javascript:void(0)'>初一</a></li><li class='data1' data-id='22'><a href='javascript:void(0)'>初二</a></li><li class='data1' data-id='23'><a href='javascript:void(0)'>初三</a></li>";
            gradebox.html("").append(grade);
        }
        if($(this).index()==2){
            var grade = "<li class='data1' data-id='31'><a href='javascript:void(0)'>高一</a></li><li class='data1' data-id='32'><a href='javascript:void(0)'>高二</a></li><li class='data1' data-id='33'><a href='javascript:void(0)'>高三</a></li>";
            gradebox.html("").append(grade);
        }
    });


// 年级 科目选择
var dataGradeText,dataSubjectText;
$(document).on("click",".data1",function(){
    $(this).siblings().removeClass("data-bg").children().removeClass("lf-list-index");
    $(this).addClass("data-bg").children().addClass("lf-list-index");
    var dataGrade = $(this).attr("data-id");
    dataGradeText=dataGrade;
    doajax(dataGradeText,dataSubjectText);
});

$(".data2").click(function(){
    $(".data2").removeClass("data-bg").children().removeClass("lf-list-index");
    $(this).addClass("data-bg").children().addClass("lf-list-index");
    var dataSubject = $(this).attr("data-id");
    dataSubjectText = dataSubject;
    doajax(dataGradeText,dataSubjectText);
});

function doajax(dataGrade,dataSubject){
    if(!dataGrade){
        dataGrade = "";
    }
    if(!dataSubject){
        dataSubject = " ";
    }
    $.ajax({
        type:"post",
        url:"www.baodu.com",
        dataType:"json",
        data:{
            grade:dataGrade,
            subject:dataSubject
        },
        success:function(data){
            // 返回数据处理
        }
    });
}



//  昵称
var nicktitle = $(".jf-nickname"),
    nicklist = $(".jf-top-list-bg>.uls"),
    nickicon = $(".jf-top-list-bg");

function Nickname(option){
    this.title = option.title;
    this.list = option.list;
    this.icon = option.icon;
    this.nick();
}
Nickname.prototype={
    nick:function(){
        var that = this;
        that.title.hover(function(){
            that.list.removeClass("fn-hide");
            that.icon.css({background:"url(images/jf-top-login-s.png)  no-repeat  center 16px"});
        },function(){
            that.list.addClass("fn-hide");
            that.icon.css({background:"url(images/jf-top-login-x.png)  no-repeat  center 16px"});
        });
    }
};
new Nickname({title:nicktitle,list:nicklist,icon:nickicon});


//选项卡

var listbtn = $(".lf-list");
var lisbox = $(".lf-box");
listbtn.click(function(){
    listbtn.removeClass("jf-index");
    $(this).addClass("jf-index");
    var index = $(this).index();
    lisbox.addClass("lf-hide").eq($(this).index()).removeClass("lf-hide");
});



// 滑块
var carousel = $(".carousel-center"),
    lists = $(".carousel-center li"),
    btnleft = $(".jf-carousel-left"),
    btnright = $(".jf-carousel-right");
var listsW = lists.width();
var num = 0;
btnleft.click(function(){
    num++;
    if(num >2){
        num = 2;
        $(this).css("background","url(images/jf-i-6.png)");
        return;

    }
    btnright.css("background","url(images/jf-i-7.png)");
    carousel.animate({"margin-left":-(num*(listsW+20))},500);
});
btnright.click(function(){
    num--;
    if(num < 0){
        num=0;
        $(this).css("background","url(images/jf-i-77.png)");
        return;
    }
    btnleft.css("background","url(images/jf-i-66.png)");
    carousel.animate({"margin-left":-(num*(listsW+20))},500);
});

//登录弹框
var pcwidth=$(window).width(),
    pcheight=$(window).height(),
    pcframe=$(".ex8-appointment"),
    pcinputbox=$(".ex8-inputbox"),
    pcframewidth=pcframe.width(),
    pcframeheight=pcframe.height(),
    abut=$(".jf-top-inner .right>a"),
    object = $("object"),
    mask=$(".mask");
    pcframe.css({left:(pcwidth-pcframewidth)/2,top:(pcheight-pcframeheight)/2});
    abut.click(function(){
       mask.removeClass("fn-hide");
       pcframe.removeClass("fn-hide");
        object.addClass("fn-hide");     // 视频框
    });
    pcinputbox.click(function(){
       mask.addClass("fn-hide");
       pcframe.addClass("fn-hide");
       object.removeClass("fn-hide");
    });
    mask.click(function(){
        mask.addClass("fn-hide");
        pcframe.addClass("fn-hide");
        object.removeClass("fn-hide");
    });
// 教学宝典 登录
    $(".on-sign").click(function(){
        mask.removeClass("fn-hide");
        pcframe.removeClass("fn-hide");
    });
$(".bottom-no").click(function(){
    mask.removeClass("fn-hide");
    pcframe.removeClass("fn-hide");
});

//搜索
var search = $("#search");
search.click(function () {
    var searchCat = $("#search-cat").html(),
        keyword = $("#keyword").val();
    if(keyword==null || keyword.length==0)
    {
        alert('请输入关键词，再点击搜索');
        return;
    }
    var newUrl = "/" + (searchCat=="课件"?"c":"a")+"-0-0-0-0-0-0-0-0-0-0-"+ encodeURIComponent(keyword) +"/";
    location.href = newUrl;
});

//登录
var login = $("#button");
login.click(function () {
    var user = $("#user").val(),
        pass = $("#pass").val();
    $.ajax({
        type:"post",
        url:"/?obj=other&act=login",
        dataType:"json",
        data: {
            user: user,
            pass: pass
        },
        success: function(msg){
            if(msg.code==0)
            {
                alert("登录失败，请检查用户名或者密码");
                $("#pass").val("");
                return
            }
            if(msg.code =="200")
            {
                alert("登录成功");
                $("#pass").val("");
                $(".ex8-appointment").addClass("fn-hide");
                $("#login-link").addClass("fn-hide");
                $(".top-photo").removeClass("fn-hide");
                $(".top-photo").html("<images src=\""+ msg.data.photo +"\" height=\"40\" width=\"41\">");
                $(".jf-nickname").removeClass("fn-hide");
                $(".jf-nickname").html("<div class=\"top-index fn-left \">"+
                    "<a href=\"/user/\"><span class=\"user-name\">"+msg.data.nickname+"</span></a>"+
                    "</div>"+
                    "<div class=\"fn-left jf-top-list-bg\">"+
                    "    <ul  class=\"uls fn-hide\">"+
                    "   <li><a href=\"/user/\">个人中心</a></li>"+
                    "    <li><a href=\"/user/course/\">我的课程</a></li>"+
                    "    <li><a href=\"/?obj=other&act=loginOut\">退出登录</a></li>"+
                    "    </ul>"+
                    "   </div>");
                $(".user-name").html(msg.data.nickname);
                mask.addClass("fn-hide");
                opinion.addClass("fn-hide");
                return
            }
        }
    });
    return false;
});

//意见反馈

var opinionbtn = $(".jf-opinion"),
    opinion = $(".jf-feedback"),
    cancel = $(".jf-code .left");
opinion.css({left:(pcwidth-pcframewidth)/2,top:(pcheight-pcframeheight)/2});
opinionbtn.click(function(){
    $("#verifyCode").attr("src","?obj=verify&t=");
    mask.removeClass("fn-hide");
    opinion.removeClass("fn-hide");
    object.addClass("fn-hide");
});
cancel.click(function(){
    mask.addClass("fn-hide");
    opinion.addClass("fn-hide");
});
mask.click(function(){
    mask.addClass("fn-hide");
    opinion.addClass("fn-hide");
});
var jfCode = $(".jf-code .fn-right");
jfCode.click(function () {
    var message = $("#message").val();
    var code = $("#code").val();
    var phone = $("#phone").val();
    $.ajax({
        type:"post",
        url:"/?obj=other&act=feedback",
        data: {
            code:code,
            phone:phone,
            message:message
        },
        success: function(msg){
            if(msg=="error code")
            {
                alert("你输入的验证码不正确");
                return
            }
            if(msg =="error")
            {
                alert("提交失败，请填写完整");
                return
            }
            if(msg=="ok")
            {
                alert("提交成功，感谢你的反馈，我们会及时跟进");
                $("#message").val("");
                $("#code").val("");
                $("#phone").val("");
                mask.addClass("fn-hide");
                opinion.addClass("fn-hide");
            }
        }
    });
});

//检测密码框

    $("input[name=pass]").bind("input propertychange",function(){
        pcframe.addClass("bgphoto");
        if(!($(this).val())){
           pcframe.removeClass("bgphoto");
        }
    });


//侧导航
    var navlist = $(".jf-banner-inner .left>ul>li"),
        navbox= $(".left-list-box");
        navlist.hover(function(){
            navbox.eq($(this).index()).removeClass("fn-hide");
        },function(){
            navbox.addClass("fn-hide");
        });


// 写文章 的标签操作

//隐藏域 初始值
var strs="";
for(var i=0;i<$(".label-label span").length;i++){
     strs +=$($(".label-label span")[i]).html();
}
$("input[name=libel-hidden]").val(strs);

$(".label-inner .label-uls li").click(function(){
    var lablebtn = $(this).html();
    if($(".label-label").length >=3 ){
        alert("对不起，最多只能输入3个标签");
        return;
    }
    var lengths = $(".label-label span").length;
    for(var i = 0 ;i < lengths;i++ ){
        if($($(".label-label span")[i]).html() == lablebtn){
            alert("这个标签已存在！");
            return ;
        }
    }
    str="<div class='label-label fn-left'><span>"+lablebtn+"</span> <images src='images/jf-label10.png' alt=''></div>";
    $(".label").prepend(str);
    inputhidden();

});


 var labelinput =   $(".jf-article-label .right .label .label-input input");
     labelinput.blur(function(){
         var val = $(this).val();
         if(val.length==0){
             return;
         }
         if(val.length>20){
             val = val.substr(0,20);
         }
         val = val.replace(/\,|，/g," ");
         var valarr = val.split(/\s+/);
         var num =valarr.length;
         for(var i=0;i<num;i++){
             if(valarr[i] == ""){
                 continue;
             }
             if($(".label-label").length >=3 ){
                 labelinput.val("");
                 return;
             }
             var str = "";
             str+="<div class='label-label fn-left'><span>"+valarr[i]+"</span> <images src='images/jf-label10.png' alt=''></div>";
             $(".label").prepend(str);
         }
         labelinput.val("");
         inputhidden();
     });


    $(document).on("click",".label-label images",function(){
        $(this).parent().remove(".label-label");
        inputhidden();
    });



function inputhidden(){
    //隐藏域 初始值
    var strs="";
    for(var i=1;i<=$(".label-label span").length;i++){
        if(i==$(".label-label span").length){
            strs +=$($(".label-label span")[i-1]).html();
        }else{
            strs +=$($(".label-label span")[i-1]).html()+" ";
        }
    }
    $("input[name=libel-hidden]").val(strs);
}
