$.setCookie = function(sName, sValue) {
	var date = new Date();
	date = new Date(date.valueOf() + 3600 * 168); // A week
	document.cookie = sName + "=" + escape(sValue) + "; expires=" + date.toGMTString();
}

$.getCookie = function(sName) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var aCrumb = cookies[i].split("=");
        if (sName == aCrumb[0]) {
            return unescape(aCrumb[1]);
        }
    }
    return "";
}

var getLocalTime = function (nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

var setPage = function(pageObj, pageNum, curPage){
	if(pageNum <= 0){
		pageObj.html("").hide();
	}else if(pageNum > 0 && pageNum <= 5){
		pageObj.html("").show();
		var str = "";
		if(curPage == 1){
			pageObj.attr('data-flag', 1);
			str = '<li class="prev disable" data-num="-1"><span>prev</span></li>';
		}else {
			str = '<li class="prev" data-num="-1"><span>prev</span></li>';
		}
		for(var i = 1; i <= pageNum; i++){
			if(curPage == i){
				str+= '<li class="active" data-num='+i+'><span>'+i+'</span></li>';
			}else {
				str+= '<li data-num='+i+'><span>'+i+'</span></li>';
			}
		}
		if(curPage == pageNum){
			pageObj.attr('data-flag', pageNum);
			str += '<li class="next" disable data-num="0"><span>prev</span></li>';
		}else {
			str += '<li class="next" data-num="0"><span>prev</span></li>';
		}
		pageObj.html(str);
	}else {
		pageObj.html("").show();
		var str = "";
		if(curPage == 1){
			pageObj.attr('data-flag', 1);
			str = '<li class="prev disable" data-num="-1"><span>prev</span></li>';
		}else {
			str = '<li class="prev" data-num="-1"><span>prev</span></li>';
		}
		for(var i = 1; i <= 5; i++){
			if(curPage <= 2){
				if(i <= 2) {
					if(curPage == i){
						str+= '<li class="active" data-num='+i+'><span>'+i+'</span></li>';
					}else {
						str+= '<li data-num='+i+'><span>'+i+'</span></li>';
					}
				}else if(i == 3){
					str+= '<li class="more-page"><span>...</span></li>';
				}else {
					str+= '<li data-num='+(pageNum-(5-i))+'><span>'+(pageNum-(5-i))+'</span></li>';
				}
			}else if(pageNum-curPage <2) {
				if(i <= 2) {
					str+= '<li data-num='+i+'><span>'+i+'</span></li>';
				}else if(i == 3){
					str+= '<li class="more-page"><span>...</span></li>';
				}else {
					if(curPage == (pageNum-(5-i))){
						str+= '<li class="active" data-num='+(pageNum-(5-i))+'><span>'+(pageNum-(5-i))+'</span></li>';
					}else {
						str+= '<li data-num='+(pageNum-(5-i))+'><span>'+(pageNum-(5-i))+'</span></li>';
					}
				}
			}else {
				if(i == 1) {
					str+= '<li data-num='+i+'><span>'+i+'</span></li>';
				}else if(i == 3){
					str+= 	'<li data-num='+(curPage-1)+'><span>'+(curPage-1)+'</span></li>';
					str+=	'<li class="active" data-num='+(curPage)+'><span>'+(curPage)+'</span></li>';
					str+=	'<li data-num='+(curPage+1)+'><span>'+(curPage+1)+'</span></li>';
				}else if (i == 5) {
					str+= '<li data-num='+(pageNum-(5-i))+'><span>'+(pageNum-(5-i))+'</span></li>';
				}else{
					str+= '<li class="more-page"><span>...</span></li>';
				}
			}
		}
		if(curPage == pageNum){
			pageObj.attr('data-flag', pageNum);
			str += '<li class="next" disable data-num="0"><span>prev</span></li>';
		}else {
			str += '<li class="next" data-num="0"><span>prev</span></li>';
		}
		pageObj.html(str);
	}
}

//登录页面回车提交
var LoginSubmit = function(event){
	if(event.keyCode==13){
		$(".btn-login").click();
	}
}
//登录页面回车提交
var RegisterSubmit = function(event){
	if(event.keyCode==13){
		if(parseInt($('.register-step').attr('data-step')) == 1){
			$('.step').find('.first-step-btn').click();
			$('.register-step').attr('data-step', 2);
		}else if(parseInt($('.register-step').attr('data-step')) == 2){
			$('.step').find('.second-step-btn').click();
			$('.register-step').attr('data-step', 3);
		}else {
			return;
		}
	}
}
//密码修改页面回车提交
var ChangePwdSubmit = function(event){
	if(event.keyCode==13){
		$('.changepwd-btn').click();
	}
}

//CharMode函数  
//测试某个字符是属于哪一类.  
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字  
        return 1;
    if (iN >= 65 && iN <= 90) //大写字母  
        return 2;
    if (iN >= 97 && iN <= 122) //小写  
        return 4;
    else
        return 8; //特殊字符  
}

