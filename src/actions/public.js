export const WILL_FETCH="WILL_FETCH";
export const DID_FETCH='DID_FETCH';
export const IMG_URL="http://192.168.1.103/";
export const URL="http://blog.tangzuo.cc:5000/api/";
export const API_URL="http://192.168.1.106:3000/api/";
export const DB_URL="http://192.168.1.106:5984/";

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
}

export const dbGet=({db})=>{
	/*let db=new PouchDB(`${DB_URL}/posts`)
	let data=await db.get(`user_${username}`).catch(err=>{
			if(err.error=='unauthorized'){
				throw new SubmissionError({password:'用户名或密码不正确'});
			}else{
				throw new SubmissionError({password:err});
			}
	});*/
}