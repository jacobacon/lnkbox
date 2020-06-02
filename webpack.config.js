const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/web/frontend/public/index.ts",
  mode: process.env.NODE_ENV || "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: "/node_modules/",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          esModule: false,
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
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
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/web/frontend/public"),
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
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
