import * as Router from "koa-router";
const router = new Router();

import { createReadStream } from "fs";
import * as path from "path";

router.get("/:_", async (ctx, next) => {
  await next();
});

router.get("/", async (ctx, next) => {
  ctx.type = "html";
  ctx.body = createReadStream(
    path.join(process.cwd(), "/dist/web/frontend/public/index.html")
  );
});

export { router as frontendRouter };
