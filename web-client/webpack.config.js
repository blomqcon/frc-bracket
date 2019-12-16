const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  return {
    entry: "./index.tsx",
    context: path.resolve(__dirname, "src"),
    devtool: "source-map",
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },
    output: {
      path: path.resolve(__dirname, "wwwroot"),
      filename: "bundle.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "./index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css"
      }),
      new Dotenv({
        path: './local.env',
        safe: './defaults.env',
        defaults: './defaults.env'
      })
    ],
    module: {
      rules: [
        {
          test: /\.ts(x)$/, // Can we run tslint on tsx files?
          enforce: "pre",
          use: [
            {
              loader: "tslint-loader",
              options: {
                fix: true
              }
            }
          ]
        },
        {
          test: /\.ts(x)?$/,
          use: ["ts-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  // publicPath is the relative path of the resource to the context
                  // e.g. for ./css/admin/main.css the publicPath will be ../../
                  // while for ./css/main.css the publicPath will be ../
                  return path.relative(path.dirname(resourcePath), context) + '/';
                },
              },
            },
            "css-loader"
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-url-loader'
        },
        {
          test: /\.jpg|\.png|\.cur|\.gif$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "./resources",
                publicPath: "/resources"
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
      hot: true,
      overlay: true,
      progress: true,
      port: 8080,
      // host: "dev.whiteboard.microsoft.com",
      // https: {
      //   key: fs.readFileSync('../../DevCert/devCert.pem'),
      //   cert: fs.readFileSync('../../DevCert/devCert.crt')
      // },
      publicPath: '/',
      index: 'index.html',
      historyApiFallback: true,
      // writeToDisk: true
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      // }
    }
  }
};
