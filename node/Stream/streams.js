/* 流 */

var fs = require('fs');  // 引入文件操作 模块

var readStream = fs.createReadStream('201.jpg');	//读取文件

var writeStream = fs.createWriteStream('./coty/201-copy.jpg');		//写文件

readStream.on('data',function(chunk){
	if(writeStream.write(chunk) === false){				// (由于数据读取速度 > 写入  )  判断读取的数据是否写入到文件 如果没有 则先暂停读取
		console.log('数据读取暂停...');
		readStream.pause();					//暂停读取
	}
	writeStream.write(chunk);
});

readStream.on('end',function(){
	console.log('文件写入完成...');
	writeStream.end()						// 终止写入文件操作
});

writeStream.on('drain',function(){			// 内存中读取的信息 写入完成,	则继续读取
	console.log('数据读取开始...');
	readStream.resume();			//继续读取	
});


