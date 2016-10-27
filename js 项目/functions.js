
/* 立即付款弹框 */
/*function money(btn) {
    $(btn).click(function () {
        $(".school_mask").removeClass("fn-hide");
        $(".payment_money").removeClass("fn-hide");
    });

    /!* 关闭 *!/

    $(".payment_money_off").click(function () {
        $(".school_mask").addClass("fn-hide");
        $(".payment_money").addClass("fn-hide");
    });
}*/

/* 图形验证弹框 */
/*if (!Function.prototype.bind) { //如果低版本浏览器不支持bind
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") { //如果this不是一个函数，抛出错误
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),  //arguments为bind()括号中的参数
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis || window,
                    aArgs.concat(Array.prototype.slice.call(arguments))); //argument 为bind返回方法运行时候的参数
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}*/

function timePhone(){
    var phone = $("#phone_login").attr("data-code");
    if(phone == "200"){
        $(".school_mask").removeClass("fn-hide");
        $(".code_box").removeClass("fn-hide");
        //重新获取图片验证码
        $(".code-data").click();
    }else{
        $("#code_verification").text("输入的手机号有误").removeClass("green");
        if(clearPhone){
            clearInterval(clearPhone);
        }
        clearPhone = setInterval(function () {
            $("#code_verification").text("");
        }, 2000);
    }
}

/* 关闭图形验证码 */

function closeCode() {
    $(".school_mask").addClass("fn-hide");
    $(".code_box").addClass("fn-hide");
}

//切换验证码
$(document).on("click", ".code-data", function () {
    var img = $(this).parent('li').find("img"), url = img.data("url");
    img.attr('src', url + "?" + Math.random());
});


/* 手机号 - 验证 */
function phoneS(input, errormsg) {
    $(input).blur(function () {
        var self = $(this),
                phone = self.val();
        errormsg = $(errormsg);
        $.ajax({
            "type": "POST",
            "url": '/index.php/Public/checkMember',
            "data": {
                mobile: phone
            },
            beforeSend: function () {
                if (!phone) {
                    errormsg.text('请输入手机号码').removeClass("green");
                    self.attr("data-code", "400");
                    return false;
                }
                if (!(/^1[3,4,5,7,8][0-9]{1}[0-9]{8}$/.test(phone))) {
                    errormsg.text('请输入正确格式的手机号码').removeClass("green");
                    self.attr("data-code", "400");
                    return false;
                }

            },
            success: function (data) {
                if (data.code == "200") {
                    errormsg.text(data.desc).addClass("green");
                    self.attr("data-code", "200");

                } else {
                    errormsg.text(data.desc).removeClass('green');
                }
            },
            error: function () {
                data = JSON.parse(data.responseText);
                if (data && data.desc) {
                    errormsg.text(data.desc);
                } else {
                    errormsg.text('网络连接失败，请检查网络后再次预约');
                }
            }
        });
    });
}
/* 手机号 - 找回密码  验证 */
function phoneBack(input, errormsg) {
    $(input).blur(function () {
        var self = $(this),
            phone = self.val();
        errormsg = $(errormsg);
        $.ajax({
            "type": "POST",
            "url": '/index.php/Public/checkMember',
            "data": {
                mobile: phone
            },
            beforeSend: function () {
                if (!phone) {
                    errormsg.text('请输入手机号码').removeClass("green");
                    self.attr("data-code", "400");
                    return false;
                }
                if (!(/^1[3,4,5,7,8][0-9]{1}[0-9]{8}$/.test(phone))) {
                    errormsg.text('请输入正确格式的手机号码').removeClass("green");
                    self.attr("data-code", "400");
                    return false;
                }

            },
            success: function (data) {
                if (data.code == "200") {
                    errormsg.text(data.desc).addClass("green");
                    self.attr("data-code", "200");

                } else {
                    errormsg.text(data.desc).removeClass('green');
                }
            },
            error: function () {
                    errormsg.text('网络连接失败，请检查网络后再次预约');
            }
        });
    });
}

/* 登录验证 */

function phoneLogin(input, errormsg) {
    $(input).blur(function () {
        var self = $(this),
                phone = self.val();
        errormsg = $(errormsg);
        if (!phone) {
            errormsg.text('请输入手机号').removeClass("green");
            self.attr("data-code", "400");
            return false;
        }
        if (!(/^1[3,4,5,7,8][0-9]{1}[0-9]{8}$/.test(phone))) {
            errormsg.text('请输入正确格式的手机号').removeClass("green");
            self.attr("data-code", "400");
            return false;
        } else {
            errormsg.text('').addClass("green");
            self.attr("data-code", "200");
            return true;
        }
    });
}

