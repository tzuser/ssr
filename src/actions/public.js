import {push} from 'react-router-redux'
export const WILL_FETCH="WILL_FETCH";
export const DID_FETCH='DID_FETCH';
//172.30.10.55 192.168.1.106
const HOST='192.168.1.106';
export const IMG_URL=`http://${HOST}:3000`;
//export const URL=`http://${HOST}:5000/api/`;
export const API_URL=`http://${HOST}:3000/api/`;
export const DB_HOST=`http://${HOST}:5984/`;
export const DB_URL=`http://${HOST}:5984/web/`;

export const LOAD='LOAD';//页面加载效果


export const load=(name,isLoad)=>({
	type:LOAD,
	name,
	isLoad
});


export const fetchGet=({url,name=null})=>async (dispatch,getState)=>{
	let res,json,conErr;
	if(name) dispatch(load(name,true));
	try{
		res=await fetch(url,{
		    method: 'GET',
		    credentials: 'include',
		    mode: 'cors',
		    /*headers: {
		        'Content-Type': 'application/json'
		    }*/
		});
		json=await res.json();
	}catch(e){
		conErr={error:'error',reason:'网络连接错误'}
	}
	//无权限
	if(json.error && json.error=='unauthorized'){
		dispatch(push('/login'))
	}
	if(name) dispatch(load(name,false));
	return json || conErr;
};

export const fetchPost=({url,data,name=null})=>async (dispatch,getState)=>{
	let res,json,conErr;
	if(name) dispatch(load(name,true));
	try{
		res=await fetch(url,{
		    method: 'POST',
		    mode: 'cors',
		    credentials: 'include',
		    headers: {
		        'Content-Type': 'application/json'
		    }, 
		    body: JSON.stringify(data)
		});
		json=await res.json();
	}catch(e){
		conErr={error:'error',reason:'网络连接错误'}
	}
	if(name) dispatch(load(name,false));
	return json || conErr;
};

export const fetchPut=({url,data,name=null,isJson=true,headers={}})=>async (dispatch,getState)=>{
	let res,json,conErr;
	if(isJson)data=JSON.stringify(data);
	if(name) dispatch(load(name,true));
	try{
		res=await fetch(url,{
		    method: 'PUT',
		    mode: 'cors',
		    credentials: 'include',
		    headers: {
		        'Content-Type': 'application/json',
		        ...headers
		    }, 
		    body: data
		});
		json=await res.json();
	}catch(e){
		conErr={error:'error',reason:'网络连接错误'}
	}
	if(name) dispatch(load(name,false));
	return json || conErr;
};

//删除
export const fetchDelete=({url,name=null})=>async (dispatch,getState)=>{
	let res,json,conErr;
	if(name) dispatch(load(name,true));
	try{
		res=await fetch(url,{
		    method: 'DELETE',
		    mode: 'cors',
		    credentials: 'include',
		});
		json=await res.json();
	}catch(e){
		conErr={error:'error',reason:'网络连接错误'}
	}
	if(name) dispatch(load(name,false));
	return json || conErr;
};


//获取文档
export const getDoc=(id)=>async (dispatch,getState)=>{
	let res=await dispatch(fetchGet({url:`${DB_URL}${id}`}));
	return res
};


export const dbGet=({docID,name})=>async (dispatch,getState)=>{
	let res,conErr;
	if(name) dispatch(load(name,true));
	let db=Global.getInstance().getDB();
	let json=await db.get(docID).catch(err=>{
		conErr={error:'error',reason:'网络连接错误'}
	})

	if(name) dispatch(load(name,false));
	return json || conErr
}