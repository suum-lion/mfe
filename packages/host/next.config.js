const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const packageJsonDeps = require("./package.json").dependencies;

module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new ModuleFederationPlugin({
          remotes: {
            remoteApp: "remoteApp@http://localhost:3002/remoteEntry.js",
            header: "header@http://localhost:3003/remoteEntry.js"
          },
          shared: {
            react: {
              eager: true,
              requiredVersion: packageJsonDeps["react"],
              singleton: true
            },
            "react-dom": {
              eager: true,
              requiredVersion: packageJsonDeps["react-dom"],
              singleton: true
            }
          }
        })
      ]
    };
  }
};
