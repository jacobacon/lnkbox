const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const path = require("path");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CompressionPlugin({
      filename(info) {
        console.log(info.path);
        return `${info.path}.gz${info.query}`;
      },
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.svg$|\.ttf$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      filename(info) {
        console.log(info.path);
        return `${info.path}.gz${info.query}`;
      },
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.svg$|\.ttf$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyPlugin([
      {
        from: path.resolve(process.cwd(), "src/web/frontend/public/static"),
        to: path.resolve(process.cwd(), "dist/web/frontend/public/static"),
        ignore: ["*.ts", "*.scss", "*.vue"],
      },
    ]),
  ],
});
