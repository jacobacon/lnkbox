const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: [
    "webpack-hot-middleware/client",
    "./src/web/frontend/public/index.ts",
  ],
  mode: process.env.NODE_ENV || "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        include: path.resolve(__dirname, "src"),
        exclude: "/node_modules/",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, "src"),
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, "src"),
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        //include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
    },
  },
  optimization: {
    minimize: process.env.NODE_ENV === "production",
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/web/frontend/public"),
    publicPath: "/",
  },
  devtool: "inline-source-map",
  output: {
    filename: "[name].[hash].bundle.js",
    path: path.resolve(__dirname, "dist/web/frontend/public"),
    publicPath: "/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    //Accessible at http://localhost:8888
    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.NODE_ENV === "development" ? "server" : "disabled",
      openAnalyzer: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/web/frontend/index.template.html"),
    }),
    new CompressionPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "src/web/frontend/public"),
        to: path.resolve(__dirname, "dist/web/frontend/public"),
        ignore: ["*.ts", "*.scss", "*.vue"],
      },
    ]),
    new VueLoaderPlugin(),
  ],
};
