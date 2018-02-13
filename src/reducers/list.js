import {SET_LIST} from '../actions/list'
export const list = (state={total_rows:null,offset:null,rows:[],page:0},action)=>{
	switch(action.type){
		case SET_LIST:
			return Object.assign({},state,{...action.data,page:action.page})
		default :
			return state;
	}
}
