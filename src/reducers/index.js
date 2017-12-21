import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import loads from './loads';
import config from './config';

const app=(state={app:'adda'},action)=>{
	switch(action.type){
		default:
			return state
	}
}
export default combineReducers({
	loads,
	app,
	config,
	router:routerReducer,
})