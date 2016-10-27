var fs = require('fs');
fs.createReadStream('147.jpg').pipe(fs.createWriteStream('coty/147-pipe.jpg'));		//	copy 文件
