"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
exports.frontendRouter = router;
const fs_1 = require("fs");
const path = require("path");
router.get("/", async (ctx, next) => {
    ctx.type = "html";
    ctx.body = fs_1.createReadStream(path.join(process.cwd(), "/src/web/frontend/index.html"));
});
