var path = require('path');

var webpack = require('webpack');


var HtmlWebpackPlugin = require('html-webpack-plugin');   /*  html-webpack-plugin插件，重中之重，webpack中生成HTML的插件 */

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var config = {
		entry: {
			index:"./app/hello.js"
		},
		output: {
	    	path: "build",  /*发布的目录*/
	    	/*publicPath:"build",  */       /*网站运行时的访问路径*/
	    	minimize : true,
	    	filename: '[name].js'	/*  输出文件  */
		},
	    module: { // 加载器配置
	    	loaders: [
	    		//test 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx 
	    		//加载模块 "babel" 是 "babel-loader" 的缩写
	    		{test: /\.js$/,loaders: ['babel'],exclude:/node_modules/},
	    		{test: /\.jsx?$/,loader: 'babel',exclude:/node_modules/,query:{presets:['es2015','react']}}, 
	    		{test: /\.css$/,loader: 'style!css'},
	    		{test: /\.scss$/,loader: 'style!css!sass'},
	    		{test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
	    		 /*配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才
					使用 url-loader 来映射到文件，否则转为data url形式）。 */
					/*拿最后一个 url-loader 来说，它会将样式中引用到的图片转为模块来处理，使用该加载器需要先进行安
					* npm install url-loader -save-dev */
	      	]
	  	},
	  	plugins: [
				/*new htmlWebpackPlugin({
  				title : 'react1 demo laugh',
  				template : path.resolve(__dirname, 'templates/index.ejs'),
  				inject : 'body'
				})*/

		  	/*new webpack.optimize.CommonsChunkPlugin({
	            name: 'common', // 将公共模块提取，生成名为`vendors`的js
	            chunks: ['index'], //提取哪些模块共有的部分
	            minChunks: 1 // 提取至少1个模块共有的部分
	        }),*/

		  	/*new ExtractTextPlugin("[name].css"),*/
		  	new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML*/
	            favicon: './app/1.ico', //favicon路径，通过webpack引入同时可以生成hash值
	            template: './templates/index.ejs', //html模板路径
	            filename: './list.html', //生成的html存放路径，相对于path
	            inject: true, //js插入的位置，true/'head'/'body'/false
	            hash: true, //为静态资源生成hash值
	            chunks: ['common',"index"],//需要引入的chunk，不配置就会引入所有页面的资源
	            minify: { //压缩HTML文件    
	                removeComments: true, //移除HTML中的注释
	                collapseWhitespace: true //删除空白符与换行符
	            }
        	})
	  	],
		/* 使用webpack-dev-server 提高开发效率*/
	
		devServer: {
			contentBase: './',
			host: 'localhost',
			port: 8896, //默认8080
			inline: true, //可以监控js变化
			hot: true, //热启动
		}
};
module.exports = config;
