const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    pathinfo: false,
    clean: true,
  },

  // Look at the deference between build time when you move a little bit in the project ( and delete this line )
  cache: false,

  devtool: "inline-source-map", // docs recommends "eval-cheap-module-source-map" for most cases

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  plugins: [
    new EnvironmentPlugin({
      API_KEY: "ADD_Yours_HERE",
      AUTH_DOMAIN: "ADD_Yours_HERE",
      PROJECT_ID: "ADD_Yours_HERE",
      STORAGE_BUCKET: "ADD_Yours_HERE",
      MESSAGING_SENDER_ID: "ADD_Yours_HERE",
      APP_ID: "ADD_Yours_HERE",
      MEASUREMENT_ID: "ADD_Yours_HERE",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },

  devServer: {
    static: "./dist",
    historyApiFallback: true,
    port: 3000,
  },
};
