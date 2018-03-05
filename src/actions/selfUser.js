import {fetchPost,fetchGet,API_URL,DB_HOST,DB_URL,load} from './public';
import {push,replace} from 'react-router-redux';
import { SubmissionError } from 'redux-form';  // ES6

export const LOGIN="LOGIN";
export const GET_SELF_INFO="GET_SELF_INFO";
export const INIT_SELF="INIT_SELF";
export const SET_SELF_SUBSCRIBE_UID="SET_SELF_SUBSCRIBE_UID";//设置关注uid

//登录
export const login=({username,password})=>async (dispatch,getState)=>{
	if(!username)throw new SubmissionError({username:'请输入用户名'});
	if(!password)throw new SubmissionError({password:'请输入密码'});
	let json=await dispatch(fetchPost({url:`${DB_HOST}_session`,data:{name:username,password},name:'login'}));
	if(json.error || !json.ok){
		let errMessage=json.reason
		if(json.error=='unauthorized')errMessage='用户名或密码不正确'
		throw new SubmissionError({password:errMessage})
	}else{
		let res=await dispatch(getSelfInfo(username))//获取用户信息
		//await dispatch(getSelfSubscribe())//获取用户
		if(!res){console.log('获取用户信息失败!请联系管理员!');return}
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
	let json=await dispatch(fetchGet({url:`${DB_URL}user:${username}`,name:"getuser"}));
	if(json.error){
		console.log(json)
		return false
	}else{
		dispatch({
			type:GET_SELF_INFO,
			data:json
		})
	}
	return true
};

//获取关注的用户
export const getSelfSubscribe=()=>async (dispatch,getState)=>{
	let username=getState().selfUser.name;
	let json=await dispatch(fetchGet({url:`${DB_URL}_design/post/_view/subscribe?key="${username}"`,name:"getSubscribe"}));
	if(json.error){
		console.log(json)
		return false
	}else{
		let list=[];
		json.rows.map(item=>{
			list.push(item.value)
		})
		list.unshift(username);
		dispatch({type:SET_SELF_SUBSCRIBE_UID,list})
	}
	return true
};


export const logout=()=>async (dispatch,getState)=>{
	dispatch({type:INIT_SELF});
	dispatch(push('/login'));
}


//关注用户
export const subscribe=(targetName)=>async (dispatch,getState)=>{
	let name=getState().selfUser.name
	let doc=await dispatch(fetchGet({url:`${DB_URL}/${name}_${targetName}`}))
	if(doc.error){
		doc={
			  "_id": `${name}_${targetName}`,
			  "type": "relation",
			  "uid": name,
			  "other_uid": targetName,
			  "subscribe": true,
			  "date": new Date().valueOf()
			}
	}else{
		doc.subscribe=true;
	}
	let res=await dispatch(fetchPost({url:`${DB_URL}`,data:doc}))
	await dispatch(getSelfSubscribe());
}




//取消关注用户
export const cancelSubscribe=(targetName)=>async (dispatch,getState)=>{
	let name=getState().selfUser.name
	//获取关注文档
	let doc=await dispatch(fetchGet({url:`${DB_URL}/${name}_${targetName}`}))
	doc.subscribe=false;
	//更新文档
	let res=await dispatch(fetchPost({url:`${DB_URL}`,data:doc}))
	//更新关注列表
	await dispatch(getSelfSubscribe());
}