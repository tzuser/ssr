export const WILL_FETCH="WILL_FETCH";
export const DID_FETCH='DID_FETCH';
export const IMG_URL="http://blog.tangzuo.cc:5000";
export const URL="http://blog.tangzuo.cc:5000/api/";

export const LOAD='LOAD';//页面加载效果
export const load=(name,isLoad)=>({
	type:LOAD,
	name,
	isLoad
});


export const fetchGet=({url,name=null})=>async (dispatch,getState)=>{
	let res,json;
	if(name) dispatch(load(name,true));
	try{
		res=await fetch(url,{
		    method: 'GET',
		    mode: 'cors',
		    /*headers: {
		        'Content-Type': 'application/json'
		    }*/
		});
		json=await res.json();
	}catch(e){
		json={status:404,message:e}
	}
	if(name) dispatch(load(name,false));
	return json;
};

export const fetchPost=({url,data,name=null})=>async (dispatch,getState)=>{
	let res,json;
	if(name) dispatch(load(name,true));
	try{
		res=await fetch(url,{
		    method: 'POST',
		    mode: 'cors',
		    headers: {
		        'Content-Type': 'application/json'
		    }, 
		    body: JSON.stringify(data)
		});
		json=await res.json();
	}catch(e){
		json={status:404,message:e}
	}
	if(name) dispatch(load(name,false));
	return json;
}