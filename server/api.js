const Router = require('koa-router');
const rp = require('request-promise');
const errors = require('request-promise/errors');

const router = new Router();

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
			header_image:'/images/header_default.jpg',
			avatar_url:'/images/avater_default.jpg',
		}
		try{
			await rp.post('http://root:wysj3910@localhost:5984/_users',{
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

		await rp.post('http://root:wysj3910@localhost:5984/posts',{
			body:JSON.stringify(user),
			headers: {
			    'Content-Type': 'application/json'
			},
		})
		
		ctx.body={'ok':true};
		return
	}else{
		ctx.body={error:'error',reason:"请输入正确的用户名或密码!"};
		return 
	}
})


module.exports=router