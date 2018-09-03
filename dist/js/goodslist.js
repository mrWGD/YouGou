        /*
			eval json格式的字符串转成字符串
			转换的字符串，必须最外层是数组，数组元素是对象
		*/
		
		$(function() {
			//获取商品列表
			$.ajax({
				url: 'data/data.json',
				success:function(arr) {
					console.log(arr);
					for (var i = 0; i < arr.length; i++) {
						$(`<li>

		    					<a href="description.html">
		    					    <img src = "images/${arr[i].img}" alt=""/>
		    					    <h3>限时抢￥138</h3>
		    					    <p>The north face乐斯菲斯2018春夏新品男子短袖T恤NF0A3CJJJK31</p>
		    					</a>
		    					<span>￥138</span>
		    					<i>￥188</i>

		    					<button id = "${arr[i].id}"  class = 'sc_btn'>加入购物车</button>
	    				    </li>
                        `).appendTo($('.goods_box ul'));
					}
				}

		    });

            //点击加入购物车事件

			$('.goods_box').on('click', '.sc_btn', function() {
				var id = this.id;
				var first = $.cookie('goods') == null ? true : false;
				if(first){
					$.cookie('goods', `[{id:${id}, num:1}]`);

				}else{
					var str = $.cookie('goods');
					var arr = eval(str);
					var ifsame = false;

					for(var i = 0; i < arr.length; i++){
						if(arr[i].id == id){
							arr[i].num++;
							var cookiestr = JSON.stringify(arr);
							$.cookie('goods', cookiestr);
							ifsame = true;
							break;
						}
					}

					if(!ifsame){
						var obj = {id: id, num: 1};
						arr.push(obj);
						var cookiestr = JSON.stringify(arr);
						$.cookie('goods', cookiestr);

					}
				}
				goodsnum();
			});



		  

		
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
					$('.i ').html(sum);
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





		
	