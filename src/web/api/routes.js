"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
exports.apiRouter = router;
router.get("/api", async (ctx, next) => {
    ctx.type = "json";
    ctx.body = { message: "hello world" };
});
