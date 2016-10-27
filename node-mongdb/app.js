var express = require('express')		// 加载 express 简洁灵活的node.js Web应用框架

var path = require('path')				 //  加载 path 模块

var mongoose = require('mongoose')		// 加载 mongoose 模块

var Data = require('./schema/data')	//	加载 数据模型

var data = Data.User;

var port = process.env.PORT || 3000		// 设置端口 也可以从控制台输入端口

var app = express()

mongoose.connect('mongodb://localhost/express-mongoose-demo')	//链接数据库  数据库名 test


app.set('views','./views/pages');				// 设置视图的根目录

app.set('view engine','jade')			// 设置模板引擎

app.use(express.static(path.join(__dirname,'bower_components')))	// 拼接路径  __dirname 当前路径 (注意2个下划线)

app.listen(port)						// 设置端口

console.log('start server...  '+port)         //	$ PORT=4000 node app.js 设置启动的端口号

app.get('/',function(request,response){	//	基于 express 编写路由
	data.find(function(err, doc) { 
        response.json(doc); 
    });
})

app.get('/list/:id',function(request,response){	//	基于 express 编写路由
	response.render('detail',{
		title:' 祥请页'
	})
})

app.get('/list',function(request,response){	//	基于 express 编写路由
	var user = new Movie({ 
        email : '1111@qq.com', 
        name : '1111' 
    }); 
    user.save(); 
    response.send('Data inited'); 
})

app.get('/admin',function(request,response){	//	基于 express 编写路由
	response.render('admin',{
		title:' 后台页面 '
	})
})




