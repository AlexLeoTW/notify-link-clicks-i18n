const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/background.ts",
    content_script: "./src/content_script.ts",
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    clean: true, // Clean the output directory before emit.
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    // extensions: [".ts", ".tsx", ".js", ".jsx"],
    // alias: {
    //   "@": "/src",
    // },
    plugins: [new TsconfigPathsPlugin()],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "public"),
        path.resolve(__dirname, "manifest.json"),
      ],
    }),
  ],

  devtool: "inline-source-map",
  mode: "development",
};
