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
          remotes: {},
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
