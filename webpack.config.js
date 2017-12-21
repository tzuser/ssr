const path=require('path');
const webpack=require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');//html生成
module.exports={
	entry: {
		main:path.join(__dirname,'./src/index.js'),
		vendors:['react','react-redux']
	},
	output:{
		path: path.resolve(__dirname,'build'),
		publicPath: '/',
		filename:'[name].js',
		chunkFilename:'[name].[id].js'
	},
	context:path.resolve(__dirname,'src'),
	module:{
		rules:[
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				exclude: /node_modules/,
				loader: require.resolve('url-loader'),
				options: {
				limit: 10000,
				name: 'static/media/[name].[hash:8].[ext]',
				},
			},
			{
				test:/\.(js|jsx)$/,
				exclude: /node_modules/,
				use:[{
					loader:require.resolve('babel-loader'),
					options:{
						presets:['env','react','stage-0'],
					},
				}]
			},
			{
	            test: /\.css$/,
	            exclude: /node_modules/,
	            use: [
	              require.resolve('style-loader'),
	              {
	                loader: require.resolve('css-loader'),
	                options: {
	                  importLoaders: 1,
	                },
	              },
	              {
	                loader: require.resolve('postcss-loader'),
	                options: {
	                  // Necessary for external CSS imports to work
	                  // https://github.com/facebookincubator/create-react-app/issues/2677
	                  ident: 'postcss',
	                  plugins: () => [
	                    require('postcss-flexbugs-fixes'),
	                    autoprefixer({
	                      browsers: [
	                        '>1%',
	                        'last 4 versions',
	                        'Firefox ESR',
	                        'not ie < 9', // React doesn't support IE8 anyway
	                      ],
	                      flexbox: 'no-2009',
	                    }),
	                  ],
	                },
	              },
	            ],
          }

		]
	},
	resolve:{extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']},
	plugins:[
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
		    'process.env.RUN_ENV':JSON.stringify(process.env.RUN_ENV || 'dev')
		}),
		new HTMLWebpackPlugin({
			title:'Webpack配置',
			inject: true,
			filename: 'index.html',
			template: path.join(__dirname,'./index.ejs')
		}),
		new webpack.optimize.CommonsChunkPlugin({//公共组件分离
			  names: ['vendors', 'manifest']
		}),
		/*new webpack.optimize.CommonsChunkPlugin({//公共组件分离
			name:'commons',
			filename:'commons.js',
			minChunks:function(module){
				return module.context && module.context.indexOf('node_modules') !==-1;
			}
		}),*/
	],
}
