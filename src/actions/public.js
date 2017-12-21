export const WILL_FETCH="WILL_FETCH";
export const DID_FETCH='DID_FETCH';
export const URL="http://localhost:5000/api/";

export const LOAD='LOAD';//页面加载效果
export const load=(name,isLoad)=>({
	type:LOAD,
	name,
	isLoad
})


export const fetchGet=async ({dispatch,url,name=null,isPageLoad=false})=>{
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
		json={status:404,messign:e}
	}
	if(name) dispatch(load(name,false));
	if(!json.status){
		json.status=res.status;
	}
	return json;
}
export const fetchPost=async ({dispatch,url,data,name=null,isPageLoad=false})=>{
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
		json={status:404,messign:e}
	}
	if(name) dispatch(load(name,false));
	if(!json.status){
		json.status=res.status;
	}
	return json;
}