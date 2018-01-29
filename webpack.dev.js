const path=require('path');
const webpack=require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');//html生成
const config=require('./webpack.config.js');

config.plugins.push(
	new webpack.HotModuleReplacementPlugin()//热加载
)

let devConfig={
	context:path.resolve(__dirname,'src'),
	devtool: 'eval-source-map',
	devServer: {
		contentBase: path.resolve(__dirname,'build/'),
		inline:true,
		hotOnly:true,
		open : true,
		host: '192.168.1.106',
		port: 8900,
		historyApiFallback:true,
		watchOptions: {//监听配置变化
			aggregateTimeout: 300,
			poll: 1000
		},
   	},
	resolve:{extensions:['.js','.jsx','.less','.scss','.css']},
}

module.exports=Object.assign({},config,devConfig)