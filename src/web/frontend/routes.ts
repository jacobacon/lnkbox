import * as Router from "koa-router";
const router = new Router();

import { createReadStream } from "fs";
import path = require("path");

router.get("/", async (ctx, next) => {
  ctx.type = "html";
  ctx.body = createReadStream(
    path.join(process.cwd(), "/src/web/frontend/index.html")
  );
});

export { router as frontendRouter };
