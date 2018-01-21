const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const appRoot = require('app-root-path');

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    allChunks: true
});

const extractSassBootstrap = new ExtractTextPlugin({
    filename: "vender.css"
});

const config = {
    context: path.resolve(__dirname, './client'),
    entry: {
        vendor: [
            'jquery',
            'bootstrap',
            'moment',
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'redux',
            'react-redux',
            'redux-saga'
        ],
        main: './main.tsx',
        index: './index.html'
    },
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: './dist/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            'client': path.resolve(__dirname, './client')
        }
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                    {
                        loader: 'extract-loader',
                        options: {
                            publicPath: './dist'
                        }
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: true,
                            collapseWhitespace: true
                        }
                    },
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    configFile: path.resolve(__dirname, './tsconfig.client.json')
                }
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /bootstrap/],
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 2,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: require.resolve('./node_modules/jquery/dist/jquery.js'),
                loader: 'expose-loader?$!expose-loader?jQuery'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            options: {
                context: __dirname
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module, count) {
                return module.resource && module.resource.indexOf('node_modules') !== -1
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
            minChunks: 3
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        extractSass
    ]
}

module.exports = config;