var mongoose = require('mongoose')

var dataSchema = new mongoose.Schema({			// 	创建数据类型
	email : String, 
    name : String, 
    salt : String, 
    password : String 
});

exports.User = mongoose.model('User', dataSchema);

