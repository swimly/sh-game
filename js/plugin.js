//工具函数：获取滚动条的位置
function GetPageScroll(){
	var x, y; 
	if(window.pageYOffset){    // all except IE    
		y = window.pageYOffset;    
		x = window.pageXOffset; 
	} else if(document.documentElement && document.documentElement.scrollTop) {    // IE 6 Strict    
		y = document.documentElement.scrollTop;    
		x = document.documentElement.scrollLeft; 
	} else if(document.body) {    // all other IE    
		y = document.body.scrollTop;    
		x = document.body.scrollLeft;   
	} 
	return {X:x, Y:y};
}
//插件开始
;(function($) {
    $.fn.extend({
        //首页banner插件
        Banner: function(options) {
			//设置默认值
			var defaults={
				index:0,
				speed:100,
				delay:7000,
				effect:"linner",
				item:".banner-item",
				phoneImg:["img/banner.jpg","img/banner.jpg","img/banner.jpg","img/banner.jpg","img/banner.jpg"],
				tabBg:"img/banner.jpg"//如果背景不变的话，直接填字符串，如果多张背景切换，则填数组
			}
			var options=$.extend(defaults,options);
            //遍历匹配元素的集合
            return this.each(function() {
				var o=options;
				var obj=$(this);
				var items=$(o.item,obj);
				var phone=$(window).width()<=600?true:false;
				function init(){
					if(phone){
						items.width($(window).width())
						items.each(function(i,ele){
							$(this).html('<img src='+o.phoneImg[i]+'>')
						})
						o.delay=3000;
						obj.width(items.width()*items.length).addClass("phone");
					}else{
						if(typeof o.tabBg=="string"){
							if(o.tabBg.search("#")==0){
								obj.css("background-color",o.tabBg);
							}else{
								obj.css("background","url("+o.tabBg+")");
							}
							items.each(function(index,ele){
								var itemobj=$(".animated",$(this));
								itemobj.hide()
							})
						}else{
							items.each(function(index,ele){
								var bg="url("+o.tabBg[index]+")";
								$(this).css("background",bg);
								var itemobj=$(".animated",$(this));
								itemobj.hide()
							})
						}
					}
				}
				init();
				function change(i){
					if(phone){
						obj.css("margin-left",-$(window).width()*o.index)
					}else{
						items.eq(i).fadeIn(o.speed).siblings().fadeOut(o.speed);
						var itemc=$(".animated",items.eq(i));
						var sibitem=$(".animated",items.eq(i).siblings());
						itemc.each(function(index,ele){
							var _this=$(this);
							setTimeout(function(){
								_this.fadeIn(1000).addClass(_this.attr("entry"))
							},$(this).attr("delay"))
							setTimeout(function(){
								_this.removeClass(_this.attr("entry")).addClass(_this.attr("leave"))
							},o.delay-_this.attr("delay")-500)
							setTimeout(function(){
								_this.removeClass(_this.attr("leave")).hide()
							},o.delay)
						})
					}
				}
				change(o.index)
				setInterval(function(){
					if(o.index<items.length-1){
						o.index++;
					}else{
						o.index=0;
					}
					change(o.index)
				},o.delay)
            });
        },
        //导航二级菜单显示隐藏
        Shows: function(options) {
			//设置默认值
			var defaults={
				showobj:"",
				speed:0
			}
			var options=$.extend(defaults,options);
            //遍历匹配元素的集合
            return this.each(function() {
				var o=options;
				var obj=$(this);
				var timer=null;
				obj.hover(function(){
					$(this).children(o.showobj).show()
					$(this).siblings().children(o.showobj).hide()
				},function(){
					var _this=$(this);
					timer=setTimeout(function(){
						_this.children(o.showobj).hide()
					},o.speed)
				})
				$(o.showobj).hover(function(){
					clearTimeout(timer)
				},function(){
					var _this=$(this);
					timer=setTimeout(function(){
						_this.hide()
					},o.speed)
				})
				
            });
        },
       	//导航二级菜单显示隐藏
        ScrollFix: function(options) {
			//设置默认值
			var defaults={
				className:"",
				y:0
			}
			var options=$.extend(defaults,options);
            //遍历匹配元素的集合
            return this.each(function() {
				var o=options;
				var obj=$(this);
				$(window).scroll(function(event){
					var top=GetPageScroll().Y;
					if(top>=o.y){
						obj.addClass(o.className);
					}else{
						obj.removeClass(o.className)
					}
				})
            });
        }
    });
})(jQuery); 