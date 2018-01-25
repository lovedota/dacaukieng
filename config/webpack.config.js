const config = require('./webpack.default.config');
const WebpackShellPlugin = require('webpack-shell-plugin');

config.devtool = 'source-map';

config.plugins = config.plugins.concat([
  new WebpackShellPlugin({
    onBuildStart:['echo "Webpack Start"', 'rm -rf public/dist'],
    onBuildEnd:['echo "Webpack End"', 'nodemon server/main.ts']
  })
]);

module.exports = config;