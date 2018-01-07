import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import loads from './loads';
import config from './config';
import {list} from './list';
import {keys} from './keys';
import {photo} from './photo';
import { reducer as formReducer } from 'redux-form';
//逻辑复用
const createFilteredReducer=(reducerFunction,reducerPredicate)=>{
	return (state,action)=>{
		const isInitializationCall=state==undefined;
		const shouldRunWrappedReducer=reducerPredicate(action) || isInitializationCall;
		return shouldRunWrappedReducer ? reducerFunction(state,action):state;
	}
}
export default combineReducers({
	loads,//所有加载
	form:formReducer,
	config,
	photo,//照片详情展示
	router:routerReducer,
	postList:createFilteredReducer(list,action=>action.name=='postList'),
	userList:createFilteredReducer(list,action=>action.name=='userList'),
	homePostKeys:createFilteredReducer(keys,action=>action.name=='homePostKeys'),
})