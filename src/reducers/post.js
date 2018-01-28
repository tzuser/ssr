import {POST_NEXT} from '../actions/post'
export const post = (state={docs:[],bookmark:null,limit:20},action)=>{
	switch(action.type){
		case POST_NEXT:
			let newList=state.docs.concat(action.docs);
			return Object.assign({},state,{docs:newList,bookmark:action.bookmark})
		default :
			return state;
	}
}
