const Loadable=require('react-loadable');
const Router = require('koa-router');
const path= require('path')
//const staticServer =require('koa-static')
const staticCache = require('koa-static-cache')
const Koa = require('koa')
const render = require('./render.js')
const api = require('./api.js')
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa()
app.use(bodyParser());//解析Json或者form
app.use(cors({credentials:true}));//跨域
const router = new Router();


router.get('/', render);
//接口
app.use(api.routes()).use(api.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
app.use(staticCache(path.resolve(__dirname, '../build'), {maxAge: 365 * 24 * 60 * 60}));
app.use(render);


Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
});
