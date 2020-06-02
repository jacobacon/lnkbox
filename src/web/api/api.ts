import * as Router from "koa-router";

import entryRouter from "./routers/entryRouters";

const router = new Router({
  prefix: "/api",
});

router.get("/", async (ctx, next) => {
  ctx.type = "json";
  ctx.body = { message: "hello world" };
});

router.use("/entries", entryRouter.routes());

export { router as apiRouter };
