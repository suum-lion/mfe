const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: `http://localhost:3003/`,
    clean: true
  },
  devServer: {
    compress: true,
    port: 3003
  },
  resolve: {
    extensions: [
      ".jsx",
      ".js",
      ".json",
    ]
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
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
        test: /\.jsx?$/,
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
      name: "header",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx",
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
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
