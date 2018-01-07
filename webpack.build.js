const config=require('./webpack.config.js');
const path=require('path');
const {ReactLoadablePlugin}=require('react-loadable/webpack');
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MyPlugin =require('./MyPlugin');
let buildConfig={

}
let newPlugins=[
    new CleanWebpackPlugin(['./build']),
    new CopyWebpackPlugin([
      {from:path.join(__dirname,'./static'),to:'static'}
    ]),
	//文件缓存
	new OfflinePlugin({
	  ServiceWorker: {
	    events: true
	  },
	  AppCache:{ 
	  	events: true 
	  }
	}),
	new ReactLoadablePlugin({
	      filename: './build/react-loadable.json',
	}),
	new MyPlugin(),
	
]

config.plugins=config.plugins.concat(newPlugins);

module.exports=Object.assign({},config,buildConfig)