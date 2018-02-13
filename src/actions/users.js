import {fetchPost,fetchGet,API_URL,DB_HOST,DB_URL,load} from './public';
import {setList} from './list';
import {push,replace} from 'react-router-redux';

export const SET_USER='SET_USER';
export const SER_USER_INFO='SER_USER_INFO';
export const SET_USER_SUBSCRIBE_UID='SET_USER_SUBSCRIBE_UID';

export const SET_USER_ALL='SET_USER_ALL';//所有用户列表


//获取用户信息
export const getInfo=(name)=>async (dispatch,getState)=>{
	let json=await dispatch(fetchGet({url:`${DB_URL}user:${name}`,name:"getuser"}));
	if(json.error){
		console.log(json)
		return false
	}else{
		dispatch({
			type:SER_USER_INFO,
			data:json,
			name
		})
	}
	return true
};

//获取关注的用户
export const getSubscribe=(name)=>async (dispatch,getState)=>{
	let json=await dispatch(fetchGet({url:`${DB_URL}_design/post/_view/subscribe?key="${name}"`,name:"getSubscribe"}));
	if(json.error){
		console.log(json)
		return false
	}else{
		let list=[];
		json.rows.map(item=>{
			list.push(item.value)
		})
		dispatch({type:SET_USER_SUBSCRIBE_UID,list})
	}
	return true
};


//获取所有用户
export const getUserAll=()=>async (dispatch,getState)=>{
	let {page,total_rows}=getState().userList;
	let subscribe_uid_list=getState().selfUser.subscribe_uid_list;
	let skip=page*20;
	if(skip>total_rows)return;
	
	let json=await dispatch(fetchGet({url:`${DB_URL}_design/post/_view/user-list?limit=20&skip=${skip}`,name:"userList"}));
	if(json.error){
		return false
	}else{
		json.rows.map(item=>{
			if(~subscribe_uid_list.indexOf(item.value.name)){
				item.value.isSubscribe=true;
			}
			return item
		})
		dispatch(setList('userList',json,page+1))
	}
	return true
};

//关注用户
export const subscribe=(targetName)=>async (dispatch,getState)=>{
	let name=getState().selfUser.name
	let doc={
	  "_id": `${name}:${targetName}`,
	  "type": "relation",
	  "uid": name,
	  "other_uid": targetName,
	  "subscribe": true,
	  "date": new Date().valueOf()
	}
	let res=await dispatch(fetchPost({url:`${DB_URL}`,data:doc}))
	console.log(res,doc)
}