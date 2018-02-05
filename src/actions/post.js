import {
	fetchGet,
	fetchPost,
	fetchDelete,
	DB_URL} from './public';
import {getSelfSubscribe} from './selfUser';

export const POST_NEXT='POST_NEXT';
export const DEL_DOC='DEL_DOC';

export const USER_POST_NEXT='USER_POST_NEXT';
export const USER_DEL_DOC='USER_DEL_DOC';


//获取首页帖子
export const getHomePosts=()=>async (dispatch,getState)=>{
	let bookmark=getState().homePosts.bookmark;
	if(!bookmark){
		if(!await dispatch(getSelfSubscribe()))return;
	}
	let {subscribe_uid_list,name}=getState().selfUser;
	subscribe_uid_list.push(name);
	let data=await dispatch(fetchPost({
		url:`${DB_URL}_find`,
		data:{
		   "selector": {
		      "name": {
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
};


//获取用户帖子
export const getUserPosts=(name)=>async (dispatch,getState)=>{
	let user=getState().userPosts[name];
	let bookmark=user && user.bookmark;

	let data=await dispatch(fetchPost({
		url:`${DB_URL}_find`,
		data:{
		   "selector": {
		      "name":name,
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
		name
	}));
	dispatch({type:USER_POST_NEXT,docs:data.docs,bookmark:data.bookmark,name})
};


export const delDoc=({id,rev})=>async (dispatch,getState)=>{
	let res=await dispatch(fetchDelete({url:`${DB_URL}${id}?rev=${rev}`}));
	if(res.ok){
		console.log('删除文档成功');
		dispatch({type:DEL_DOC,id,name:'homePosts'})
	}else{
		console.log('删除文档失败',res)
	}
};
//编辑
export const editDoc=(doc)=>async ()=>{
	console.log("编辑",doc)
}