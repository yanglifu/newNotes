window.onload=function(){
	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
		/* ie8 ֧�� placeholder */
		$("input").placeholder();
	
	 	/* ie8 �� �������Ⱦ ����ͼ������ */
		var head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		style.type = 'text/css';
		style.styleSheet.cssText = ':before,:after{content:none !important}';
		head.appendChild(style);
		setTimeout(function() { head.removeChild(style); }, 0);
	}
}