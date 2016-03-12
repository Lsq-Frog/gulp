$(document).ready(function() {
	if($('#start').length > 0 && $('#end').length > 0){
		$('#start').on('click', function(){
			$(this).addClass('active');
		})
		$('#end').on('click', function(){
			$(this).addClass('active');
		})
		var start = {
		    elem: '#start',
		    format: 'YYYY/MM/DD',
		    min: laydate.now(), //设定最小日期为当前日期
		    max: '2099-06-16 23:59:59', //最大日期
		    istime: true,
		    istoday: false,
		    choose: function(datas) {
		        end.min = datas; //开始日选好后，重置结束日的最小日期
		        end.start = datas //将结束日的初始值设定为开始日
		        console.log(11111);
		    }
		};
		var end = {
		    elem: '#end',
		    format: 'YYYY/MM/DD',
		    min: laydate.now(),
		    max: '2099-06-16 23:59:59',
		    istime: true,
		    istoday: false,
		    choose: function(datas) {
		        start.max = datas; //结束日选好后，重置开始日的最大日期
		    }
		};
		laydate(start);
		laydate(end);
	}
	if($('.login-box').length > 0){
		!function(a, b) {
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
		$(window).resize(function(){
			setLoginPos();
		})
		var setLoginPos = function(){
			var loginbox = $('.login-box');
			var bodyW = $('body').width();
			var bodyH = $('body').height();
			var loginboxW = loginbox.width();
			var loginboxH = loginbox.height(); 
			loginbox.css({'left': (bodyW-loginboxW)/2, 'top': (bodyH-loginboxH)/2})
		}
		setLoginPos();
		$('.btn').on('click', function(){
			$(this).addClass('active').siblings().removeClass('active');
			if($(this).hasClass('login-by-account')){
				$('.box').animate({'marginLeft': 0}, {queue:false, duration:400,complete:function(){}});
			}else {
				$('.box').stop().animate({'marginLeft': '-350px'}, {queue:false, duration:400,complete:function(){}});
			}
		})
		var obj = new WxLogin({
			id:"login_container",
			appid: "wx06ffb7b4e9912fca",
			scope: "snsapi_login",
			redirect_uri: "http://ghostcloud.cn/weixin/login/callback",
			state: "",
			style: "",
			href: ""
		});
	}
})