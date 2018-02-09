const config=require('./webpack.config.js');
const path=require('path');
const {ReactLoadablePlugin}=require('react-loadable/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let buildConfig={

}
let newPlugins=[
    new CleanWebpackPlugin(['./build']),
    new CopyWebpackPlugin([
      {from:path.join(__dirname,'./static'),to:'static'}
    ]),
	new ReactLoadablePlugin({
	      filename: './build/react-loadable.json',
	}),
	new UglifyJsPlugin({
		uglifyOptions: {
		     ie8: false,
		     ecma: 8,
		 }
	}),
]

config.plugins=config.plugins.concat(newPlugins);

module.exports=Object.assign({},config,buildConfig)