"use strict";
/**
 *
 * Main handler for setting up Koa Webserver which powers the Frontend App and Backend API.
 *
 * Individual routes are in:
 *
 *  - ./frontend/routes.ts --- "/"
 *  - ./api/routes.ts --- "/api"
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const routes_1 = require("./api/routes");
const routes_2 = require("./frontend/routes");
const app = new Koa();
exports.koaServer = app;
app.use(json());
app.use(logger());
app.use(routes_1.apiRouter.routes()).use(routes_1.apiRouter.allowedMethods());
app.use(routes_2.frontendRouter.routes()).use(routes_2.frontendRouter.allowedMethods());
