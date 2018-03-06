import {
	fetchGet,
	fetchPost,
	fetchDelete,
	DB_URL} from './public';
import {getSelfSubscribe} from './selfUser';

export const POST_NEXT='POST_NEXT';
export const DEL_DOC='DEL_DOC';

export const USER_POST_NEXT='USER_POST_NEXT';
export const USER_POST_UNSHIFT='USER_POST_UNSHIFT';
export const USER_POST_ITEM_UPDATE='USER_POST_ITEM_UPDATE';//更新单个帖子
export const USER_DEL_DOC='USER_DEL_DOC';

//更新首页帖子列表
export const updateHomePosts=()=>async (dispatch,getState)=>{
	await dispatch({type:USER_CLEAR_POST,name:'homePosts'});//清除首页帖子
	await dispatch(getHomePosts())
}
//更新用户帖子列表
export const updateUserPosts=(name)=>async (dispatch,getState)=>{
	await dispatch({type:USER_CLEAR_POST,name});//清除帖子
	await dispatch(getUserPosts(name))
}
//获取首页帖子
export const getHomePosts=()=>async (dispatch,getState)=>{
	let bookmark=getState().posts.bookmark;
	if(!bookmark){
		if(!await dispatch(getSelfSubscribe()))return;
	}
	let {subscribe_uid_list,name}=getState().selfUser;
	//subscribe_uid_list.push(name);
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
	if(data.error){
		console.error(data.error)
	}else if(data.bookmark=="nil"){
		console.error("没有更多了")
		await dispatch({type:USER_POST_NEXT,docs:[],bookmark:null,name:'homePosts',isFoot:true})
	}else{
		await dispatch({type:USER_POST_NEXT,docs:data.docs,bookmark:data.bookmark,name:'homePosts'})
	}
};


//获取用户帖子
export const getUserPosts=(name)=>async (dispatch,getState)=>{
	let user=getState().posts[name];
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
		name:'getUserPosts'
	}));

	if(data.error){
		console.error(data.error)
	}else if(data.bookmark=="nil"){
		console.error("没有更多了")
		await dispatch({type:USER_POST_NEXT,docs:[],bookmark:null,name,isFoot:true})
	}else{
		await dispatch({type:USER_POST_NEXT,docs:data.docs,bookmark:data.bookmark,name})
	}
};


export const delDoc=({id,rev})=>async (dispatch,getState)=>{
	let user=getState().selfUser
	let res=await dispatch(fetchDelete({url:`${DB_URL}${id}?rev=${rev}`}));
	if(res.ok){
		console.log('删除文档成功');
		dispatch({type:USER_DEL_DOC,id,name:'homePosts'})
		dispatch({type:USER_DEL_DOC,id,name:user.name})
	}else{
		console.log('删除文档失败',res)
	}
};
//编辑
export const editDoc=(doc)=>async ()=>{
	console.log("编辑",doc)
}

//用户文章列表前添加
export const postUnshift=(doc,name)=>async (dispatch)=>{
	await dispatch({type:USER_POST_UNSHIFT,doc,name})
}

//更新单个帖子
export const postUpdate=(doc,name)=>async (dispatch)=>{
	await dispatch({type:USER_POST_ITEM_UPDATE,doc,name})
}