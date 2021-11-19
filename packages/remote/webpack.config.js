const HtmlWebpackPlugin = require("html-webpack-plugin");
const { NodeAsyncHttpRuntime } = require("@telenko/node-mf");
const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const packageJson = require("./package.json");

const getConfig = target => ({
  entry: "./src/index.tsx",
  target: target === "web" ? "web" : false,
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    path: path.resolve(__dirname, "dist", target),
    publicPath: `http://localhost:3002/${target}/`,
    clean: true
  },
  devServer: {
    compress: true,
    port: 3002
  },
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".js",
      ".json",
      ".css",
      ".scss",
      ".jpg",
      ".jpeg",
      ".png",
      ".svg"
    ]
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true
        }
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        loader: "url-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
        "./SmartButton": "./src/SmartButton.tsx",
        "./Logo": "./src/Logo.tsx"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies["react"]
        },
        "react-dom": {
          singleton: true,
          requiredVersion: packageJson.dependencies["react-dom"]
        }
      }
    }),
    ...(target === "web"
      ? [
          new HtmlWebpackPlugin({
            template: "./public/index.html"
          })
        ]
      : [new NodeAsyncHttpRuntime()])
  ]
});

module.exports = [getConfig("web"), getConfig("node")];
