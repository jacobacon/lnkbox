/**
 *
 * Main handler for setting up Express Webserver which powers the Frontend App and Backend API.
 */

import * as express from "express";
import * as bodyParser from "body-parser";

import * as morgan from "morgan";

import { apiRouter } from "./api/routes";

import * as path from "path";

const app = express();

app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api", apiRouter);

app.use(
  express.static(path.resolve(process.cwd(), "dist/web/frontend/public"))
);

export { app as server };
