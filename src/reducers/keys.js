import {SET_KEYS,ADD_KEYS} from '../constants'
export const keys = (state={keys:[],page:1},action)=>{
	switch(action.type){
		case SET_KEYS:
			return Object.assign({},state,{keys:action.keys,page:action.page})
		case ADD_KEYS:
			var newKeys=state.keys.concat(action.keys);
			return Object.assign({},state,{keys:newKeys,page:action.page})
		default :
			return state;
	}
}