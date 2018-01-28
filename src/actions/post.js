import {fetchGet,fetchPost,DB_URL} from './public';

export const POST_NEXT='POST_NEXT';
//获取首页帖子
export const getHomePosts=()=>async (dispatch,getState)=>{
	let {subscribe_uid_list}=getState().selfUser;
	let bookmark=getState().homePosts.bookmark;
	if(subscribe_uid_list.length>0){
		let data=await dispatch(fetchPost({
			url:`${DB_URL}posts/_find`,
			data:{
			   "selector": {
			      "uid": {
			         "$in": subscribe_uid_list
			      },
			      "type":"photo"
			   },
			   "sort": [
			      {
			         "date": "desc"
			      }
			   ],
			   bookmark,
			   "limit":20
			},
			name:'homePosts'
		}));
		dispatch({type:POST_NEXT,docs:data.docs,bookmark:data.bookmark,name:'homePosts'})
	}
};