/* 密码验证 */
function passWord(input, errormsg) {
    $(input).blur(function () {
        var self = $(this),
                pass = self.val();
        errormsg = $(errormsg);
        if (!pass) {
            errormsg.text('请输入密码').removeClass("green");
            self.attr("data-code", "400");
            return false;
        }
        if (!(/^[A-Za-z0-9]{6,20}$/.test(pass))) {
            errormsg.text('密码为6-20个字符').removeClass("green");
            self.attr("data-code", "400");
            return false;
        } else {
            errormsg.text('密码可以使用').addClass("green");
            self.attr("data-code", "200");
            return true;
        }
    });
}

/* 密码验证 */
function passWords(input, errormsg) {
    $(input).blur(function () {
        var self = $(this),
            pass = self.val();
        errormsg = $(errormsg);
        if (!pass) {
            errormsg.text('请输入密码').removeClass("green");
            self.attr("data-code", "400");
            return false;
        }else
        if (!(/^[A-Za-z0-9]{6,20}$/.test(pass))) {
            errormsg.text('密码为6-20个字符').removeClass("green");
            self.attr("data-code", "400");
            return false;
        } else {
            errormsg.text('').addClass("green");
            self.attr("data-code", "200");
            return true;
        }
    });
}


/* 登录 */

function check(uesrname, password, error) {
    var phone = $(uesrname).attr("data-code"),
            pass = $(password).attr("data-code"),
            username = $(uesrname).val(),
            password = $(password).val();
    error = $(error);
    if (phone == 200 && pass == 200) {

        loading("on");
        $.ajax({
            "type": "POST",
            "url": '/public/login.html',
            "data": {
                username: username,
                password: password
            },
            success: function (data) {
                loading("off");
                if (data.code == "200") {
                    window.location.reload();  // 页面刷新
                } else {

                    error.text(data.desc);
                    timeOut(error);
                    return false;
                }
            },
            error: function () {
                errormsg.text('网络连接失败，请检查网络后再次预约');
            }
        });
    } else {
        error.text("请检查输入的手机号和密码是否正确");
        timeOut(error);
        return false;
    }
}

function checkBack(uesrname, password, error) {
    var phone = $(uesrname).attr("data-code"),
        pass = $(password).attr("data-code"),
       usernames = $(uesrname).val(),
       passwords = $(password).val(),
       verify = $("input[name='verification_code']").val(),
        error = $(error);
    if (phone == 200 && pass == 200) {
        loading("on");
        $.ajax({
            "type": "POST",
            "url": '/public/findPwd.html',
            "data": {
                username: usernames,
                password: passwords,
                verify:verify

            },
            success: function (data) {
                loading("off");
                if (data.code == "200") {
                    error.text(data.desc).addClass('green');
                    setTimeout(function(){
                        location.href = "/Public/login.html";
//                        window.location.reload();  // 页面刷新
                    },1000);

                } else {
                    error.text(data.desc);
                    timeOut(error);
                    return false;
                }
            },
            error: function () {
                errormsg.text('网络连接失败，请检查网络后再次预约');
            }
        });
    } else {
        error.text("请检查输入的手机号、密码和验证码是否正确");
        timeOut(error);
        return false;
    }
}

/* 2s 显示的错误提示 error 对象 */
var clear;
function timeOut(error) {
    if (clear) {
        clearTimeout(clear);
    }
    clear = setTimeout(function () {
        error.text("");
        clearTimeout(clear);
    }, 2000);
}

/* 4s 显示的错误提示 error 对象 */
var clearF;
function timeOutF(error) {
    if (clearF) {
        clearTimeout(clearF);
    }
    clearF = setTimeout(function () {
        error.text("");
    }, 4000);
}

/*  底部悬浮窗口  */

(function botttom() {
    var timess;
    $(".school_bottom_close_img").click(function () {
        clearInterval(timess);
        $(".school_bottom_box").addClass("fn-hide");
        $(".school_bottom_inner").addClass("fn-hide");
        timess = setInterval(function () {
            $(".school_bottom_box").removeClass("fn-hide");
            $(".school_bottom_inner").removeClass("fn-hide");
        }, 10000);
    });
})();


/*  立即预约  */

