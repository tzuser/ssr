const config=require('./webpack.config.js');
const path=require('path');
const {ReactLoadablePlugin}=require('react-loadable/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

let buildConfig={

}
let newPlugins=[
    new CleanWebpackPlugin(['./build']),
    new CopyWebpackPlugin([
      {from:path.join(__dirname,'./static'),to:'static'}
    ]),
	new ReactLoadablePlugin({
	      filename: './build/react-loadable.json',
	})	
]

config.plugins=config.plugins.concat(newPlugins);

module.exports=Object.assign({},config,buildConfig)