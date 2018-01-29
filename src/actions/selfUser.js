import {fetchPost,fetchGet,API_URL,DB_URL,load} from './public';
import {push,replace} from 'react-router-redux';
import { SubmissionError } from 'redux-form';  // ES6

export const LOGIN="LOGIN";
export const GET_SELF_INFO="GET_SELF_INFO";
export const INIT_SELF="INIT_SELF";
export const SET_SUBSCRIBE_UID="SET_SUBSCRIBE_UID";//设置关注uid

//登录
export const login=({username,password})=>async (dispatch,getState)=>{
	if(!username)throw new SubmissionError({username:'请输入用户名'});
	if(!password)throw new SubmissionError({password:'请输入密码'});
	let json=await dispatch(fetchPost({url:`${DB_URL}_session`,data:{name:username,password},name:'login'}));
	if(json.error || !json.ok){
		let errMessage=json.reason
		if(json.error=='unauthorized')errMessage='用户名或密码不正确'
		throw new SubmissionError({password:errMessage})
	}else{
		await dispatch(getSelfInfo(username))//获取用户信息
		//await dispatch(getSelfSubscribe())//获取用户
		await dispatch(replace('/'))	
	}
};
//加入我们
export const join=({username,password,confirm})=>async (dispatch,getState)=>{
	if(!username)throw new SubmissionError({username:'请输入用户名'});
	if(!password)throw new SubmissionError({password:'请输入密码'});
	if(password!=confirm){
		throw new SubmissionError({confirm:'两次密码不一致!'})
	}
	let data={username,password,confirm};
	let json=await dispatch(fetchPost({url:`${API_URL}join`,data,name:'join'}));
	if(json.error || !json.ok){
		throw new SubmissionError({confirm:json.reason})
	}else{
		dispatch(push('/login'));
	}
};

//获取自己信息
export const getSelfInfo=(username)=>async (dispatch,getState)=>{
	let json=await dispatch(fetchGet({url:`${DB_URL}posts/user:${username}`,name:"getuser"}));
	if(json.error){
		console.log(json)
	}else{
		dispatch({
			type:GET_SELF_INFO,
			data:json
		})
	}
};

//获取关注的用户
export const getSelfSubscribe=()=>async (dispatch,getState)=>{
	let username=getState().selfUser.name;
	let json=await dispatch(fetchGet({url:`${DB_URL}posts/_design/post/_view/subscribe?key="${username}"`,name:"getSubscribe"}));
	if(json.error){
		console.log(json)
	}else{
		let list=[];
		json.rows.map(item=>{
			list.push(item.value)
		})
		dispatch({type:SET_SUBSCRIBE_UID,list})
	}
};


export const logout=()=>async (dispatch,getState)=>{
	dispatch({type:INIT_SELF});
	dispatch(push('/login'));
}