$(document).on("click",".as_school_appointment",function(){
     $(".school_mask").removeClass("fn-hide");
     $(".make_an_appointment ").removeClass("fn-hide");


    /* 初始化 */
     $("div.make_an_appointment ul.list").removeClass("fn-hide");
     $(".make_an_appointment_list").addClass("fn-hide");
     $("div.make_an_appointment ul.list li input").val("");
     $(".make_an_appointment_p").text("");



    /* 预约课程  ajax 验证请求数据 */
    $("#make_an_appointment_li").click(function () {
        var self = $(this),
            mobile = $("#make_an_appointment_phone").val(),
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
                    $("div.make_an_appointment ul.list").addClass("fn-hide");
                    $(".make_an_appointment_list").removeClass("fn-hide");

                } else {
                    errormsg.text(data.desc).removeClass('fn-green');
                }

                self.removeClass('disable');

            },
            error: function (data) {

                data = JSON.parse(data.responseText);

                self.removeClass('disable');
                if (data && data.desc) {
                    errormsg.text(data.desc.message);
                } else {
                    errormsg.text('网络连接失败，请检查网络后再次预约');
                }

            }

        });
    });


});


/*   底部 立即预约   */

$(document).on("click",".fixed_bottom-btn",function(){
    /* 预约课程  ajax 验证请求数据 */
        var self = $(this),
            name = $("#fixed_name").val(),
            mobile = $("#fixed_pass").val(),
            errormsg = $(".fixed_errorMag");

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
                self.addClass('disable');

            },
            success: function (data) {

                if (data.code == '200') {
                    $("#fixed_name").val("");
                    $("#fixed_pass").val("");
                    errormsg.text(data.desc).addClass("green");
                    timeOutF(errormsg);
                } else {
                    errormsg.text(data.desc).removeClass('fn-green');
                }
                self.removeClass('disable');

            },
            error: function (data) {

                data = JSON.parse(data.responseText);

                self.removeClass('disable');
                if (data && data.desc) {
                    errormsg.text(data.desc.message);
                } else {
                    errormsg.text('网络连接失败，请检查网络后再次预约');
                }

            }

        });
});

$("ul.make_an_appointment_list li.last").click(function(){
    closeAppointment();
});

$(".make_an_appointment_close").click(function(){
    closeAppointment();
});
function closeAppointment(){
        $(".school_mask").addClass("fn-hide");
        $(".make_an_appointment").addClass("fn-hide");
}


/**
 * [ysConfirm description]
 * @param  {[object]} data [对象集合]
 * url参数存在则为ajax的请求，否则简单的执行cb
 * type ajax请求的类型
 * data ajax请求所带的所有参数
 * successCb 成功回调
 * cancelCb 取消的回调
 * title 提示文字的标题，若没有则为 '提示'
 * msg 为当前提信息要填写的内容
 */
var ysConfirm = function (data) {

    var url = data.url,
        type = data.ajaxType || 'get',
        ajaxData = data.ajaxData,
        successCb = data.successCb,
        cancelCb = data.cancelCb,
        title = data.title || '提示',
        ajaxFlag = data.ajaxFlag, //如果进行ajax请求则为true
        msg = data.msg || '你确认要执行当前信息吗？';

    /**
     * 判断当前confirm是否存在，不存在则插入
     * @param  {[type]} !$('#confirm').length [description]
     * @return {[type]}                       [description]
     */
    if (!$('#confirm').length) {
        var _html = ''
            _html += '<div id="confirm" class="confirm">'
            _html += '    <div class="confirm-title fn-clear">'
            _html += '        <h3>'+ title +'</h3>'
            _html += '        <span class="confirm-close fn-right">×</span>'
            _html += '    </div>'
            _html += '    <div class="confirm-ctn fn-clear">'
            _html += '        <div class="confirm-msg">'
            _html += '            <p>'+ msg +'</p>'
            _html += '        </div>'
            _html += '        <div class="confirm-btn fn-clear">'
            _html += '            <a href="#" class="confirm-cancel fn-left">'
            _html += '                取消'
            _html += '            </a>'
            _html += '            <a href="#" class="confirm-submit fn-right">'
            _html += '                确定'
            _html += '            </a>'
            _html += '        </div>'
            _html += '        <div class="confirm-tips fn-clear">'
            _html += '            <span class="confirm-errormsg"></span>'
            _html += '            <span class="confirm-successmsg"></span>'
            _html += '        </div>'
            _html += '    </div>'
            _html += '</div>'
        $('body').append(_html);
    } else {
        $('#confirm').find('h3').text(title);
        $('#confirm').find('.confirm-msg p').text(msg);
        $('#confirm').show();
    }

    var _comfirm = $('#confirm'),
        close = _comfirm.find('.confirm-close'),
        titlediv = _comfirm.find('.confirm-title h3'),
        txtdiv = _comfirm.find('.confirm-msg p'),
        errordiv = _comfirm.find('.confirm-errormsg'),
        successdiv = _comfirm.find('.confirm-successmsg'),
        submit = _comfirm.find('.confirm-submit'),
        cancel = _comfirm.find('.confirm-cancel');

    var submitCbFunc = function () { //submit后运行的方法

        successCb && successCb();
         _comfirm.hide();

    }

    var cancelCbFunc = function () { //cancel后运行的方法
        cancelCb && cancelCb();
        _comfirm.hide();
    }

    close.off('click'); //关闭事件
    submit.off('click'); //清除之前绑定事件
    close.on('click', function () { //绑定关闭事件
        _comfirm.hide();
        return false;
    })

    if (ajaxFlag) { //若是ajax的请求
        submit.on('click', function () {

            if (submit.hasClass('disabled')) return;
            $.ajax({
                type : type,
                url : url,
                data : ajaxData,
                beforeSend : function () {
                    successdiv.text('');
                    errordiv.text('');
                    submit.addClass('disabled')
                },
                success : function  (data) {

                    if (data.code == 200) {

                        successdiv.text('执行成功');
                        setTimeout(function () {
                            submitCbFunc();
                            window.location.reload();
                        }, 1500);

                    } else if (data.code == 550) {
                        errordiv.text(data.desc);
                    } else {
                        errordiv.text('请求地址不存在');
                    }
                    submit.removeClass('disabled')

                },
                error : function  () {
                    errordiv.text('网络连接失败，请检查网络后再次尝试')
                    submit.removeClass('disabled')
                }
            })
            return false;

        });

    } else { //若不是ajax的请求, 直接只有回调

        submit.on('click', submitCbFunc);

    }

    cancel.on('click', cancelCbFunc);


}
window.ysConfirm = window.ysConfirm || ysConfirm;

