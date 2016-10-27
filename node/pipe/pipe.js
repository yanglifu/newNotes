var http = require('http');
var fs = require('fs');
var requests = require('request');

http.createServer(function(request,response){

	fs.createReadStream('147.jpg').pipe(response)

	console.log('操作中...')

	/*requests('147.jpg').pipe(response);*/

})
.listen(8222)