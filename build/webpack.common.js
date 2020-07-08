const path = require("path");
const webpack = require("webpack");

const VueLoaderPlugin = require("vue-loader/lib/plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: [
    path.join(process.cwd(), "/src/web/frontend/public/index.ts"),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        include: path.resolve(process.cwd(), "src"),
        exclude: "/node_modules/",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(process.cwd(), "src"),
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
        include: path.resolve(process.cwd(), "src"),
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        //include: path.resolve(process.cwd(), "src"),
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(process.cwd(), "src"),
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
  output: {
    filename: "[name].[hash].bundle.js",
    path: path.resolve(process.cwd(), "dist/web/frontend/public"),
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(
        process.cwd(),
        "src/web/frontend/index.template.html"
      ),
    }),
    new VueLoaderPlugin(),
  ],
};
