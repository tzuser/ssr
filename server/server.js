const Loadable=require('react-loadable');
const Router = require('koa-router');
const router = new Router();

const path= require('path')
const staticServer =require('koa-static')
const Koa = require('koa')
const app = new Koa()
const render = require('./render.js')

router.get('/', render);

app.use(router.routes())
.use(router.allowedMethods())
.use(staticServer(path.resolve(__dirname, '../build')));
app.use(render);


Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
});
