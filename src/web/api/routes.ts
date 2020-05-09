import * as Router from "koa-router";
const router = new Router();

router.get("/api", async (ctx, next) => {
  ctx.type = "json";
  ctx.body = { message: "hello world" };
});

export { router as apiRouter }
