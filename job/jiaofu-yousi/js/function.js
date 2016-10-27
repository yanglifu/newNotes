//1.获取类名的兼容函数
// FF : document.getElementsByClassName()
// IE8
		function checkClass(str,classname){  //判断元素class中是否包含指定的 class名 
			//参数： 获取元素的 class  指定的 class
			var newarr=str.split(" ");  // 将字符串以 空格为 标识  进行分割 形成一个数组
			for(var i=0;i<newarr.length;i++){ //遍历数组
				if(newarr[i]==classname){   // 判断元素的 class  的 多个值中是否包含我们所需要的值
					return true;
				}
			}
			return false;
		}

		function getClass(classname,obj){
			// classname "类名"  , obj 父容器 
			// 传人参数时， 第一个必须是 子类形参， 第二个可以省略 
			var obj=obj|| document; //只要有一个为真，他就为真，如果obj存在，就赋值给声明的obj,如果不存在，就把 document 赋值给声明的obj
			if(obj.getElementsByClassName){
				 return obj.getElementsByClassName(classname); // FF 下执行
			}else{			                                   // IE8 下 执行
				var alls=obj.getElementsByTagName("*");  	//获取所有元素
				var arr=[];
				for(var i=0;i<alls.length;i++){
					if(checkClass(alls[i].className,classname)){   //获取元素的  class
						arr.push(alls[i]);
					}
				}
			}
			return arr;	
		}	
	//	 var box=getClass("box")[0];  //获取父容器的class名  加下标  加下标  加下标  重要的说3边  记住....
	//	 var className=getClass("divs",box); // 参数说明  1 子元素名  2 为父元素的类名
//*****************************************************************************************	
//

//2操作对象内容 
//***********************************************************************************	
		function getText(obj,val){
			// obj 操作对象 ，  val 操作对象的内容
			if(val!=undefined){
				if(obj.textContent || obj.textContent==""){
					obj.textContent=val;
				}else{
					obj.innerText=val;
				}
			}else{
				if(obj.textContent){
					return obj.textContent;
				}else{
					return obj.innerText;
				}
			}
		}
//****3获取对象属性**************************************************************
		function getStyle(obj,stylename){
			// 操作对象  ， stylename  对象的属性
			if(window.getComputedStyle){
			    return	window.getComputedStyle(obj,null)[stylename];
			}else{
			    return	obj.currentStyle[stylename];
			}
		}
//******************************************************************	

// 4 获取元素的简化函数 "$"
//******************************************************************
//  /^\s*|\s*$/g 检测到字符串前后的空格
		function $(selector,obj){
			// 实参 selector 函数 或字符串  obj 父容器
			var obj = obj || document;
			if(typeof selector == "string"){
				selector=selector.replace(/^\s*|\s*$/g,"");//去掉 实参 selector 前后的空格
				if(selector.charAt(0) == "."){   // 截取字符串的第一位 判断
					return getClass(selector.slice(1),obj); //截取字符串第二位到最后
				}else if(selector.charAt(0) == "#"){
					return obj.getElementById(selector.slice(1));

				}else if(/^[a-z|1-10]{1,10}$/g.test(selector)){  //正则表达式
					return obj.getElementsByTagName(selector);
				}
			}else if(typeof selector == "function"){  //  传入的实参 selector 是一个函数 加载window.onload方法
					window.onload=function(){
						selector();
					}
				}
		}


