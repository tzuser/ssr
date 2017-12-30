import {OPEN_PHOTO,CLOSE_PHOTO} from '../actions/photo'
export const photo = (state={open:false,items:[]},action)=>{
	switch(action.type){
		case OPEN_PHOTO:
			return Object.assign({},state,{open:true,items:action.items})
		case CLOSE_PHOTO:
			return Object.assign({},state,{open:false,items:[]})
		default :
			return state;
	}
}