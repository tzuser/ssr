import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {ConnectedRouter} from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {RemoveServerSideCss} from './Module/MaterialUIServiceRendering';

import {getCreateStore} from './store'
//import './Module/PWS';//离线缓存
import Loadable from 'react-loadable';
import theme from './public/Theme';
import App from './Containers/App';
import reducers from './reducers/index';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'

let {store,history}=getCreateStore(reducers);//获取store

let persistor = persistStore(store)
if(process.env.NODE_ENV=='development'){
	//热加载配置
	if(module.hot) {
		module.hot.accept('./reducers/index.js', () => {
			import('./reducers/index.js').then(({default:nextRootReducer})=>{
				store.replaceReducer(nextRootReducer);
			});
		});
		
		module.hot.accept('./Containers/App.jsx', () => {
			import("./Containers/App.jsx").then(({default:AppCom})=>{
				render(AppCom)
			});
		});
	}
}
//是否是服务器渲染
const renderDOM=process.env.NODE_ENV=='production'?ReactDOM.hydrate:ReactDOM.render;
const render=(AppCom=App)=>{
	renderDOM(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider theme={theme}>
						<RemoveServerSideCss>
							<AppCom />
						</RemoveServerSideCss>
					</MuiThemeProvider>
				</ConnectedRouter>
			</PersistGate>
		</Provider>
		,document.getElementById('root'))
}
//为了确保loadable加载完成
window.main = () => {
  Loadable.preloadReady().then(() => {
	render()
  });
};