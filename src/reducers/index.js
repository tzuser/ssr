import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import loads from './loads';
import config from './config';
import {list} from './list';
import {keys} from './keys';
import {dialog} from './dialog';
//逻辑复用
const createFilteredReducer=(reducerFunction,reducerPredicate)=>{
	return (state,action)=>{
		const isInitializationCall=state==undefined;
		const shouldRunWrappedReducer=reducerPredicate(action) || isInitializationCall;
		return shouldRunWrappedReducer ? reducerFunction(state,action):state;
	}
}
export default combineReducers({
	loads,
	config,
	dialog,
	router:routerReducer,
	postList:createFilteredReducer(list,action=>action.name=='postList'),
	userList:createFilteredReducer(list,action=>action.name=='userList'),
	homePostKeys:createFilteredReducer(keys,action=>action.name=='homePostKeys'),
})