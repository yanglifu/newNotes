$(function(){
	/**
	*	课程安排 切换
	**/
	$(".banner-4-ultitle li").click(function(){
		var index = $(this).index();
		$(".banner-4-ultitle li").removeClass('index').eq(index).addClass("index");
		var _html = '<img src="/Public/images/9.9-4-banner'+index+'.png" alt="">';
		$(".banner-4-box").html(_html);
	});


	/**
	*	选项卡 切换
	**/

	var  btnL = $(".btn-left-6"),
		 btnR = $(".btn-right-6"),
		 boxS = $(".summer-teachers-lists"), 
		 num = 1065;
	
	btnL.click(function(){
		if($(this).attr("data-num") == 1){
			return;
		}
		boxS.animate({
			left:'-'+num+'px'
		},500);
		$(this).removeClass("bg1").addClass("bg4").attr("data-num","1");
		btnR.removeClass("bg3").addClass("bg2").attr("data-num","2");
	});

	btnR.click(function(){
		if($(this).attr("data-num") == 1){
			return;
		}
		boxS.animate({
			left:0+'px'
		},500);
		$(this).removeClass("bg2").addClass("bg3").attr("data-num","1");
		btnL.removeClass("bg4").addClass("bg1").attr("data-num","2");
	});

	/**
	*	立即预约
	**/

	$(".fixed_bottom-btn").click(function(){
		var self = $(this),
	    	name = $("#fixed_name").val(),
	        mobile = $("#fixed_pass").val();
	    if (self.hasClass('disable'))
	        return;
	    $.ajax({
	        type: 'POST',
	        url: '/index.php/home/bespeak/release',
	        data: {
	            mobile: mobile,
	            nickname: name
	        },
	        dataType: "json",
	        beforeSend: function () {
	            if (!mobile) {
	                alert('请填写手机号码');
	                return false;
	            }
	            if (!(/^1\d{10}$/.test(mobile))) {
	                alert('请输入正确手机号码');
	                return false;
	            }
	            if (!name) {
	                alert('请输入姓名');
	                return false;
	            }
	            self.addClass('disable');
	        },
	        success: function (data) {

	            if (data.code == '200') {
	                $("#fixed_name").val("");
	                $("#fixed_pass").val("");
	                alert(data.desc);
	            } else {
	                alert(data.desc)
	            }
	            self.removeClass('disable');
	        },
	        error: function (data) {
	        	alert("网络连接错误，请稍后重试");
	        }

	    });		
	});



	/*  立即预约  */

	$(document).on("click",".as_school_appointment",function(){
	     $(".school_mask").removeClass("fn-hide");
	     $(".make_an_appointment ").removeClass("fn-hide");


	    /* 初始化 */
	     $("div.make_an_appointment ul.list").removeClass("fn-hide");
	     $(".make_an_appointment_list").addClass("fn-hide");


	    /* 预约课程  ajax 验证请求数据 */
	    $("#make_an_appointment_li").click(function () {
	        var self = $(this);
	        appointmentL(self);
	    });

	    $(".make_an_appointment_input").focus(function(){
	        $(document).off("keydown");
	        $(document).on("keydown",function(e){
	            if(e.keyCode == 13){
	                $(".make_an_appointment_input").blur();
	                var self = $("#make_an_appointment_li");
	                appointmentL(self);
	            }
	        });
	    });
	});
    /*  弹窗预约  */
	function appointmentL(self){
	    var mobile = $("#make_an_appointment_phone").val(),
	        name = $("#make_an_appointment_name").val(),
	        errormsg = $(".make_an_appointment_p");

	    if (self.hasClass('disable'))
	        return;
	    $.ajax({
	        type: 'POST',
	        url: '/index.php/home/bespeak/release',
	        data: {
	            mobile: mobile,
	            nickname: name
	        },
	        dataType: "json",
	        beforeSend: function () {
	            errormsg.text('').addClass('green');

	            if (!mobile) {
	                errormsg.text('请填写手机号码').removeClass('green');
	                timeOut(errormsg);
	                return false;
	            }
	            if (!(/^1\d{10}$/.test(mobile))) {
	                errormsg.text('请输入正确手机号码').removeClass('green');
	                timeOut(errormsg);
	                return false;
	            }
	            if (!name) {
	                errormsg.text('请输入姓名').removeClass('green');
	                timeOut(errormsg);
	                return false;
	            }
	//                if (!verify) {
	//                    errormsg.text('请输入短信验证码').removeClass('fn-hide');
	//                    timeout();
	//                    return false;
	//                }

	            self.addClass('disable');

	        },
	        success: function (data) {
	            if (data.code == '200') {
	                errormsg.text(data.desc).addClass("green");
	                $(".make_an_appointment .list li input").val("");
	                $(".make_an_appointment_p").text("");
	                $(".make_an_appointment .list").addClass("fn-hide");
	                $(".make_an_appointment_list").removeClass("fn-hide");
	            } else {
	                errormsg.text(data.desc).removeClass('fn-green');
	            }
	            $(document).off("keydown");
	            self.removeClass('disable');

	        },
	        error: function (data) {

	            errormsg.text('网络连接失败，请检查网络后再次预约');

	        }

	    });
	}

	$(".make_an_appointment_close").click(function(){
	    	closeAppointment();
		});

	function closeAppointment(){
	    $(".school_mask").addClass("fn-hide");
	    $(".make_an_appointment").addClass("fn-hide");
	}
});



