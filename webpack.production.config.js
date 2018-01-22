const webpack = require('webpack');
const config = require('./webpack.default.config');
const CompressionPlugin = require("compression-webpack-plugin");

/*
//Enable this section to analysis the application
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.plugins = config.plugins.concat([
  new BundleAnalyzerPlugin()
]);
*/


config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
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
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new CompressionPlugin({
    //     asset: "[path].gz[query]",
    //     algorithm: "gzip",
    //     test: /\.js$|\.css$|\.html$/,
    //     threshold: 10240,
    //     minRatio: 0.8,
    //     deleteOriginalAssets: true
    // })
]);

module.exports = config;