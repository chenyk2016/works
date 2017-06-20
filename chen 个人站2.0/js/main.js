$(function(){
	//楼层导航条
	function floorScroll(){
		
		var navbarFlag=true;	//点击导航条不滚动
		$(window).scroll(function () {
			if (navbarFlag) {
				windowScrollFn();
			}
		});
		function windowScrollFn() {	
			console.log(1);
			var navBar=$("#floor_navbar");
			var windowScrollTop = $(window).scrollTop();
			if(windowScrollTop >= 1100){
				navBar.show();
				// console.log( $(document.body).scrollTop() );
				// console.log($(".floor").eq(0).offset().top );
				var currentId="qualitylife";
				$(".floor").each(function () {
					if (  windowScrollTop >= $(this).offset().top - 300 ) {
						currentId=$(this).attr("id");
					}
				});
				$('#floor_navbar a[href="#'+currentId+'"]').parent().addClass("ac").siblings().removeClass("ac");
			
			}else{
				navBar.hide();
			}
		}
			//点击跳转楼层
			//获取点击的href，根据$(id).offset().top改变$(window).scrollTop()
		$("#floor_navbar li").click(function () {
			navbarFlag = false;	
			$(this).addClass("ac").siblings().removeClass("ac");
			var clickHref=$(this).children().attr("href");
			var eleTop=$(clickHref).offset().top;
			var winTop=$(window).scrollTop();
			var speed=300;
			var step=Math.abs(eleTop-winTop)/(speed/30);
			step= eleTop>winTop ? step : -step;
			//console.log(step,eleTop,winTop)
			var timer = setInterval(function () {
				winTop+=step;
				if ( Math.abs(eleTop-winTop)<=Math.abs(step)) {
					//console.log(winTop,eleTop,step);
					winTop=eleTop;
					clearInterval(timer);
					navbarFlag = true;
				}

				$(window).scrollTop(winTop);
			},30);
		});
			//阻止a链接的默认跳转
		$("#floor_navbar li a").click(function (ev) {
			ev.preventDefault();
		});
			//初始化
		windowScrollFn();
	}
	//floorScroll();
	
	$(window).scroll(function () {
		if (  $(window).scrollTop() >= $(".skills").offset().top - 200 ) {
			console.log(1)
			skillsBarMove();
			$(window).off("scroll");
		}
	});


	//skillsBar滚动显示
	function skillsBarMove(fn){
		$(".bar_group_bar").each(function(){
			var _this=$(this);
			var tooltip=_this.find(".b_tooltip");
			var text=parseInt( tooltip.text() );
			var w=parseInt( _this.children(".b_bar").width() );
			var barBefore=_this.find(".b_bar_before");

			var left=text*w/100;

			barBefore.animate({"width":left},2000);
			tooltip.animate({"left":(left-tooltip.width()/2)},2000);
		});
		fn && fn();
	}


	//contact动画效果
	$(".form_input_container").click(function (ev) {
		$(this).addClass("ac").siblings().removeClass("ac");
		ev.stopPropagation();
	});
	$(document).click(function () {
		$(".form_input_container").removeClass("ac");
	});

	//project切换效果
	 $(".nav_wrap li").click(function (ev) {
	 	var target=ev.target;
	 	var $tabs=$(".project_tab");
	 	
	 	var targrtName=$(this).text().toLowerCase();
	 	if (targrtName == "all") {
	 		$tabs.removeClass("hide");
	 	} else {
	 		$tabs.each(function () {
		 		var _this=$(this);
		 		var label = _this.attr("data-label").toLowerCase();
		 		//console.log(label , targrtName)
		 		if (label == targrtName) {
		 			_this.removeClass("hide");
		 		} else {
		 			_this.addClass("hide");
		 		}
		 	});
	 	}
	 
	 });


});//$结束