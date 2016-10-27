

/* 立即付款弹框 */
function money(btn){
	$(btn).click(function(){
		$(".school_mask").removeClass("fn-hide");
		$(".payment_money").removeClass("fn-hide");
	});

	/* 关闭 */

	$(".payment_money_off").click(function(){
		$(".school_mask").addClass("fn-hide");
		$(".payment_money").addClass("fn-hide");
	});
}


/* 图形验证弹框 */

function imgCode(btn){
	$(btn).click(function(){
		$(".school_mask").removeClass("fn-hide");
		$(".code_box").removeClass("fn-hide");
	});

	/* 关闭 */
	$("#img_code_off").click(function(){
		$(".school_mask").addClass("fn-hide");
		$(".code_box").addClass("fn-hide");
	});
}


/*  注册验证 -手机验证*/

/*
*	input 失去焦点的input
	prompt 提示信息
		
*/

function blurPhoto(input,prompt){
	$(input).blur(function(){
		var self = $(this),
				val = self.val(),
				errormsg = $(prompt);				
		if (self.hasClass('disable')) return;

		$.ajax({
			'type' : 'POST',
            'url' : '/index.php?m=intention&c=index&a=intention_post',
            'data' : {
                tel_phone : mobile,
                name : name
            },
		});
				
	});
}

