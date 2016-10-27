$(function(){
	$(".nav-img-btn").click(function(){
		if($(this).parent().find(".nav-uls").css("height") == "0px"){
			$(this).parent().find(".nav-uls").removeClass("fn-height");
			$(this).attr("src","img/jian.png");
		}else{
			$(this).parent().find(".nav-uls").addClass("fn-height");
			$(this).attr("src","img/jf-l-jia.png");
		}
	});	
});