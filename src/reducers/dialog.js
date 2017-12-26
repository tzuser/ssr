import {close} from '../actions/alertDialog'
import {OPEN_DIALOG,CLOSE_DIALOG} from '../constants';
export const dialog = (state={open:false,title:'提示',content:'',btns:[{name:'确定',act:close()}]},action)=>{
	switch(action.type){
		case OPEN_DIALOG:
			let {title,content,btns}=action;
			return Object.assign({},state,{
				title,
				content,
				btns:btns||state.btns,
				open:true
			})
		case CLOSE_DIALOG:
			return Object.assign({},state,{open:false})
		default :
			return state;
	}
}