// 5 获取对象的子节点
//type值  a:只获取对象的子元素节点  b:获取对象子元素节点 和子文本节点
		function getChilds(obj,type){
			var type= type || "a";  // type 没有赋值时  默认获取对象的子元素节点
			var newarr=[];
			for(var i=0;i<obj.childNodes.length;i++){
				if(type == "a"){
					if(obj.childNodes[i].nodeType == 1){
						newarr.push(obj.childNodes[i]);
					}
				}else if(type == "b"){
					if(obj.childNodes[i].nodeType == 1 || obj.childNodes[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" && obj.childNodes[i].nodeType != 8){
						newarr.push(obj.childNodes[i]);
					}
				}		
			}
			return newarr;
		}
		
//6.获取第一个子元素节点
		function getFirst(obj){
			return getChilds(obj)[0];
		}

//7.最后一个子元素节点
		function getLast(obj){
			return getChilds(obj)[getChilds(obj).length-1];
		}

//7.获取指定的子元素节点
		function getNum(obj,num){
			return getChilds(obj)[num];
		}

//8. 获取下一个兄弟节点
		function getDown(obj){
			var	down = obj.nextSibling;
			while(down.nodeType==3 || down.nodeType==8){
				down=down.nextSibling;
				if(down==null){
					return false;
				}
			}
			return down;
		}


//9. 获取上一个兄弟节点	
		function getUp(obj){
		var	up = obj.previousSibling;
			if(up==null){
				return false;
			}
			while(up.nodeType==3 || up.nodeType==8){
				up=up.previousSibling;
				if(up==null){
					return false;
				}
			}
			return up;
		}

//10. 要插入到某个对象之后
//     newobj 要追加的对象
//		obj    在哪个对象之前 
// 对象共有的方法一般是加在原型上的。而原型只能给构造函数添加，
// 所以共公的方法是添加到对象的构造函数的原型上的。
//this : 指的是最终调用这个方法的对象。而这个对象是通过构造函数new出来的对象。
		Object.prototype.insertAfter=function(newobj,obj){
			var down=getDown(obj); //获取obj的下一个兄弟节点
			if(down){	//如果这个兄弟节点存在
				this.insertBefore(newobj,down);
				//就把 newobj 插入到这个兄弟节点的前面（也就是obj对象的后面） 
			}else{ // 如果这个兄弟节点不存在，表示obj就是最后一个节点了
				this.appendChild(newobj);
				// 直接追加到父对象的后面
			}
		}
//11 节点轮播
	function nodeLunbo(imgbox,imgleft,imgright){
		// imgbox 轮播盒子   imgleft 左边按钮  imgright 右边按钮 
        var time=setInterval(moveLeft,2000);
        imgleft.onclick=function(){
            moveLeft();
        }
        imgright.onclick=function(){
            moveRight();
        }
        // 左移的函数
        function moveLeft(){
            animate(imgbox,{left:-190},1000,Tween.Linear,function(){
                 imgbox.style.left="0px";
                var first=getFirst(imgbox); 
                imgbox.appendChild(first);
                
            });
        }
        // 右移函数
        function moveRight(){
            var last=getLast(imgbox);
            imgbox.style.left="-190px";
            imgbox.insertBefore(last,getFirst(imgbox));
            animate(imgbox,{left:0},1000,Tween.Linear);
        }
        imgleft.onmouseover=imgright.onmouseover=function(){
            clearInterval(time);
        }
        imgleft.onmouseout=imgright.onmouseout=function(){
            time=setInterval(moveLeft,2000);
        }
    }
//12 鼠标滚轮事件
		
        function mouseWheel(obj,upfun,downfun){
        	// obj 对象 一般情况为 document  unfun 当鼠标向上滚动时，执行的函数
        	//   downfun 当鼠标向下滚动时，执行的函数
           	//添加滚轮事件的兼容
        	if(obj.attachEvent){
				    obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
				}else if(obj.addEventListener){
				    obj.addEventListener("mousewheel",scrollFn,false);
				    //chrome,safari -webkit-
				    obj.addEventListener("DOMMouseScroll",scrollFn,false);
					//firefox -moz-
                  	}
            function scrollFn(e){
              	var ev=e||window.event;
               	 	if(ev.detail==-3||ev.wheelDelta==120){
                  		if(upfun){
                  				upfun.call(this);
                  			}
                	}
               		if(ev.detail==3||ev.wheelDelta==-120){
                		if(downfun){
                  				downfun.call(this);
                  			}
                }
            var ev= e|| window.event;    
            if (ev.preventDefault)
				ev.preventDefault(); //阻止默认浏览器动作(W3C)
			else
				ev.returnValue = false;//IE中阻止函数器默认动作的方式
            }
        }
        
		//判断某个元素是否包含有另外一个元素
		 function contains (parent,child) {
		  if(parent.contains){
		     return parent.contains(child) && parent!=child;
		  }else{
		    return (parent.compareDocumentPosition(child)===20);
		  }
		 }

		//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
		  function checkHover (e,target) {
		   if(getEvent(e).type=="mouseover"){
		      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
		    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
		   }else{
		    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
		    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
		    }
		  }
// 13 鼠标移入移出事件
		/*
		  obj   要操作的对象
		  overfun   鼠标移入需要处理的函数
		  outfun     鼠标移除需要处理的函数
		*/
		function hover (obj,overfun,outfun) {
		    if(overfun){
		      obj.onmouseover=function  (e) {
		        if(checkHover(e,obj)){
		           overfun.call(obj,[e]);
		        }
		      }
		    }
		    if(outfun){
		      obj.onmouseout=function  (e) {
		        if(checkHover(e,obj)){
		           outfun.call(obj,[e]);
		        }
		      }
		    }
		}
		 function getEvent (e) {
		      return e||window.event;
		 }
		/********************************/
// 14 解决同一事件添加处理程序的兼容问题
		function addEvent(obj,event,fun){
			//  参数 obj 对象 event 事件  event列："click" fun -function(e){}
			if(obj.addEventListener){
				return obj.addEventListener(event,fun,false);
			}else{
				return obj.attachEvent("on"+event,fun);
			}
		}

// 15 解决同一事件移除处理程序的兼容问题
		function removeEvent(obj,event,fun){
			if(obj.removeEventListener){
				return obj.removeEventListener(event,fun,false);
			}else{
				return obj.detachEvent("on"+event,fun);
			}
		}

// 16 阻止事件流的兼容函数
		// obj:事件对象
		function stopEvent(obj){
			if(obj.stopPropagation){
				obj.stopPropagation();  //FF
			}else{
				obj.cancelBubble=true;   //IE
			}
		}

// 17  阻止浏览器的默认行为的兼容函数
		function stopClient(obj){
			if (obj.preventDefault){
				obj.preventDefault(); //阻止默认浏览器动作(W3C)
			}else{
				obj.returnValue = false;//IE中阻止函数器默认动作的方式
			}
					
		}
//  18  检测数据类型的方法
		function isType(type){
			// type  需要检测的值
		var type=Object.prototype.toString.call(type);
		if(type == '[object Array]'){
			return "Array";
		}
		if(type == '[object Number]'){
			return "Number";
		}
		if(type == '[object String]'){
			return "String";
		}
		if(type == '[object Function]'){
			return "Function";
		}
		if(type == '[object Object]'){
			return "Object";
		}
		if(type == '[object Null]'){
			return "Null";
		}
		if(type == '[object Boolean]'){
			return "Boolean";
		}
	}				
// 19 浮动窗口			
function piao(div,close,t,Lefts,Tops){
			// 参数说明 div 浮动的元素 close 点击关闭元素  t 时间 Lefts x轴每次滑动的距离  Tops y轴每次滑动的距离

			var time = setInterval(move,t);
			div.onmouseover=function(){
				clearInterval(time);
			}
			close.onclick=function(){
				div.style.display="none";
			}
				var tLeft = Lefts;
				var tTop = Tops;
				var bWidth = document.documentElement.clientWidth;
				var bHeight = document.documentElement.clientHeight;
				window.onresize=function(){
				 bWidth = document.documentElement.clientWidth;
				 bHeight = document.documentElement.clientHeight;	
				}
			function move(){
				var asLeft = div.offsetLeft;
				var asTop = div.offsetTop;
				var asWidth = div.offsetWidth;
				var asHeight = div.offsetHeight;
				var newLeft = asLeft+tLeft;
				var newTop = asTop+tTop; 
				
				if((bHeight-asHeight)<asTop){
					newTop=bHeight-asHeight;
					tTop*=-1;
				}
				if(asTop<0){
					newTop=0;
					tTop*=-1;
				}
				if((bWidth-asWidth)<newLeft){
					newLeft=bWidth-asWidth;
					tLeft*=-1;
				}
				if(asLeft<0){
					newLeft=0;
					tLeft*=-1;
				}
				div.style.top = newTop+"px";
				div.style.left = newLeft+"px";
			}
		}
				