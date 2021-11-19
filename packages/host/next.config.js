const { NodeModuleFederation } = require("@telenko/node-mf");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const packageJsonDeps = require("./package.json").dependencies;

module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;

    return {
      ...config,
      plugins: [
        ...config.plugins,
        new (isServer ? NodeModuleFederation : ModuleFederationPlugin)({
          remotes: {
            remoteApp: isServer
              ? "remoteApp@http://localhost:3002/node/remoteEntry.js"
              : "remoteApp@http://localhost:3002/web/remoteEntry.js"
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
