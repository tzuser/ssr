const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const rp = require('request-promise');
const errors = require('request-promise/errors');
const router = new Router();
const HOST='http://root:wysj3910@localhost:5984/'
const DB_NAME='web';
router.get('/api',async(ctx,next)=>{
	ctx.body="Hello world"
})

router.post('/api/join',async(ctx,next)=>{
	let {username,password,confirm}=ctx.request.body;
	console.log(username,password,confirm)
	if(username && password && password==confirm && password.length>=6){
		let data={
			'_id':`org.couchdb.user:${username}`,
			type:"user",
			name:username,
			password,roles:['default']
		};
		let user={
			'_id':`user:${username}`,
			name:username,
			type:"user",
			header_image:'/files/default_header.jpg',
			avatar_url:'/files/default_avatar.jpg',
		}
		
		await rp.post(`${HOST}${DB_NAME}`,{
			body:JSON.stringify(user),
			headers: {
			    'Content-Type': 'application/json'
			},
		})


	
		try{
			await rp.post(`${HOST}_users`,{
				body:JSON.stringify(data),
				headers: {
				    'Content-Type': 'application/json'
				},
			})
		}catch(err){
			if(err.statusCode==409){
				ctx.body={error:'conflict',reason:"用户已存在!"}
			}else{
				ctx.body={error:'error',reason:err.statusCode}
			}
			console.log(err.statusCode)
			return
		}

		
		
		ctx.body={'ok':true};
		return
	}else{
		ctx.body={error:'error',reason:"请输入正确的用户名或密码!"};
		return 
	}
});

router.get('/api/install',async(ctx,next)=>{
	await rp.put(`${HOST}${DB_NAME}`).catch(err=>{
		console.log("新建数据库失败")
	})

	await rp.put(`${HOST}${DB_NAME}/_design/post`,{
		body:JSON.stringify({
		  "_id": "_design/post",
		  "views": {
		    "user-list": {
		      "map": "function (doc) {\n  if(doc.uid){\n    emit([doc.id,doc.uid], doc);\n  }\n}"
		    },
		    "subscribe": {
		      "map": "function (doc) {\n  if(doc.type==\"relation\",doc.subscribe){\n    emit(doc.uid, doc.other_uid);\n  }\n}"
		    },
		    "subscribe-me": {
		      "map": "function (doc) {\n  if(doc.type==\"relation\",doc.subscribe){\n    emit(doc.other_uid,doc.uid);\n  }\n}"
		    },
		    "get-doc-rev": {
		      "map": "function (doc) {\n  var types=[\"photo\"];\n  if(~types.indexOf(doc.type)){\n    emit(doc._id, doc._rev);\n  }\n}"
		    }
		  },
		  "validate_doc_update": "function (newDoc,savedDoc,userCtx){if(savedDoc.type=='photo' && userCtx.name!=savedDoc.uid){ throw({unauthorized:'无权更改文档'}) } }",
		  "language": "javascript"
		}),
		headers:{
			'Content-Type':'application/json'
		}
	}).catch(err=>{
		console.log("添加设计文档失败")
	})
	//添加索引
	await rp.post(`${HOST}${DB_NAME}/_index`,{
		body:JSON.stringify({
		   "index": {
		      "fields": [
		         "date"
		      ]
		   },
		   "name": "date-json-index",
		   "type": "json"
		}),
		headers:{
			'Content-Type':'application/json'
		}
	}).catch(err=>{
		console.log("添加索引失败")
	})
	//设置权限
	await rp.put(`${HOST}${DB_NAME}/_security`,{
		body:JSON.stringify({"members":{"roles":["default"]}}),
		headers:{
			'Content-Type':'application/json'
		}
	}).catch(err=>{
		console.log("设置权限失败")
	})
	
	await upFile('files','default_header.jpg','../static/default_header.jpg')
	await upFile('files','default_avatar.jpg','../static/default_avatar.jpg')


	ctx.body='新建成功'
})

const upFile=async (docname,name,file)=>{
	let doc=await rp.get(`${HOST}web/${docname}`,{json:true}).catch(err=>{
		console.log('不存在files')
	})
	let url=`${HOST}web/${docname}/${name}`;
	if(doc)url=`${url}?rev=${doc['_rev']}`;
	console.log(doc,url)

	//默认文件
	var options = {
	    method: 'PUT',
	    uri:url,
	    body:fs.createReadStream(path.join(__dirname,file)),
	    headers: {
	        'Content-Type': 'image/jpg' //'Content-Type':'application/json'
	    }
	};

	await rp(options).catch(err=>{
		console.log(err)
	})
}
module.exports=router