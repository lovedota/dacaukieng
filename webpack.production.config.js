const webpack = require('webpack');
const config = require('./webpack.default.config');

/* Enable this section to analysis the application
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.plugins = config.plugins.concat([
  new BundleAnalyzerPlugin()
]);
*/

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
            warnings: false, // Suppress uglification warnings
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true
        },
        output: {
            comments: false,
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
    })
]);

module.exports = config;