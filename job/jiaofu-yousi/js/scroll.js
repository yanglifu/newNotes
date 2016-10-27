$(function(){
	var out = $(".box")[0];
	var inner = $(".inner",out)[0];
	var scroll = $(".scroll")[0];
	var btn = $(".btn",scroll)[0];
	var outH = out.offsetHeight;  //盒子的高度
	var innerH = inner.offsetHeight; // 内容的高度
	var scrollH = scroll.offsetHeight; // 滚动条的高度
	var bl = innerH/outH;  // 内容的高度与盒子的高度的比列
	if(bl<=1){
		scroll.style.display="none";
	}
	var btnH = scrollH/bl;
	btn.style.height =btnH +"px";
	var yd = 10 ;  // 鼠标每次滚动的的值
	var y = 0;   // 按钮 初始 top 为 0
	btn.onmousedown=function(e){
 		var ev = e || window.event;
 		if (ev.preventDefault )
			ev.preventDefault(); //阻止默认浏览器动作(W3C)
		else
		ev.returnValue = false;//IE中阻止函数器默认动作的
 		var cy = ev.clientY;
 		var btnY = btn.offsetTop;
 		document.onmousemove=function(e){
 			var ev = e || window.event;
 			var nowy = ev.clientY;
 			y = nowy-cy+btnY;
 			if(y<=0){
 				y=0;
 			}
 			if(y >= (scrollH-btnH)){
 				y = scrollH-btnH; 
 			}
 			btn.style.top = y +"px";
 			inner.style.marginTop = -y*bl+"px";

 		}
 		document.onmouseup=function(){
 			document.onmousemove=null;
 		}
	}

		mouseWheel(out,upfun,downfun);
		out.onmouseover=function(){
			document.onkeydown=function(e){
				var ev = e||window.event;
				if (ev.preventDefault )
					ev.preventDefault(); //阻止默认浏览器动作(W3C)
				else
					ev.returnValue = false;//IE中阻止函数器默认动作的
				var key = ev.keyCode;
				if(key !=38 && key!=40){
					return;
				}
				if(key == 38){
					upfun();
				}
				if( key == 40){
					downfun();
				}
			}
		}
		out.onmouseout=function(){
			document.onkeydown=null;
		}
		function upfun(){
			y-=yd;
	 			if(y<=0){
	 				y=0;
	 			}
	 			if(y >= (scrollH-btnH)){
	 				y = scrollH-btnH; 
	 			}			
			btn.style.top = y +"px";
			inner.style.marginTop = -y*bl+"px";	
		}
		function downfun(){
			y+=yd;
	 			if(y<=0){
	 				y=0;
	 			}
	 			if(y >= (scrollH-btnH)){
	 				y = scrollH-btnH; 
	 			}			
			btn.style.top = y +"px";
			inner.style.marginTop = -y*bl+"px";
		}
});