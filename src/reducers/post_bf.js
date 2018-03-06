import {CLEAR_POST,POST_NEXT,DEL_DOC} from '../actions/post'
let initState={docs:[],bookmark:null,limit:20}
export const post = (state=initState,action)=>{
	switch(action.type){
    case CLEAR_POST:
      return initState;
		case POST_NEXT:
			let newList=state.docs.concat(action.docs);
			return Object.assign({},state,{docs:newList,bookmark:action.bookmark})
		case DEL_DOC:
			return Object.assign({},state,{docs:state.docs.filter(item=>item._id!=action.id)})
		default :
			return state;
	}
}
