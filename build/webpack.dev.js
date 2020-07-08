const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const path = require("path");
const webpack = require("webpack");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "development",
  entry: ["webpack-hot-middleware/client"],
  devServer: {
    contentBase: path.join(process.cwd(), "dist/web/frontend/public"),
    publicPath: "/",
  },
  devtool: "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //Accessible at http://localhost:8888
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      openAnalyzer: false,
    }),
  ],
});