/**
 * 默认调用confirm
 */
$(document).on('click', '.confirmBtn', function () {

    var self = $(this),
        title = self.attr('data-title'), //默认
        msg = self.attr('data-content'), //信息
        url = self.attr('data-url'), //请求url
        method = self.attr('data-method'), //默认为get
        ajaxFlag = !!self.attr('data-type'); //如果值存在 则请求url, 否则跳转

    ysConfirm({
        title : title,
        msg : msg,
        url : url,
        ajaxType : method,
        ajaxFlag : ajaxFlag,
        successCb : function () {
            if (!ajaxFlag) {
                location.href = url
            }
        }
    })
    return false;
})

/* 全局loading */
function loading(load){
    if(load == "on"){
        $(".school-loading").removeClass("fn-hide");
    }
    if(load== "off"){
        $(".school-loading").addClass("fn-hide");
    }
}


/* 全局alert */

/**
 * success 成功回调
 * title 提示文字的标题，若没有则为 '提示'
 * inner 为当前提信息要填写的内容
 */
function myAlert(data){
   var  title = data.title || "提示",
        inner = data.inner || "这里是弹框";
        success = data.success;
    if(!$("#school_alert").length){
        var _html = ''
            _html += '<div id="school_alert" class="school_alert">'
            _html += '<span class="iconfont icon-xxx school_alert_close"></span>'
            _html += '<h4>'+title+'</h4>'
            _html += ' <div class="school_alert_inner">'
            _html += ' <p>'+inner+'</p>'
            _html += '</div>'
            _html += '<a class="school_alert_btn" href="javascript:void(0)">确定</a>'
            _html += '</div>';
        $('body').append(_html);
    }else{
        $('#school_alert').find('h4').text(title);
        $('#school_alert').find('.div.school_alert_inner p').text(inner);
        $('#school_alert').show();
    }
    var _alert = $('#school_alert'),
        colse = _alert.find(".school_alert_close"),
        btn = _alert.find(".school_alert_btn");

    var seccessFun = function(){
        success && success();
        _alert.hide();
    }


    colse.off("click");
    colse.on("click",function () {
        _alert.hide();
    });

    /* 确定按钮点击事件 */
    btn.on("click",seccessFun);
}

$(document).on('click','.alertBtn',function(){
    var self = $(this),
        title = self.attr("data-title"),
        inner = self.attr("data-inner");
    myAlert({
        title:title,
        inner:inner
    });
});


/* 滚动条事件 */

$(window).scroll(function() {

  var  w = $(window).height(),
       e = $(".school-footer-box").position().top,
       f = $(".school_bottom_inner").height();

        if($(window).scrollTop() >= e-w+f){
            $(".school_bottom_inner").addClass("school_bottom_inner_relative");
            $(".school_bottom_box").addClass("fn-hide");
        }else{
            $(".school_bottom_inner").removeClass("school_bottom_inner_relative");
            $(".school_bottom_box").removeClass("fn-hide");
        }
});
