

var http = require('http')
var	querystring =  require('querystring')

var postData = querystring.stringify({
	'content': "老师讲的还是可以的",
	'cid': 348
})

var options = {
	'hostname' : 'www.imooc.com',
	'port': 80,
	'path':'/course/docomment',
	'method':'POST',
	'headers':{
		'Accept':'application/json, t ext/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8
		Cookie:imooc_uuid=b85d6a17-0f79-4909-bbba-f7a87faae7cf; imooc_isnew_ct=1465872001; PHPSESSID=0cql84rnd6hqq22fcoh87su1r5; loginstate=1; apsid=RmNmU1NGIyZDU1MzYxM2M0MDU5ZWQxODhjZTY4NWIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjY0OTAyNwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4NjMzOTI2ODlAcXEuY29tAAAAAAAAAAAAAAAAAAAAADc5Mjg4MTU2NjcxYWUyY2FlYjNhN2VhYjMyYzNjYzI4sD9hV7A%2FYVc%3DMT; last_login_username=863392689%40qq.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1465872000,1465954133,1465968934,1465991080; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1465991853; IMCDNS=0; imooc_isnew=2; cvde=57613faa5ba1c-14
		Host:www.imooc.com',
		'Origin:http':'//www.imooc.com',
		'Referer:http':'//www.imooc.com/comment/348',
		'User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36
		X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options,function(res){
	console.log('Status: ' + res.statusCode)    // 状态码
	console.log('headers: ' + JSON.stringify(res.headers))

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
	})
	res.end('end',function(){
		console.log('评论完毕！')
	});

});

	req.on('error',function(e){
		console.log('Error: ' +e.messsage)
	})

	req.write(postData)

	req.end()