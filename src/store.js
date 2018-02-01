import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';

//数据持久化
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['selfUser']
}


//浏览器开发工具
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

export const getCreateStore=(reducers,path = '/')=>{
	var initialState = {};
	switch(process.env.RUN_ENV){
		case 'dev':
		case 'build':
			initialState=window._INIT_STATE_;
			//数据持久化
			const persistedReducer = persistReducer(persistConfig, reducers)
			var history = createBrowserHistory()
			var middleware=[thunk,routerMiddleware(history)];
			var store=createStore(persistedReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
			return {history,store}
		case 'server':
			var history = createMemoryHistory({ initialEntries: [path] });
			var middleware = [thunk, routerMiddleware(history)];
			var store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)));
			return {history,store};
	}
	
}