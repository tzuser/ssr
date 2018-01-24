import {SHOW_SWITCH_OPEN,SHOW_SWITCH_CLOSE} from '../actions/config';
const config=(state={show:true},action)=>{
	switch(action.type){
		case SHOW_SWITCH_OPEN:
			return Object.assign({},state,{show:true})
		case SHOW_SWITCH_CLOSE:
			return Object.assign({},state,{show:false})
		default:
			return state
	}
}
export default config