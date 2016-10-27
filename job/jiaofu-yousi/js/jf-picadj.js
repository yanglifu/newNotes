(function(){
var picAdj;
var browser_msg ={
    browser:navigator.appName,
    version:navigator.appVersion.substring(22,23)
};
if (browser_msg.browser == 'Microsoft Internet Explorer') {
        document.getElementsByClassName = function() {
            var tTagName = "*";
            if (arguments.length > 1) {
                tTagName = arguments[1];
            }
            if (arguments.length > 2) {
                var pObj = arguments[2]
            } else {
                var pObj = document;
            }
            var objArr = pObj.getElementsByTagName(tTagName);
            var tRObj = new Array();
            for ( var i = 0; i < objArr.length; i++) {
                if (objArr[i].className == arguments[0]) {
                    tRObj.push(objArr[i]);
                }
            }
            return tRObj;
        }
}
picAdj = function(){
   var obj = document.getElementsByClassName("exerimg");
   var obj2 = document.getElementsByClassName("exerconnectionimg");
   if(obj!=null && obj.length>0){
      for(var i=0;i<obj.length;i++){
         var getObj = obj[i];
         if(browser_msg.browser=="Microsoft Internet Explorer"){
            getObj.style.marginTop = Math.max(2*(4-parseInt(getObj.style.height)),0)+"px";
         }else{
            getObj.style.paddingBottom = "2px";
         }
       }
    }
}
//for Chrome && FireFox
if(window.addEventListener){
   if(document.readystate && document.readyState == "complete"){
      picAdj();
   }else{
      window.addEventListener("load",picAdj,false);
   }
}else{
//for MSIE
   var domChecker;
   domChecker = function(){
     if (!document.body){
        setTimeout(domChecker,50);
     }else{
        if(document.body.attachEvent){
          picAdj();
        }else{
          document.body.attachEvent("onload",picAdj);
                      } 

             }
      }
  domChecker();
}

})();
function answer_open(){
	var obj = document.getElementsByClassName("qjdQuickAnswer");
	if(obj!=null && obj.length>0){
		for(var i=0;i<obj.length;i++){
			var getObj = obj[i];
			getObj.style.display = "inline";
		}
	}
}
function answer_close(){
	var obj = document.getElementsByClassName("qjdQuickAnswer");
	if(obj!=null && obj.length>0){
		for(var i=0;i<obj.length;i++){
			var getObj = obj[i];
			getObj.style.display = "none";
		}
	}
}