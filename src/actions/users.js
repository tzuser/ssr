import {fetchPost,fetchGet,API_URL,DB_HOST,DB_URL,load} from './public';
import {push,replace} from 'react-router-redux';

export const SET_USER='SET_USER';
export const SER_USER_INFO='SER_USER_INFO';
export const SET_USER_SUBSCRIBE_UID='SET_USER_SUBSCRIBE_UID';


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
