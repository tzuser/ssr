import {USER_POST_NEXT,USER_DEL_DOC} from '../actions/post'
//docs:[],bookmark:null,limit:20
export const userPosts = (state={},action)=>{
	let user=state[action.name];
	switch(action.type){
		
		case USER_POST_NEXT:
			let newList=user?user.docs.concat(action.docs):action.docs;
			return Object.assign({},state,{[action.name]:{docs:newList,bookmark:action.bookmark}})
		case USER_DEL_DOC:
			return Object.assign({},state,{docs:state.docs.filter(item=>item._id!=action.id)})
		default :
			return state;
	}
}
