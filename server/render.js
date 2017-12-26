import React from 'react'
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import App from '../src/Containers/App.jsx';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import { StaticRouter } from 'react-router-dom'
import {getCreateStore} from '../src/store'
import {Provider} from 'react-redux';
import path from 'path';
import fs from 'fs';
import Helmet from 'react-helmet';
import { getBundles } from 'react-loadable/webpack'
import stats from '../build/react-loadable.json';

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';

import { MuiThemeProvider} from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import theme from '../src/public/Theme';
import 'isomorphic-fetch'

const prepHTML=(data,{html,head,style,body,script,css})=>{
	data=data.replace('<html',`<html ${html}`);
	data=data.replace('</head>',`${head}${style}</head>`);
	data=data.replace('<div id="root"></div>',`<div id="root">${body}</div><style id="jss-server-side">${css}</style>`);
	data=data.replace('</body>',`${script}</body>`);
	return data;
}

const render=async (ctx,next)=>{
		const filePath=path.resolve(__dirname,'../build/index.html')
		let html=await new Promise((resolve,reject)=>{
			//material处理
			const sheetsRegistry = new SheetsRegistry();
			const jss = create(preset());
			jss.options.createGenerateClassName = createGenerateClassName;

			fs.readFile(filePath,'utf8',(err,htmlData)=>{//读取index.html文件
				if(err){
					console.error('读取文件错误!',err);
					return res.status(404).end()
				}
				const { store, history } = getCreateStore(ctx.req.url);
				let modules=[];
				let routeMarkup =renderToString(
					<Loadable.Capture report={moduleName => modules.push(moduleName)}>
						<Provider store={store}>
							<ConnectedRouter history={history}>
								<JssProvider registry={sheetsRegistry} jss={jss}>
									<MuiThemeProvider theme={theme} sheetsManager={new Map()}>
										<App/>
									</MuiThemeProvider>
								</JssProvider>
							</ConnectedRouter>
						</Provider>
					</Loadable.Capture>
					)

				const css = sheetsRegistry.toString()

				let bundles = getBundles(stats, modules);
				let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
				let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

				let styleStr=styles.map(style => {
					        	return `<link href="/dist/${style.file}" rel="stylesheet"/>`
					      	}).join('\n')

				let scriptStr=scripts.map(bundle => {
					        	return `<script src="/${bundle.file}"></script>`
					      	}).join('\n')

				const helmet=Helmet.renderStatic();
				const html=prepHTML(htmlData,{
					html:helmet.htmlAttributes.toString(),
					head:helmet.title.toString()+helmet.meta.toString()+helmet.link.toString(),
					style:styleStr,
					body:routeMarkup,
					script:scriptStr,
					css:css
				})
				setTimeout(()=>resolve(html),1000)
				
			})
		})
		ctx.body=html
}

export default render;