import {POST_NEXT,DEL_DOC} from '../actions/post'
export const post = (state={docs:[],bookmark:null,limit:20},action)=>{
	switch(action.type){
		case POST_NEXT:
			let newList=state.docs.concat(action.docs);
			return Object.assign({},state,{docs:newList,bookmark:action.bookmark})
		case DEL_DOC:
			return Object.assign({},state,{docs:state.docs.filter(item=>item._id!=action.id)})
		default :
			return state;
	}
}
