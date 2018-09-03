define(["parabola", "jquery", "jquery-cookie"], function(parabola,$) {
	var main = function() {
		$(function() {
			$(".a2").on('mousemove',function() {
				$(".img1").css({
					display: 'block'
				})
                $(".a2").on('mouseout',function() {
					$(".img1").css({
						display: 'none'
					})
				})
				
		
			});

			$(".a5").on('mousemove',function() {
				$(".notice").css({
					display: 'block'
				})
                $(".a5").on('mouseout',function() {
					$(".notice").css({
						display: 'none'
					})
				})
				
		
			});
        //全部商品分类下面侧边栏
			$("li").on('mousemove',function() {
				$(".sidebar").css({
					display: 'block'
				})
                $("#banner").on('mousemove',function() {
					$(".sidebar").css({
						display: 'none'
					})
				})
				
		
			});
        //banner
		//1、找到当前页面上所有数字按钮
			var aBtns = $("#banner").find("ol").find("li");
				var oUl = $("#banner").find("ul");
				var aLis = oUl.find("li");


		//2、设置iNow，代表当前要显示的图片的下标
			var iNow = 0;
			var timer = null; //记录定时器的标识

			aBtns.hover(function(){
				//点击按钮的时候，获取当前要切换的图片的下标
			    iNow = $(this).index();
				//切换图片
				tab();
					
			})

			function tab(){
				//既要切换按钮，还要切换图片
				aBtns.attr('class', '');
				aBtns.eq(iNow).attr("class", 'active');

				oUl.stop().animate({left: -990 * iNow}, 0, function(){

					//第六张图片运动结束的时候，直接切回第一张图片
					if(iNow == aBtns.size()){
						oUl.css('left', 0);
						iNow = -1;
					}
				});
			}

			function timerFunc(){
				iNow++;
				
				tab();

				//对当前iNow的值进行判断
				if(iNow == aBtns.size()){
					aBtns.eq(0).attr('class', 'active');
				}
			}


			timer = setInterval(timerFunc, 1500);

			oUl.hover(function(){
					clearInterval(timer);
			}, function(){
				    timer = setInterval(timerFunc, 1500);
			
            })


            
        /*
			eval json格式的字符串转成字符串
			转换的字符串，必须最外层是数组，数组元素是对象
		*/
		
		$(function() {
			

            //购物车数量
			function goodsnum() {
				var str = $.cookie('goods');
				if(str){
					var arr = eval(str);
					var sum = 0;
					for(i = 0; i < arr.length; i++){
						sum += arr[i].num;
					}
					$('.sc_num').html(sum);
					$('.i').html(sum);
				}
				
			};
			goodsnum();
	        //购物车显示商品
			function displaygoods() {
				$.ajax({
					url: 'data/data.json',
					success:function(arr) {
						$(".sc_right ul").html("");
						var cookie_arr = eval($.cookie('goods'));
						for(var i = 0; i < cookie_arr.length; i++){
							$(`<li>
									<div class = "sc_goodsPic">
										<img src="images/${arr[cookie_arr[i].id].img}" alt="">
									</div>
									<div class = "sc_goodsTitle">
										<p>The north face乐斯菲斯2018春夏新品男子短袖T恤NF0A3CJJJK31</p>
									</div>
									
									<div class = "sc_goodsNum">商品数量:<span class = 'minus'>-</span> ${cookie_arr[i].num} <span class = 'add'>+</span></div>
									<a href = '../description.html' class = "sc_goodsBtn">购买</a>
								</li>`).appendTo($(".sc_right ul"));
						}

					}
					
				})
				
				
			};

	        
			$('.shoppingcar').on('click',function() {
				$('.sc_right').stop().animate({
					right: 0
				});
			});
			$(document).on('mousedown',function() {
					$('.sc_right').stop().animate({
					right: -200
				    });
			    });

			/*
			    JQ事件
				mouseenter 移入
				mouseleave 移出

			*/
			$(".sc_right").mouseenter(function(){
				$(this).stop().animate({
					right: 0
				})
				displaygoods();
				
			});
		});


		  


			
			
			
		





		})
		
	}
	return {
		main: main
	}
})