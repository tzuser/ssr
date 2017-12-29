export const SET_USER='SET_USER';

export const getList=(page)=>async (dispatch,getState)=>{
	//let json=await dispatch(fetchGet({url:`${URL}post?page=${page}`,name:'home_list'}));
	await new Promise((resolve)=>{
		setTimeout(()=>{resolve()},1000)
	})
	if(json.status==404){
		console.log(json)
		dispatch(open({
			title:"网络连接错误",
			content:`请检查你的网络连接！错误代码${json.status}`,
		}))
		return;
	}
	if(!json.length){
		dispatch({type:SET_KEYS_ISEND,name:'homePostKeys'})
		return ;
	}
	let users=[];
	let keys=[];

	json.map((item,key)=>{
		users.push(item.user);
		keys.push(item.id);
		item.user_id=item.user.id;
		delete item.user;
		return item;
	})

	dispatch({
		type:SET_LIST,
		name:'userList',
		list:users
	})
	dispatch({
		type:SET_LIST,
		name:'postList',
		list:json
	})
	dispatch({
		type:ADD_KEYS,
		name:'homePostKeys',
		page,
		keys
	})
	return true
}