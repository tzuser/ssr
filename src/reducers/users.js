import {SER_USER_INFO} from '../actions/users'
//docs:[],bookmark:null,limit:20
export const users = (state={},action)=>{
	let user=state[action.name];
	switch(action.type){
		case SER_USER_INFO:
			return Object.assign({},state,{[action.name]:action.data})
		default :
			return state;
	}
}
