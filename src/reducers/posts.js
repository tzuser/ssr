import {USER_POST_NEXT,USER_DEL_DOC,USER_POST_UNSHIFT,
	USER_POST_ITEM_UPDATE,
	USER_CLEAR_POST} from '../actions/post'
//docs:[],bookmark:null,limit:20
let initUser={docs:[],bookmark:null,isFoot:false}
export const posts = (state={},action)=>{
	let user=state[action.name];
	let newList;
	switch(action.type){
		case USER_POST_UNSHIFT://列表前插入
			if(!user)return state;
			user.docs.unshift(action.doc)
			newList=user.docs;
			return Object.assign({},state,{[action.name]:{...user,docs:newList}})
		case USER_POST_NEXT://加载列表
			newList=user?user.docs.concat(action.docs):action.docs;
			return Object.assign({},state,{[action.name]:{...user,docs:newList,bookmark:action.bookmark,isFoot:action.isFoot}})
		case USER_POST_ITEM_UPDATE://更新单个帖子
			if(!user)return state;
			newList=user.docs.concat()
			newList=newList.map(item=>{
				if(item._id==action.doc._id){
					return action.doc
				}
				return item
			})
			return Object.assign({},state,{[action.name]:{...user,docs:newList}})
		case USER_DEL_DOC://删除帖子
			if(!user)return state;
			return Object.assign({},state,{[action.name]:{...user,docs:user.docs.filter(item=>item._id!=action.id)}})
		case USER_CLEAR_POST://清空帖子
			return Object.assign({},state,{[action.name]:initUser});
		default :
			return state;
	}
}
