$(function(){
	/*  选项卡 */
	$(".list li").click(function(){
		$(this).parent().children().removeClass("index")
			.eq($(this).index()).addClass("index");
		$("table").addClass("fn-hide").eq($(this).index()).removeClass("fn-hide");	
	});

});