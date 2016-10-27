
// 选项卡
function tabs(option){
    this.title = option.title;
    this.box = option.box;
    this.index = option.index;  // 点击选中样式
    this.click();
}
tabs.prototype = {
    click:function(){
        var that = this;
        this.title.click(function(){
            that.title.removeClass(that.index);
            $(this).addClass(that.index);
            that.box.addClass("fn-hide").eq($(this).index()).removeClass("fn-hide");
        });
    }
};

// 试卷库的 更多地区

function more(option){
    this.down = option.down;
    this.more = option.more;
    this.click();
}
more.prototype = {
    click:function(){
       var that = this,
           flag = true;
        that.down.click(function(){
            if(flag){
                that.more.removeClass("fn-hide");
                $(this).parent().addClass("last-bg");
                flag = false;

            }else{
                that.more.addClass("fn-hide");
                $(this).parent().removeClass("last-bg");
                flag = true;
            }
        });
    }
};

//试卷库的 ajax传值

var dataRegion,dataType,dataYear,dataGrade,dataSubject,dataCompetition,dataEdition;
function onclick(a){
    a.click(function(){
        a.removeClass("jf-a-index");
        $(this).addClass("jf-a-index");
        a.parent().removeClass("jf-li-index");
        $(this).parent().addClass("jf-li-index");
        if($(this).attr("data-region")){
            dataRegion =  $(this).attr("data-region");
        }
        if($(this).attr("data-type")){
            dataType =  $(this).attr("data-type");
        }
        if($(this).attr("data-year")){
            dataYear =  $(this).attr("data-year");
        }
        if($(this).attr("data-grade")){
            dataGrade =  $(this).attr("data-grade");
        }
        if($(this).attr("data-subject")){
            dataSubject =  $(this).attr("data-subject");
        }
        if($(this).attr("data-competition")){
            dataCompetition =  $(this).attr("data-competition");
        }
        if($(this).attr("data-edition")){
            dataEdition =  $(this).attr("data-edition");
        }
        ajax(dataRegion,dataType,dataYear,dataGrade,dataSubject,dataCompetition,dataEdition);
    });
}
var region = $(".list-region a");
var type = $(".list-type a");
var year = $(".list-year a");
var grade = $(".list-grade a");
var subject = $(".list-subject a");
var competition = $(".list-competition a");
var edition = $(".list-edition a");
onclick(region);
onclick(type);
onclick(year);
onclick(grade);
onclick(subject);
onclick(competition);
onclick(edition);
function ajax(region,type,year,grade,subject,competition,edition){
    if(!region){
        region = "";
    }
    if(!type){
        type = "";
    }
    if(!year){
        year = "";
    }
    if(!grade){
        grade = "";
    }
    if(!subject){
        subject = "";
    }
    if(!competition){
        competition = "";
    }
    if(!edition){
        edition = "";
    }
    $.ajax({
        type:"post",
        url:"www.baodu.com",
        dataType:"json",
        data:{
            region:region,
            type:type,
            year:year,
            grade:grade,
            subject:subject,
            competition:competition,
            edition:edition
        },
        success:function(data){
            // 返回数据处理

        }
    });
}










