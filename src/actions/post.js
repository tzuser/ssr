import {fetchGet,fetchPost,fetchPut,DB_URL,DB_HOST} from './public';
import {getSelfSubscribe} from './selfUser';

export const POST_NEXT='POST_NEXT';
export const SET_CREATE='SET_CREATE';
export const ADD_CREATE_IMAGES='SET_CREATE_IMAGES';
export const DID_CREATE_IMAGE='DID_CREATE_IMAGE';
export const DEL_CREATE_IMAGE='DEL_CREATE_IMAGE';
//获取首页帖子
export const getHomePosts=()=>async (dispatch,getState)=>{
	let bookmark=getState().homePosts.bookmark;
	if(!bookmark){
		await dispatch(getSelfSubscribe());
	}
	let {subscribe_uid_list}=getState().selfUser;
	if(subscribe_uid_list.length>0){
		let data=await dispatch(fetchPost({
			url:`${DB_URL}_find`,
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

//创建新的帖子
export const createPost=()=>async (dispatch,getState)=>{
	let user=getState().selfUser;
	
	let idRes=await dispatch(fetchGet({url:`${DB_HOST}_uuids?count=1`}));
	let id=idRes.uuids;
	let data={
	  "type": "photo",
	  "root_id": user.name,
	  "uid":user.name,
	  "date": new Date().valueOf(),
	}
	let res=await dispatch(fetchPut({url:`${DB_URL}${id}`,data,name:'createPost'}))
	if(!res.ok){
		console.log('创作失败',res);
	}
	await dispatch({type:SET_CREATE,rev:res.rev,id:res.id});
	return res
};
//上传图片
export const upFile=(files)=>async (dispatch,getState)=>{
	let {id,rev}=getState().create;
	if(!id){
		let res=await dispatch(createPost());//创建帖子
		id=res.id
		rev=res.rev
	}
	//设置默认加载
	let images=[];
	for(var i in files){
		let item=files[i];
		if(item && item.name && item.size>0)images.push({name:item.name,isLoad:true});
	}
	dispatch({
		type:ADD_CREATE_IMAGES,
		images,
	})
	//开始上传图片
	for(var i in files){
		let item=files[i];
		if(item && item.name && item.size>0){
			let src=`${DB_URL}${id}/${item.name}`;
			let res=await dispatch(fetchPut({
				url:`${src}?rev=${rev}`,
				isJson:false,
				headers: {
				    'Content-Type': item.type
				},
				data:item,
			}))
			rev=res.rev;
			await dispatch({type:DID_CREATE_IMAGE,name:item.name,src});//图片上传成功
			await dispatch({type:SET_CREATE,rev:res.rev,id:res.id});//更新rev
		}
	}
};
//删除img
export const delImage=(name)=>({
	type:DEL_CREATE_IMAGE,
	name
})