import {
	fetchGet,
	fetchPost,
	fetchPut,
	fetchDelete,
	DB_URL,DB_HOST,getDoc} from './public';
import {countImage,getImageName,getSrcSize} from '../public/tool';
import {initialize,destroy} from 'redux-form';
export const OPEN_CREATION='OPEN_CREATION';//保存创造
export const CLOSE_CREATION='CLEAR_CREATION';//关闭创造

export const UPDATE_CREATION='UPDATE_CREATION';//更新rev

export const SAVE_CREATION='SAVE_CREATION';//保存创造
export const CLEAR_CREATION='CLEAR_CREATION';//清空创造
export const DEL_DOC='DEL_DOC';//删除文档

export const ADD_CREATION_IMAGES='SET_CREATION_IMAGES';//准备上传图片
export const DID_CREATION_IMAGE='DID_CREATION_IMAGE';//图片上传完成
export const DEL_CREATION_IMAGE='DEL_CREATION_IMAGE';//删除图片


//打开控制台
export const openCreation=(doc=null)=>async (dispatch,getState)=>{
	let images=[];
	let id,rev;
	if(doc){
		dispatch(initialize('creation',{text: doc.text}));//设置表格数据
		if(doc._attachments){
			Object.keys(doc._attachments).map(name=>{
				images.unshift({
					name,
					src:`${DB_URL}${doc._id}/${name}`,
					isLoad:false
				})
			})
		}
		id=doc._id;
		rev=doc._rev;
	}
	dispatch({
		type:OPEN_CREATION,
		id,
		rev,
		images
	})
};
//关闭控制台
export const closeCreation=()=>async (dispatch,getState)=>{
	dispatch(destroy('creation'));
	dispatch({
		type:CLOSE_CREATION,
	})
};


//创建新的帖子
export const newCreation=()=>async (dispatch,getState)=>{
	let user=getState().selfUser;
	let idRes=await dispatch(fetchGet({url:`${DB_HOST}_uuids?count=1`}));
	let id=idRes.uuids;
	let data={
	  "type": "photo",
	  "root_id": user.name,
	  "name":user.name,
	  "avatar_url":user.avatar_url,
	  "date": new Date().valueOf(),
	  "status":0,//初稿
	}
	let res=await dispatch(fetchPut({url:`${DB_URL}${id}`,data,name:'createPost'}))
	if(!res.ok){
		console.log('创作失败',res);
	}
	await dispatch({type:UPDATE_CREATION,rev:res.rev,id:res.id});
	return res
};

//保存的帖子
export const saveCreation=()=>async (dispatch,getState)=>{
	let value=getState().form.creation.values;
	if(!value || !value.text)return;
	let text=value.text;
	let user=getState().selfUser;
	let id=getState().creation.id;
	if(!id){
		let res=await dispatch(newCreation());//创建帖子
		if(!res.ok)alert('创作失败');
		id=res.id
	}
	let doc=await dispatch(getDoc(id));
	doc.text=text;
	doc.status=1;//发布
	let res=dispatch(fetchPut({url:`${DB_URL}${id}?conflicts=true`,data:doc,name:"saveCreation"}));
	console.log(res)
};
 
//上传图片
export const upFile=(files)=>async (dispatch,getState)=>{
	let {id,rev}=getState().creation;
	if(!id){
		let res=await dispatch(newCreation());//创建帖子
		if(!res.ok){
			alert('创作失败')
		}
		id=res.id
		rev=res.rev
	}
	//设置默认加载
	let images=[];
	let upList=[]
	for(let i=0;i<files.length;i++){
		let item=files[''+i];
		//图片格式筛选
		var rFilter = /^(image\/jpeg|image\/png|image\/gif)$/i;
		if(item && item.name && item.size>0 && rFilter.test(item.type)){
			let blob=await countImage(item);
			let name=getImageName(blob);
			
			//设置
			images.push({name:`${name}`,isLoad:true});
			upList.push({
				name,
				blob:blob.blob,
				file:item
			})
		}
	}

	if(images.length==0){
		console.log('图片为空')
		return true;
	}
	await dispatch({
		type:ADD_CREATION_IMAGES,
		images,
	})
	//开始上传图片
	for(var i in upList){
		let item=upList[i];
		rev=getState().creation.rev;
		let src=`${DB_URL}${id}/${item.name}`;
		let res=await dispatch(fetchPut({
			url:`${src}?rev=${rev}`,
			isJson:false,
			headers: {
			    'Content-Type': item.file.type
			},
			data:item.blob,
		}))
		await dispatch({type:UPDATE_CREATION,rev:res.rev,id:res.id});//更新rev
		await dispatch({
			type:DID_CREATION_IMAGE,
			name:item.name,
			src
		});//图片上传成功
	}
	return true;
};

//删除img
export const delImage=({name,src})=>async (dispatch,getState)=>{
	let {id,rev}=getState().creation;
	let res=await dispatch(fetchDelete({url:`${src}?rev=${rev}`}));
	if(res.ok){
		await dispatch({type:UPDATE_CREATION,rev:res.rev,id:res.id});//更新rev
		await dispatch({
			type:DEL_CREATION_IMAGE,
			name
		})
	}else{
		console.log('删除图片失败',res)
	}
}