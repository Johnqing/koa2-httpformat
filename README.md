# koa2-httpformat
koa2 http格式化
```
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const httpFormat = require('koa2-httpformat');
const log = async function(ctx, next){
    await next();
    const formatLog = httpFormat(ctx, ':remote-addr|:url|:req[cookies]|:referrer|:user-agent');
    console.log(formatLog);
}

app.use(log);

router
  .get('/', (ctx, next) => {
    ctx.body = {}
  })

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log(`Server is running on port 3000`);
```
