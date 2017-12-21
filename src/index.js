import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {ConnectedRouter} from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {RemoveServerSideCss} from './Module/MaterialUIServiceRendering';

import {getCreateStore} from './store'
import './Module/PWS';//离线缓存
import Loadable from 'react-loadable';
import theme from './public/Theme';
let {store,history}=getCreateStore();//获取store
//热加载配置
if(module.hot) {
	module.hot.accept('./reducers/index.js', () => {
		import('./reducers/index.js').then(({default:nextRootReducer})=>{
			store.replaceReducer(nextRootReducer);
		});
	});
	module.hot.accept('./Containers/App.jsx', () => {
		render()
	});
}

//是否是服务器渲染
const renderDOM=process.env.NODE_ENV=='production'?ReactDOM.hydrate:ReactDOM.render;
const render=()=>{
	//const App = require("./Containers/App.jsx").default;
	const LoadableApp=Loadable({
	  loader: () => import( /*webpackChunkName: 'App'*/  './Containers/App'),
	  loading:()=>false
	});
	renderDOM(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<MuiThemeProvider theme={theme}>
					<RemoveServerSideCss>
						<LoadableApp />
					</RemoveServerSideCss>
				</MuiThemeProvider>
			</ConnectedRouter>
		</Provider>
		,document.getElementById('root'))
}
//为了确保loadable加载完成
window.main = () => {
  Loadable.preloadReady().then(() => {
	render()
  });
};