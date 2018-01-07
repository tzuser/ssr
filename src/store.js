import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import reducers from './reducers/index';

//浏览器开发工具
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

export const getCreateStore=(path = '/')=>{
	var initialState = {};
	switch(process.env.RUN_ENV){
		case 'dev':
		case 'build':
			initialState=window._INIT_STATE_;
			var history = createBrowserHistory()
			var middleware=[thunk,routerMiddleware(history)];
			var store=createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)))
			return {history,store}
		case 'server':
			var history = createMemoryHistory({ initialEntries: [path] });
			var middleware = [thunk, routerMiddleware(history)];
			var composedEnhancers = compose(applyMiddleware(...middleware));
			var store = createStore(reducers, initialState, composedEnhancers);
			return {history,store};
	}
	
}