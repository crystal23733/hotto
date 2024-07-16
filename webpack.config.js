const webpack = require('webpack');
const path = require("path");
const autoprefixer = require("autoprefixer");

const clientPath = path.join(__dirname, "src", "client", "ts");
const stylesPath = path.join(__dirname, "src", "client", "scss");

const config = {
  watch: true,
  entry: {
    main: `${clientPath}/thisWeek.ts`,
    join: `${clientPath}/join.ts`,
    pick: `${clientPath}/pick.ts`,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
              ],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.scss$/,
        include: stylesPath,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      __dirname: true, // __dirname을 문자열로 치환하여 정의
      process: true,   // process를 문자열로 치환하여 정의
    }),
  ]
};

module.exports = config;