import Koa, { Context } from 'koa';
import KoaRouter from 'koa-router';
import { ApiStrcut } from '../../types';
import log from "../../utils/logger";
import genMockData from './gen-data';

function createKoaServer(apiList: ApiStrcut[]): void {
  const app = new Koa();
  const router = KoaRouter();

  app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  (apiList || []).forEach((api) => {
    const { method, path, response } = api;
    log.logger(path);
    router[method](path, async (ctx: Context) => {
      ctx.body = genMockData(response);
    });
  });

  app.listen(3000, () => {
    log.logger('the mock server is running on port 3000...');
  });
}

export default createKoaServer;