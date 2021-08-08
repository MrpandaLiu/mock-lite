import Koa from 'koa';
import KoaRouter from 'koa-router';

function createKoaServer() {
  const app = new Koa();
  const router = KoaRouter();

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.use(async ctx => {
    ctx.body = 'Hello World';
  });

  router.post('/test/query', async ctx => {
    console.log('test');
  });

  app.listen(3000, () => {
    console.log('the server is running...');
  });
}

export default createKoaServer;