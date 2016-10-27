$(function(){
    var idNum = 0, grades = 0, subjects= 0 ;
    $(".yousi-summer-vacation-option-grade").on("click","li",function(){
        grades = $(this).attr("data-grade");
        $(".yousi-summer-vacation-option-grade li").removeClass("yousi-white");
        $(this).addClass("yousi-white");
        subjected(grades);
        dataList(idNum,grades,subjects);
    });
    $(".yousi-summer-vacation-option-subject").on("click","a",function(){
        subjects = $(this).attr("data-subject");
        $(".yousi-summer-vacation-option-subject li a").removeClass("yousi-btn-subjects");
        $(this).addClass("yousi-btn-subjects");
        dataList(idNum,grades,subjects);

    });

    /*
    * 参数说明
    *       id 版本  grade 年级  科目 subject
    * */

  
    dataList(idNum,grades,subjects);
    function dataList(idNum,grade,subject){
        var v = "v"+idNum,
            g = "grade"+grade,
            s = "subject"+subject;
        var oneNum = course[v][g][s].one.length;
           /* twoNum = course[v][g][s].two.length,
            threeNum = course[v][g][s].one.length;*/
        var oneStr="";
        for(var i=0;i< oneNum;i++){
            oneStr += "<tr>";
            oneStr += "<td width='20%'>"+course[v][g][s].one[i][0]+"</td>";
            oneStr += "<td width='20%'>"+course[v][g][s].one[i][1]+"</td>";
            oneStr += "<td width='60%'> "+course[v][g][s].one[i][2]+"</td>";
            oneStr += "</tr>";
        }
        $(".jiaofu-one").html(oneStr);
/*        for(var j=0;j< twoNum;j++){
            twoStr += "<tr>";
            twoStr += "<td width='20%'>"+course[v][g][s].two[j][0]+"</td>";
            twoStr += "<td width='20%'>"+course[v][g][s].two[j][1]+"</td>";
            twoStr += "<td width='60%'>"+course[v][g][s].two[j][2]+"</td>";
            twoStr += "</tr>";
        }
        for(var h=0;h< threeNum;h++){
            threeStr += "<tr>";
            threeStr += "<td width='20%'>"+course[v][g][s].three[h][0]+"</td>";
            threeStr += "<td width='20%'>"+course[v][g][s].three[h][1]+"</td>";
            threeStr += "<td width='60%'>"+course[v][g][s].three[h][2]+"</td>";
            threeStr += "</tr>";
        }*/
        
/*        $(".jiaofu-two").html(twoStr);
        $(".jiaofu-three").html(threeStr);*/
    }

    /*  科目判断 */
    subjected(grades);
    function subjected(grades){
        if(grades == 0){
            $("li.yousi-li-physics").addClass("fn-hide");
            $("li.yousi-li-chemistry").addClass("fn-hide");
        }else if(grades == 1){
            $("li.yousi-li-physics").removeClass("fn-hide");
        }else{
            $("li.yousi-li-physics").removeClass("fn-hide");
            $("li.yousi-li-chemistry").removeClass("fn-hide");
        }

    }

    /*移动端*/

    var appTop = $(".yousi-list-title").offset().top;
    window.onscroll=function(){
        var scroll = $(document).scrollTop();
        if(scroll>appTop-100){
            $(".yousi-list-title").addClass("yousi-list");
        }else{
            $(".yousi-list-title").removeClass("yousi-list");
        }
    }
});