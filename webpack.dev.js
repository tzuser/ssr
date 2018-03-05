const path=require('path');
const webpack=require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');//html生成
const config=require('./webpack.config.js');

config.plugins.push(
	new webpack.HotModuleReplacementPlugin()//热加载
)

//获取本机ip
function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
}

let devConfig={
	context:path.resolve(__dirname,'src'),
	devtool: 'eval-source-map',
	devServer: {
		contentBase: path.resolve(__dirname,'build/'),
		inline:true,
		hotOnly:true,
		open : true,
		host: getIPAdress(),//localhost
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