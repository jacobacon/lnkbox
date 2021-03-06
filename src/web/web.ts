/**
 *
 * Main handler for setting up Express Webserver which powers the Frontend App and Backend API.
 */

import * as express from "express";
import * as bodyParser from "body-parser";

import * as morgan from "morgan";

import { apiRouter } from "./api/routes";

import * as path from "path";

//const expressCompress = require("express-static-gzip");

import * as expressCompress from "express-static-gzip";

const app = express();

// Only include Webpack Middleware in Dev-Mode
if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");

  const webpackConfig = require("../../build/webpack.dev");

  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}

app.use(bodyParser.json());
app.use(morgan("tiny"));

//Serve static content
app.use(
  "/",
  expressCompress(path.join(__dirname, "frontend/public/static"), {
    enableBrotli: true,
    orderPreference: ["br", "gzip"],
  })
);

app.use("/api", apiRouter);

export { app as server };
