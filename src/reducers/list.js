import {SET_LIST} from '../constants'
export const list = (state={},action)=>{
	switch(action.type){
		case SET_LIST:
			let newData={};
			action.list.map((item,key)=>{
				newData[item.id]=item;
			})
			return Object.assign({},state,newData)
		default :
			return state;
	}
}
