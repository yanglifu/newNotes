$(function(){

	/* 服务协议 */

	var img_flag = true,
		img_href = $("#audition_course").attr("href");
		console.log(img_href);
	$("#img_agreement").click(function(){
		if(img_flag){
			$(this).attr('src','/public/static/images/school-index-211.png');
			$("#audition_course").attr("href","javascript:void(0)").addClass("index");
			img_flag  = false;
		}else{
			$(this).attr('src','/public/static/images/school-index-2.png');
			$("#audition_course").attr("href",img_href).removeClass("index");
			img_flag  = true;
		}
	});


	/* 图形验证 */

	imgCode(".get_code");

	/*  注册验证 */

});