//bitTotal函数  
//计算出当前密码当中一共有多少种模式  
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

//checkStrong函数  
//返回密码的强度级别  

function checkStrong(sPW) {
    if (sPW.length <= 4)
        return 0; //密码太短  
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式.  
        Modes |= CharMode(sPW.charCodeAt(i));
    }

    return bitTotal(Modes);

}

//pwStrength函数  
//当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色  
var pwStrength = function(pwd) {
    O_color = "#AEC597";
    L_color = "#FF0000";
    M_color = "#FF9900";
    H_color = "#33CC00";
    if (pwd == null || pwd == '') {
        Lcolor = Mcolor = Hcolor = O_color;
    } else {
        S_level = checkStrong(pwd);
        switch (S_level) {
            case 0:
                Lcolor = Mcolor = Hcolor = O_color;
            case 1:
                Lcolor = L_color;
                Mcolor = Hcolor = O_color;
                break;
            case 2:
                Lcolor = Mcolor = M_color;
                Hcolor = O_color;
                break;
            default:
                Lcolor = Mcolor = Hcolor = H_color;
        }
    }
    $('.pwdqu').find('em')[0].style.background = Lcolor;
    $('.pwdqu').find('em')[1].style.background = Mcolor;
    $('.pwdqu').find('em')[2].style.background = Hcolor;
    return;
}
var TipsIndex = {
	accountTipsIndex: -1,
	emailTipsIndex: -1,
	telTipsIndex: -1,
	codeTipsIndex: -1,
	pwdTipsIndex: -1,
	pwdsTipsIndex: -1,
	oldPwdTipsIndex: -1
}

var RegistersStepOne = {
	account: false,
	email: false,
	tel: false
}
var RegistersStepTwo = {
	code: false
}

