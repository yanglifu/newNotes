var url = 'http://news.sina.com.cn/';
var http = require('http');
	http.get(url,function(response){
		var _html = ''
		response.on('data',function(data){
			_html += data
		})

		response.on('end',function(){
			console.log(_html)
		})
	}).on('error',function(){
		console.log('error')
	});