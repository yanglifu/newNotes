function shape(cope,canvas,cobj,xobj,xuanze){
    /* cope 盛放画布的盒子  canvas 画布 cobj 画笔  */
    this.cope = cope;
    this.canvas = canvas;
    this.cobj = cobj;  /*  画笔 */ 
    this.xobj=xobj;   /* 橡皮 */
    this.xuanze=xuanze;  /* 选择 */
    this.fillStyle = "#000";  /* 填充颜色 */
    this.bordercolor = "#000"; /* 边框颜色 */
    this.lineWidth = 1;         /* 线条宽度 */
    this.type = "stroke";      /* 默认无填充 */
    this.shaps = "line";       /* 默认画直线 */
    this.width = canvas.width;   /* 画布的宽 */
    this.height = canvas.height;  /* 画布的高 */
    this.history = [];           /* 历史记录 */
    this.selectFlag=true;        /* 开关 */
    this.xuanze=xuanze;
	this.arr=[];
    this.flag = false;   /*  小画板的开关 */
    this.pen();
}

shape.prototype={
    init:function(){
        // 初始化
        this.xobj.css("display","none");
        this.xuanze.css("display","none");
        if (this.temp) {
            this.history.push(this.cobj.getImageData(0, 0, this.width, this.height));
            this.temp = null;
        }
        this.cobj.fillStyle = this.fillStyle;
        this.cobj.strokeStyle = this.bordercolor;
        this.cobj.lineWidth = this.lineWidth;
    },
    /* 直线 */
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.closePath();
        this.cobj.stroke();
    },
    /* 方形 */
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj.closePath();
        this.cobj[this.type]();
    },

    /* 圆 */
    circle: function (x,y,x1,y1) {
        /*  */
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,Math.PI*2);
        this.cobj.closePath();
        this.cobj[this.type]();
    },
    /* 五角星 */
    five:function(x,y,x1,y1){
        this.init();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r2=r/2;
        this.cobj.beginPath();
        this.cobj.moveTo(r+x,y);
        for(var i=0;i<10;i++){
            if(i%2==0){
                this.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r,y+Math.sin(i*36*Math.PI/180)*r);
            }else{
                this.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r2,y+Math.sin(i*36*Math.PI/180)*r2);
            }
        }
        this.cobj.closePath();
        this.cobj[this.type]();
    },
    /* 画笔 */
    pen:function(){
        var that = this;
        that.cope.onmousedown = function(e){
            that.init();  /* 初始化 */
            that.flag = true;
            that.cobj.beginPath();
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.cobj.moveTo(startx,starty);  /*  开始点  */
            that.cope.onmousemove = function(e){
                /* 清空画布 */
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that.cobj.lineTo(endx,endy);
				var dataobj = {a:endx,b:endy};
                that.cobj.stroke();     /*  绘制 */
				that.arr.push(dataobj);
                that.c2();
            };
            that.cope.onmouseup = function(){
                that.flag = false;
                console.log("抬起鼠标",that.flag);
                that.c2();
                that.arr=[];
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                console.log("大画板的记录",that.history.length);
                that.cope.onmousemove = null;
                that.cope.onmouseup = null;
            }
        }
    },
    draw:function(){
        var that = this;
        that.cope.onmousedown = function (e) {
            that.init();  /* 初始化 */
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.cope.onmousemove = function(e){
                /* 清空画布 */
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that[that.shaps](startx,starty,endx,endy);
            }
            that.cope.onmouseup = function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.cope.onmousemove = null;
                that.cope.onmouseup = null;
            }
        }
    },
    xp:function(xobj,w,h){
        var that=this;
        xobj.css({
            width:w,
            height:h,
            display:"block"
        });
        that.cope.onmousemove=function(e){
            var lefts= e.offsetX-w/2;
            var tops= e.offsetY-h/2;
            if(lefts<=0){
                lefts=0;
            }
            if(lefts>=(that.width-w)){
                lefts=that.width-w;
            }
            if(tops<=0){
                tops=0;
            }
            if(tops>=(that.height-h)){
                tops=that.height-h;
            }
            xobj.css({
                left:lefts,
                top:tops
            });
            console.log(tops,lefts);
        };
        that.cope.onmousedown=function(){
            that.cope.onmousemove=function(e){
                var lefts= e.offsetX-w/2;
                var tops= e.offsetY-h/2;
                if(lefts<=0){
                    lefts=0;
                }
                if(lefts>=(that.width-w)){
                    lefts=that.width-w;
                }
                if(tops<=0){
                    tops=0;
                }
                if(tops>=(that.height-h)){
                    tops=that.height-h;
                }
                xobj.css({
                    left:lefts,
                    top:tops
                });
                console.log(w);
                that.cobj.clearRect(lefts,tops,w,h);
            };
            that.cope.onmouseup=function(){
                xobj.css({
                    display:"none"
                });
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.cope.onmousemove=null;
                that.cope.onmouseup=null;
            }

        }
    },
    select:function(xuanze){
        var that=this;
        that.init();
        that.cope.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY,minx,miny, w,h;
            that.init();
            that.cope.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                xuanze.css({
                    display:"block",
                    left:minx,
                    top:miny,
                    width:w,
                    height:h
                });
            }
            that.cope.onmouseup=function(){
                that.cope.onmouseup=null;
                that.cope.onmousemove=null;
                that.temp=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.cobj.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,xuanze);
            }
        }

    },
    drag:function(x,y,w,h,xuanze){
        var that=this;
        that.cope.onmousemove=function(e){
            var ox = e.offsetX;
            var oy = e.offsetY;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.cope.style.cursor="move";
            }else{
                that.cope.style.cursor="default";
            }
        }

        that.cope.onmousedown=function(e){
            var ox = e.offsetX;
            var oy = e.offsetY;
            var cx =ox-x;
            var cy =oy-y;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.cope.style.cursor="move";
            }else{
                that.cope.style.cursor="default";
                return;
            }

            that.cope.onmousemove=function(e){

                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length!==0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-cx;
                var tops=endy-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w;
                }

                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h;
                }
                xuanze.css({
                    left:lefts,
                    top:tops
                });
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.temp,lefts,tops);
            };
            that.cope.onmouseup=function(){
                that.cope.onmouseup=null;
                that.cope.onmousemove=null;
                that.drag(x,y,w,h,xuanze);
            }
        }
    },
    c2:function(){
        var that = this;
        var c = document.getElementById("c2");
        var ctx = c.getContext("2d");
        var arr_history = [];   // 小画板历史记录
        if(that.flag){
            ctx.beginPath();
            ctx.lineWidth=5;    //宽度
            ctx.strokeStyle="red";  //设置或返回笔触的颜色
            var arr = that.arr;
            var num=arr.length;
            for(var i=0;i<num;i++){
                if(i==0){
                    ctx.moveTo(arr[0].a,arr[0].b);
                }
                ctx.lineTo(arr[i].a,arr[i].b);
            }
            ctx.stroke();
        }else {
            arr_history.push(ctx.getImageData(0,0,900,600));
            ctx.clearRect(0,0,900,600); /* 清空画布 */
            console.log("小画板的历史记录",arr_history.length);
            if(arr_history.length>0){
                ctx.putImageData(arr_history[arr_history.length-1],0,0);
            }
        }
    }
}