//验证账号完整性
var TestAccount = function(str) {
	var reg1 = /^[0-9a-zA-Z]+$/;
	var reg2 = /^\d+$/;
	if(str == ""){
		layer.close(TipsIndex.accountTipsIndex);
		TipsIndex.accountTipsIndex = layer.tips('用户名不能为空!', '#username', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	if(str.length < 6) {
		layer.close(TipsIndex.accountTipsIndex);
		TipsIndex.accountTipsIndex = layer.tips('用户名过短,至少是6位字母和数字组成!', '#username', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	if (reg1.test(str)) {
	    if (reg2.test(str)) {
	        layer.close(TipsIndex.accountTipsIndex);
			TipsIndex.accountTipsIndex = layer.tips('账户不能由纯数字组成！', '#username', {
				shift: -1,
				tipsMore: true,
				time: 0
			});
	        return false;
	    } else {
	    	layer.close(TipsIndex.accountTipsIndex);
	    	return true;
	    }
	}else {
		layer.close(TipsIndex.accountTipsIndex);
		TipsIndex.accountTipsIndex = layer.tips('用户名6-20位,由字母和数字组成,不能是纯数字!', '#username', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	return false;
}

//验证用户是否存在
function AccountIsExist(noTiShi){
	if(TestAccount($('#username').val())){
		$.ajax("/user/userExists/" + $("[name='username']").val(), {
			dataType: "json",
			type: 'GET',
			xhrFields: {
			    withCredentials: true
			},
			success: function(result) {
			    if (result.err != 0) {
			        layer.close(TipsIndex.accountTipsIndex);
					TipsIndex.accountTipsIndex = layer.tips(result.msg, '#username', {
						shift: -1,
						tipsMore: true,
						time: 0
					});
					RegistersStepOne.account = false;
			    } else {
			        if (!result.data.Exists) {
			        	if(!noTiShi){
			        		layer.close(TipsIndex.accountTipsIndex);
							TipsIndex.accountTipsIndex = layer.tips('用户名可用!', '#username', {
								shift: -1,
				        		tips: [2, '#6BC827'],
								tipsMore: true
							});
			        	}
						RegistersStepOne.account = true;
			        } else {
			        	layer.close(TipsIndex.accountTipsIndex);
						TipsIndex.accountTipsIndex = layer.tips('用户名已经存在!', '#username', {
							shift: -1,
							tipsMore: true,
							time: 0
						});
						RegistersStepOne.account = false;
			        }
			    }
			},
		});
	}
}

//验证邮箱的完整性
var TestEmail = function(str){
	var reg = /^[_/.a-z0-9]+@[a-z0-9]+[/.][a-z0-9]{2,}$/;
	if(str == ""){
		layer.close(TipsIndex.emailTipsIndex);
		TipsIndex.emailTipsIndex = layer.tips('邮箱不能为空!', '#useremail', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	if (reg.test(str)) {
		layer.close(TipsIndex.emailTipsIndex);
		return true;
	}else {
		layer.close(TipsIndex.emailTipsIndex);
		TipsIndex.emailTipsIndex = layer.tips('邮箱格式不正确，请重新输入', '#useremail', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	return false;
}

//验证邮箱是否存在
function EmailIsExist(noTiShi){
	if(TestEmail($('#useremail').val())){
		$.ajax("/user/emailExists/" + $("[name='useremail']").val(), {
		    dataType: "json",
		    type: 'GET',
		    xhrFields: {
		        withCredentials: true
		    },
		    success: function(result) {
		        if (result.err != 0) {
		            layer.close(TipsIndex.emailTipsIndex);
					TipsIndex.emailTipsIndex = layer.tips(result.msg, '#useremail', {
						shift: -1,
						tipsMore: true,
						time: 0
					});
					RegistersStepOne.email = false;
		        } else {
		            if (!result.data.Exists) {
		            	if(!noTiShi){
		            		layer.close(TipsIndex.emailTipsIndex);
							TipsIndex.emailTipsIndex = layer.tips('邮箱地址可用!', '#useremail', {
								shift: -1,
		                		tips: [2, '#6BC827'],
								tipsMore: true
							});
		            	}
		               	RegistersStepOne.email = true;
		            } else {
		            	layer.close(TipsIndex.emailTipsIndex);
						TipsIndex.emailTipsIndex = layer.tips('邮箱地址已注册!', '#useremail', {
							shift: -1,
							tipsMore: true,
							time: 0
						});
						RegistersStepOne.email = false;
		            }
		        }
		    },
		});
	}
}

//验证手机号码完整性
var TestTel = function(str, noTishi){
	var reg = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/;
	if(str == ""){
		if(!noTishi){
			layer.close(TipsIndex.telTipsIndex);
			TipsIndex.telTipsIndex = layer.tips('手机号码不能为空!', '#usertel', {
				shift: -1,
				tipsMore: true,
				time: 0
			});
		}
		return false;
	}
	if(reg.test(str)){
		layer.close(TipsIndex.telTipsIndex);
		return true;
	}else {
		if(!noTishi){
			layer.close(TipsIndex.telTipsIndex);
			TipsIndex.telTipsIndex = layer.tips('手机号码格式不正确，请重新输入', '#usertel', {
				shift: -1,
				tipsMore: true,
				time: 0
			});
		}
		return false;
	}
	return false;
}

//验证手机是否存在
function TelIsExist(noTiShi){
	if(TestTel($('#usertel').val())){
		$.ajax("/user/phoneExists/" + $("[name='usertel']").val(), {
		    dataType: "json",
		    type: 'GET',
		    xhrFields: {
		        withCredentials: true
		    },
		    success: function(result) {
		        if (result.err != 0) {
				    layer.close(TipsIndex.telTipsIndex);
					TipsIndex.telTipsIndex = layer.tips(result.msg, '#usertel', {
						shift: -1,
						tipsMore: true,
						time: 0
					});
					RegistersStepOne.tel = false;
		        } else {
		            if (!result.data.Exists) {
		            	if(!noTiShi){
		                	layer.close(TipsIndex.telTipsIndex);
							TipsIndex.telTipsIndex = layer.tips('手机号可用!', '#usertel', {
								shift: -1,
		                		tips: [2, '#6BC827'],
								tipsMore: true
							});
		                }
		                RegistersStepOne.tel = true;
		            } else {
	                	layer.close(TipsIndex.telTipsIndex);
						TipsIndex.telTipsIndex = layer.tips('手机号已注册!', '#usertel', {
							shift: -1,
							tipsMore: true,
							time: 0
						});
						RegistersStepOne.tel = false;
		            }
		        }
		    },
		});
	}
}

//验证手机验证码的正确性
var TestCode = function(str){
	if(str == ""){
		layer.close(TipsIndex.codeTipsIndex);
		TipsIndex.codeTipsIndex = layer.tips('验证码不能为空!', '#telcode', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	return true;
}


//获取手机验证码
var timer = null;
$('#telcode').on('click', function() {
	GetCode();
})
var GetCode = function(){
	var btn = $('#telcode');
	if(btn.hasClass('disable')){
		return;
	}else if(TestTel($('#usertel').val(), true)) {
		$.ajax("/user/phoneExists/" + $("[name='phone']").val(), {
		    dataType: "json",
		    type: 'GET',
		    xhrFields: {
		        withCredentials: true
		    },
		    success: function(result) {
		        if (result.err != 0) {
		        	layer.close(TipsIndex.codeTipsIndex);
					TipsIndex.codeTipsIndex = layer.tips(result.msg, '#telcode', {
						shift: -1,
						tipsMore: true,
						time: 0
					});
					RegistersStepOne.code = false;
		        } else {
		            if (!result.data.Exists) {
		            	layer.close(TipsIndex.codeTipsIndex);
						TipsIndex.codeTipsIndex = layer.tips('验证短信已发送!', '#telcode', {
							shift: -1,
							tips: [2, '#6BC827'],
							tipsMore: true,
							time: 0
						});
						RegistersStepOne.code = true;
		                if (timer) {
		                    clearInterval(timer);
		                }
		                $.ajax("/user/sendVCode/" + $("[name='phone']").val(), {
		                    type: 'GET',
		                    dataType: "json",
		                    success: function(result) {
		                        if (result.err != 0) {
		                            return
		                        }
		                        // 开始倒计时
		                        var seconds = 120;
		                        timer = setInterval(function() {
		                            btn.addClass('disable').text("重新发送(" + seconds + ")");
		                            seconds--;
		                            if (seconds == 0) {
		                                clearInterval(timer);
		                               	btn.removeClass('disable').text("重新发送");
		                            }
		                        }, 1000);
		                    },
		                });
		            } else {
		            	layer.close(TipsIndex.codeTipsIndex);
						TipsIndex.codeTipsIndex = layer.tips("手机号已注册!", '#telcode', {
							shift: -1,
							tipsMore: true,
							time: 0
						});
						RegistersStepOne.code = false;
		            }
		        }
		    },
		});
	}else {
		layer.close(TipsIndex.codeTipsIndex);
		TipsIndex.codeTipsIndex = layer.tips('请先输入您的手机号码!', '#telcode', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		RegistersStepOne.code = false;
	}
}

//验证密码正确性
var TestPwd = function(str){
	if(str == ""){
		layer.close(TipsIndex.pwdTipsIndex);
		TipsIndex.pwdTipsIndex = layer.tips('密码不能为空!', '#pwd', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	if(str.length < 6 || str.length > 20){
		layer.close(TipsIndex.pwdTipsIndex);
		TipsIndex.pwdTipsIndex = layer.tips('密码长度过短,应是6-20位字符或数字!', '#pwd', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}else {
		if($('#oldpwd').val() == $('#pwd').val()){
			layer.close(TipsIndex.pwdTipsIndex);
			TipsIndex.pwdTipsIndex = layer.tips('新密码不能原来密码相同！', '#pwd', {
				shift: -1,
				tipsMore: true,
				time: 0
			});
			RegistersStepTwo.pwd = false;
			stepTwo();
		}
		if($('#pwds').val()){
			TestSPwd();
		}
		layer.close(TipsIndex.pwdTipsIndex);
		return true;
	}
	layer.close(TipsIndex.pwdTipsIndex);
	TipsIndex.pwdTipsIndex = layer.tips('密码输入错误,应是6-20位字符或数字!', '#pwd', {
		shift: -1,
		tipsMore: true,
		time: 0
	});
	return false;
}
//验证两次输入的密码是否相同
var TestSPwd = function(isReturn){
	if($('#pwds').val() == ""){
		layer.close(TipsIndex.pwdsTipsIndex);
		TipsIndex.pwdsTipsIndex = layer.tips('密码不能为空!', '#pwds', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	if($('#pwds').val() != $('#pwd').val()){
		layer.close(TipsIndex.pwdsTipsIndex);
		TipsIndex.pwdsTipsIndex = layer.tips('两次输入的密码不相同!', '#pwds', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	layer.close(TipsIndex.pwdsTipsIndex);
	return true;
}

function stepOne(){
	if(RegistersStepOne.account && RegistersStepOne.email && RegistersStepOne.tel){
		return true;
	}else{
		return false;
	}
	return false;
}
function stepTwo(){
	if(RegistersStepTwo.code){
		return true;
	}else{
		return false;
	}
	return false;
}

//验证老密码正确性
var TestOldPwd = function(str){
	if(str == ""){
		layer.close(TipsIndex.oldPwdTipsIndex);
		TipsIndex.oldPwdTipsIndex = layer.tips('密码不能为空!', '#oldpwd', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}
	if(str.length < 6 || str.length > 20){
		layer.close(TipsIndex.oldPwdTipsIndex);
		TipsIndex.oldPwdTipsIndex = layer.tips('密码长度过短,应是6-20位字符或数字!', '#oldpwd', {
			shift: -1,
			tipsMore: true,
			time: 0
		});
		return false;
	}else {
		if($('#pwd').val()){
			TestPwd($('#pwd'));
		}
		layer.close(TipsIndex.oldPwdTipsIndex);
		return true;
	}
	layer.close(TipsIndex.oldPwdTipsIndex);
	TipsIndex.oldPwdTipsIndex = layer.tips('密码输入错误,应是6-20位字符或数字!', '#oldpwd', {
		shift: -1,
		tipsMore: true,
		time: 0
	});
	return false;
}

$(document).ready(function() {
	//处理用户是否在线
	if ($.getCookie("gc-userid") && $.getCookie("gc-userkey")) {
		$('.login').hide();
		$('.register').hide();
		$('.logout').show();
		$('.user-center').show();
	} else {
		$('.login').show();
		$('.register').show();
		$('.logout').hide();
		$('.user-center').hide();
	}
	//处理用户权限
	// if ($.getCookie("gc-userlevel") === "166") {
	// 	$('#userlevel').show();
	// } else {
	// 	$('#userlevel').hide();
	// }
    //登录
    if ($('.login-box').length > 0) {
        ! function(a, b) {
            function d(a) {
                var e, c = b.createElement("iframe"),
                    d = "https://open.weixin.qq.com/connect/qrconnect?appid=" + a.appid + "&scope=" + a.scope + "&redirect_uri=" + a.redirect_uri + "&state=" + a.state + "&login_type=jssdk";
                	d += a.style ? "&style=" + a.style : "",
                    d += a.href ? "&href=" + a.href : "",
                    c.src = d,
                    c.frameBorder = "0",
                    c.allowTransparency = "true",
                    c.scrolling = "no",
                    c.width = "300px",
                    c.height = "400px",
                    e = b.getElementById(a.id),
                    e.innerHTML = "",
                    e.appendChild(c)
            }
            a.WxLogin = d
        }(window, document);
        $(window).resize(function() {
            setLoginPos();
        })
        var setLoginPos = function(isTurn) {
            var loginboxs = $('.login-box');
            var loginbox = loginboxs.width() == 0? $(loginboxs[1]) : $(loginboxs[0]);
            var loginbtn = $('.btn-by-way');
            var footer = $('.login-footer');
            var msg = $('.msg');
            var bodyW = $('body').width();
            var bodyH = $('body').height();
            var loginboxW = 352;
            var loginboxH = loginbox.height();
            if(isTurn){
            	loginboxs.stop().animate({'top': (bodyH - loginboxH)/2}, 200);
            	loginbtn.stop().animate({'top': (bodyH - loginboxH)/2, 'left': (bodyW - loginboxW)/2+loginboxW+50}, 200);
            	msg.stop().animate({'top': (bodyH - loginboxH)/2 + 125, 'left': (bodyW - loginboxW)/2}, 200);
            }else {
            	loginboxs.css({'top': (bodyH - loginboxH)/2});
            	loginbtn.css({'top': (bodyH - loginboxH)/2, 'left': (bodyW - loginboxW)/2+loginboxW+50});
            	msg.css({'top': (bodyH - loginboxH)/2 + 125, 'left': (bodyW - loginboxW)/2});
            }
            if(parseInt(footer.css('top')) <= 760){
            	footer.css({'top':760-90});
            }
            if(bodyH > 760) {
            	footer.css({'top': bodyH-90});
            }
        }

		//品牌翻转
		var turn = function(target, time, opts) {
			target.stop().animate(opts[0], time, function() {
				$(this).hide().siblings('.login-box').show().animate(opts[1], time, function(){
					setLoginPos(true)
				});
			});
		}
		var verticalOpts = [{ 'width': 0, 'borderColor': 'transparent'}, { 'width': '352px' }];
		
        setLoginPos();
        $('.btn').on('click', function() {
        	var weixinbox = $('.by-weixin'),
        		accountbox = $('.by-account');
            if ($(this).hasClass('btn-by-weixin')) {
                $('.box-1').animate({ 'marginLeft': 0 }, { queue: false, duration: 400, complete: function() {
                	$('.btn-by-way').find('.tip').text('账户登录');
                }});
                 $('.msg').hide();
                turn($('.login-box.by-account'), 100, verticalOpts);
            } else {
                $('.box-1').stop().animate({ 'marginLeft': '-80px' }, { queue: false, duration: 400, complete: function() {
                	$('.btn-by-way').find('.tip').text('扫码登录');
                }});
                turn($('.login-box.by-weixin'), 100, verticalOpts);
            }

        })
        var obj = new WxLogin({
            id: "login-container",
            appid: "wx06ffb7b4e9912fca",
            scope: "snsapi_login",
            redirect_uri: "http://ghostcloud.cn/weixin/login/callback",
            state: "",
            style: "",
            href: ""
        });

        //登录处理
        $("#loginform").submit(function(e)
		{
			e.preventDefault(); //STOP default action
			if($('.input-box').find("[name='name']").val() == "") {
				layer.tips('用户名不能为空!', '.name', {
					tipsMore: true
				});
				return false;
			}
			if($('.input-box').find("[name='pwd']").val() == "") {
			layer.tips('密码不能为空!', '.pwd', {
					tipsMore: true
				});
				return false;
			}
			var postData = $(this).serializeArray();
			var formURL = $(this).attr("action");
			$.ajax(
			{
				url : formURL,
				type: "POST",
				data : postData,
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				success: function (result) {
					if (result.err != 0) {
						$('.msg').show().text(result.msg).attr('title', result.msg);
						return;
					}
					window.location.href = "/home/user_info.html";
				},
			});
		});

		$('.btn-login').click(function() {
			$("#loginform").submit();
		});
    }

    //注册
    if ($('.register-box').length > 0) {
    	var setRegisterPos = function(isTurn) {
            var registerbox = $('.register-box');
            var footer = $('.register-footer');
            var bodyW = $('body').width();
            var bodyH = $('body').height();
        	registerbox.css({'top': (bodyH - 600)/2});

            if(parseInt(footer.css('top')) <= 760){
            	footer.css({'top':760-90});
            }
            if(bodyH > 760) {
            	footer.css({'top': bodyH-90});
            }
        }
    	$(window).resize(function() {
            setRegisterPos();
        })
        setRegisterPos();

        $("#register-form").submit(function(e) {
            e.preventDefault(); //STOP default action
            var postData = $(this).serializeArray();
            var formURL = $(this).attr("action");
            $.ajax({
                url: formURL,
                type: "POST",
                data: postData,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(result) {
                    if (result.err != 0) {
                    	layer.close(TipsIndex.codeTipsIndex);
                    	layer.tips(result.msg, '#telcode', {
						});
                    	return;
                    }
                    // window.location.href = "/home/user_info.html";
                    $('.register-process').find('.line-2').find('span').stop().animate({ 'width': '200px' }, { queue: false, duration: 300, complete: function() {
	        			$('.register-process').find('.three').find('area').stop().animate({ 'width': '42px' }, { queue: false, duration: 100});
	        		}});
	        		$('.register-step-box').stop().animate({ 'marginLeft': '-900px' }, { queue: false, duration: 400, complete: function() {}});
                },
            });
        });

        $('.step').find('.btn').on('click', function(e){
        	e.preventDefault(); //STOP default action
        	if($(this).hasClass('first-step-btn')){
        		AccountIsExist(true);
        		EmailIsExist(true);
        		TelIsExist(true);
        		setTimeout(function(){
        			console.log(RegistersStepOne)
        			if(stepOne()){
	        			$('.register-process').find('.line-1').find('span').stop().animate({ 'width': '200px' }, { queue: false, duration: 300, complete: function() {
		        			$('.register-process').find('.two').find('area').stop().animate({ 'width': '42px' }, { queue: false, duration: 100});
		        		}});
		        		$('.register-step-box').stop().animate({ 'marginLeft': '-450px' }, { queue: false, duration: 400, complete: function() {}});
	        		}
        		},100)
        	}else if($(this).hasClass('second-step-btn')) {
        		if(TestCode($('.telcode').val()) && TestPwd($('#pwd').val()) && TestSPwd()){
        			if(stepTwo()){
        				layer.close(TipsIndex.codeTipsIndex);
						TipsIndex.codeTipsIndex = layer.tips('验证码错误!', '#telcode', {
							shift: -1,
							tipsMore: true,
							time: 0
						});
						return;
        			}else {
        				$("#register-form").submit();
        			}
        		}
        	}
        })
    }

    //修改密码
    if($('.user-changepwd-box').length > 0) {
    	$("#changepwd-form").submit(function(e) {
    	    e.preventDefault(); //STOP default action
    	    var postData = $(this).serializeArray();
    	    var formURL = $(this).attr("action");
    	    if(TestOldPwd($('#oldpwd').val()) && TestPwd($('#pwd').val()) && TestSPwd()){
	    	    $.ajax({
	    	        url: formURL,
	    	        type: "POST",
	    	        data: postData,
	    	        dataType: "json",
	    	        xhrFields: {
	    	            withCredentials: true
	    	        },
	    	        success: function(result) {
	    	            if (result.err != 0) {
	    	            	layer.close(TipsIndex.oldPwdTipsIndex);
							TipsIndex.oldPwdTipsIndex = layer.tips(result.msg, '#oldpwd', {
								shift: -1,
								tipsMore: true,
								time: 0
							});
	    	                return;
	    	            }
	    	            layer.alert('修改密码成功', {
					        skin: 'layui-layer-lan',
					        closeBtn: 0,
					        shift: 2 //动画类型
					    });
	    	        },
	    	    });
	    	}
    	});
    	$('.changepwd-btn').on('click', function(){
    		$("#changepwd-form").submit();
    	})
    }
    //用户信息处理
    if($('.container-user-nav').length > 0) {
    	//充值账单
		if ($('#start').length > 0 && $('#end').length > 0) {
	        $('#start').on('click', function() {
	            $(this).addClass('active');
	        })
	        $('#end').on('click', function() {
	            $(this).addClass('active');
	        })
	        var start = {
	            elem: '#start',
	            format: 'YYYY-MM-DD',
	            max: '2099-06-16 23:59:59', //最大日期
	            istime: true,
	            istoday: false,
	            choose: function(datas) {
	                end.min = datas; //开始日选好后，重置结束日的最小日期
	                end.start = datas //将结束日的初始值设定为开始日
	            }
	        };
	        var end = {
	            elem: '#end',
	            format: 'YYYY-MM-DD',
	            max: '2099-06-16 23:59:59',
	            istime: true,
	            istoday: false,
	            choose: function(datas) {
	                start.max = datas; //结束日选好后，重置开始日的最大日期
	            }
	        };
	        laydate(start);
	        laydate(end);

	        //查询订单
	        var orderInfo = [], showlen = 10;
			var showOrderByPage = function(orderInfo, page, num) {
			    var pageNum = page * num;
			    if (pageNum - orderInfo.length >= num) {
			        return;
			    } else {
			    	var str = '<p class="order-no w240">订单号</p>'+
						'<p class="order-info w280">订单信息</p>'+
						'<p class="order-status w80">订单状态</p>'+
						'<p class="order-ctime w160">订单创建时间</p>'+
						'<p class="order-playway w80">支付方式</p>'+
						'<p class="order-amount w100">支付金额</p>';
			        $('.records').html("").append('<div class="record-title">' + str + '</div>');
			        pageNum = (pageNum - orderInfo.length) < 0 ? pageNum : orderInfo.length;
			        for (var m = page * num - num; m < pageNum; m++) {
			            var type = orderInfo[m].ChargeType == 'alipay' ? '支付宝' : '微信';
			            var state = orderInfo[m].State == 2 ? '已支付' : '未支付';
			            str = '<p class="order-no w240">' + orderInfo[m].OrderID + '</p>' +
			                '<p class="order-info w280" title="' + orderInfo[m].OrderInfo + '">' + orderInfo[m].OrderInfo + '</p>' +
			                '<p class="order-status w80">' + state + '</p>' +
			                '<p class="order-ctime w160">' + getLocalTime(orderInfo[m].CreateTime) + '</p>' +
			                '<p class="order-playway w80">' + type + '</p>' +
			                '<p class="order-amount w100">' + orderInfo[m].Amount / 100.00 + '</p>';
			            $('.records').append('<div class="record-list">' + str + '</div>');
			        }
			        setPage($('.page'), parseInt(orderInfo.length/num+0.5), page)
			    }
			}

			$('.search-btn').on('click', function() {
			    var ftime = $('#start').text() + " 00:00:00",
			        ltime = $('#end').text() + " 23:59:59";
			    $.get('/center/rechargehistory/' + ftime + '/' + ltime, function(result) {
			        $('.records').attr('data-page', 1);
			        var data = eval('(' + result + ')').data;
			        var index = 0;
			        $.each(data.Orders, function(idx, val) {
			            if (val.OrderID) {
			                orderInfo[index++] = val;
			            }
			        })
			        var page = $('.records').attr('data-page');
			        showOrderByPage(orderInfo, page, showlen)
			    });
			})
			$('.page').find('li').on('click', function(){
				var curpage = $('.records').attr('data-page');
				if($(this).hasClass('prev')){
					if(curpage-1 <= 0){
						return;
					}
					showOrderByPage(orderInfo, curpage - 1, showlen);
					$('.records').attr('data-page', curpage - 1);
				}else if($(this).hasClass('next')) {
					if(curpage+1 > parseInt(orderInfo.length/showlen+0.5)){
						return;
					}
					showOrderByPage(orderInfo, curpage + 1, showlen);
					$('.records').attr('data-page', curpage + 1);
				}else if($(this).hasClass('more-page')) {
					return;
				}else {
					curpage = $(this).attr('data-num');
					if(curpage <= 0 || curpage > parseInt(orderInfo.length/showlen+0.5)){
						return;
					}
					showOrderByPage(orderInfo, curpage, showlen);
					$('.records').attr('data-page', curpage);
				}
			})
	    }

	    //用户充值
	    if($('.user-recharge-box').length > 0){

	    	if(typeof(userInfo) != "undefined" && typeof(userInfo.data) != "undefined" && typeof(userInfo.data.UserInfo) != "undefined"){
	    		if(typeof(userInfo.data.UserInfo.remain) != "undefined"){
					$('.user-recharge-one').find('.title').find('em').text(userInfo.data.UserInfo.remain/100.00);
				}else {
					$('.user-recharge-one').find('.title').find('em').text('00.00');
				}
	    	}
	    	
	        //匹配用户输入信息
	        function clearNoNum(obj){
				obj.val(obj.val().replace(/[^\d.]/g,"")); //清除"数字"和"."以外的字符
				obj.val(obj.val().replace(/^\./g,"")); //验证第一个字符是数字而不是
				obj.val(obj.val().replace(/\.{2,}/g,".")); //只保留第一个. 清除多余的
				obj.val(obj.val().replace(".","$#$").replace(/\./g,"").replace("$#$","."));
				obj.val(obj.val().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')); //只能输入两个小数
		    }
		    $('.charge-amount').find('.amount').on("keyup", function(){
				clearNoNum($(this))
			});

			//选择支付方式，默认支付宝
			$('.charge-way').find('.play').on('click', function(){
				$(this).addClass('active').siblings('.play').removeClass('active');
				if($(this).hasClass('weixinplay')){
					$('.charge-amount').attr('data-playway', 2);
				}else {
					$('.charge-amount').attr('data-playway', 1);
				}
			})

			//充值
			$('.btn-play').click(function() {
				if(parseInt($('.charge-amount').attr('data-playway')) == 1){
					var fee = $("[name='amount']").val();
				    if (fee > 0) {
				        $.get('/order/dpay/create/' + fee, function(result) {
				            // clear submit form
				            $('#dpay-form').empty();
				            // add input
				            var inputTpl = '<input type="hidden" name="{0}" value="{1}">';
				            var data = eval('(' + result + ')').data
				            for (var prop in data) {
				                $('#dpay-form').append(inputTpl.replace('{0}', prop).replace('{1}', data[prop]));
				            }
				            $('#dpay-form').submit();
				        });
				    } else {
				    	layer.tips('充值费用输入有误！', '.amount', {
						    tips: [2,'#78BA32']
						});
				    }
				}else {
					var fee = $("[name='amount']").val();
				    if (fee > 0) {
				        $.get('/order/weixinpay/create/' + fee, function(result) {
				            var results = eval('(' + result + ')')
				            if (results.err == 0) {
				                // gen qrcode on page
				                $('#weixinpay-qrcode').qrcode({ width: 256, height: 256, text: results.data });
				                layer.open({
								    type: 1,
								    title: false,
								    closeBtn: 1,
								    skin: 'layui-layer-nobg', //没有背景色
								    shadeClose: true,
								    content: $('.weixinpay-qrcode-box')
								});
				            } else {
				                layer.alert(results.msg, {icon: 5});
				            }
				        });
				    } else {
				    	layer.tips('充值费用输入有误！', '.amount', {
						    tips: [2,'#78BA32']
						});
				    }
				}
			});
	    }
	    //用户信息
	    if(typeof(userInfo) != "undefined" && typeof(userInfo.data) != "undefined" && typeof(userInfo.data.UserInfo) != "undefined"){
	    	if(typeof(userInfo.data.UserInfo.username) != "undefined"){
				$('#userName').find('p').text(userInfo.data.UserInfo.username);
			}
			if(typeof(userInfo.data.UserInfo.remain) != "undefined"){
				$('.user-balance').find('.content').find('em').text(userInfo.data.UserInfo.remain/100.00);
			}else {
				$('.user-balance').find('.content').find('em').text('00.00');
			}
			if(typeof(userInfo.data.UserInfo.lastlogintime) != "undefined"){
				$('#lasttime').find('p').text(getLocalTime(userInfo.data.UserInfo.lastlogintime));
			}
			if(typeof(userInfo.data.UserInfo.mail) != "undefined"){
				$('#useremail').find('p').text(userInfo.data.UserInfo.mail);
			}
			if(typeof(userInfo.data.UserInfo.phonenum) != "undefined"){
				$('#usertel').find('p').text(userInfo.data.UserInfo.phonenum);
			}
	    }
	    //获取主机信息
	    function getOverView(){
		    $.get('/center/overview/', function(result) {
		        var rows = $('.user-info-two').find('.row');
		        var data = eval('(' + result + ')').data;
		        var tNums = 0;
		        var tTimes = 0;
		        var tCosts = 0;
		        $.each(data.UserCenterInfo, function(idx, val) {
		            var name = "";
		            switch (parseInt(val.HostType)) {
		                case 1:
		                    $($(rows[2]).find('.col')[1]).find('p').text(val.HostNum);
		                    $($(rows[2]).find('.col')[2]).find('p').text(val.HostOnlineTime);
		                    $($(rows[2]).find('.col')[3]).find('p').text(val.HostCosts);
		                    break;
		                case 2:
		                	$($(rows[1]).find('.col')[1]).find('p').text(val.HostNum);
		                    $($(rows[1]).find('.col')[2]).find('p').text(val.HostOnlineTime);
		                    $($(rows[1]).find('.col')[3]).find('p').text(val.HostCosts);
		                    break;
		                case 3:
		                    $($(rows[0]).find('.col')[1]).find('p').text(val.HostNum);
		                    $($(rows[0]).find('.col')[2]).find('p').text(val.HostOnlineTime);
		                    $($(rows[0]).find('.col')[3]).find('p').text(val.HostCosts);
		                    break;
		            }
		            tNums += parseInt(val.HostNum);
		            tTimes += parseInt(val.HostOnlineTime);
		            tCosts += parseInt(val.HostCosts);
		        })
		        $(rows[3]).find('.col').find('p').text(tCosts);
		    });
    	}
	    if($('.user-info-two').length > 0){
 			getOverView();
	    }
    }
    //容器应用
    if($('.product-app-content').length > 0) {
    	$('.app-nav').find('.option').on('click', function(){
    		var index = $('.app-nav').find('.option').index($(this));
    		$(this).addClass('active').siblings('.option').removeClass('active');
    		$('.app-options').eq(index).css({'display': 'block'}).siblings('.app-options').css({'display': 'none'});
    	})
    }
})
