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

import * as Koa from "koa";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as files from "koa-static";

import { apiRouter } from "./api/routes";
import { frontendRouter } from "./frontend/routes";

import * as path from "path";

const app = new Koa();

app.use(json());
app.use(logger());
//console.log(path.resolve(__dirname, "../public"));
app.use(files(path.resolve(__dirname, "../public")));

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
app.use(frontendRouter.routes()).use(frontendRouter.allowedMethods());

export { app as koaServer };
