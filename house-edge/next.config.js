// next.config.js
module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      });
      return config;
    },
  };
  