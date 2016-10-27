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
