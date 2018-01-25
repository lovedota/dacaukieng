const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const appRoot = require('app-root-path');

const extractSass = new ExtractTextPlugin({
    filename: "assets/style.css",
    allChunks: true
});

const ManifestPlugin = require('webpack-manifest-plugin');

const config = {
    context: path.resolve(appRoot.path, './client'),
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
        path: path.resolve(appRoot.path, './public/'),
        filename: 'assets/[name].[hash].js',
        chunkFilename: 'assets/[name].[chunkhash].chunk.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            'client': path.resolve(appRoot.path, './client')
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
                             publicPath: "../"
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
                    configFile: path.join(appRoot.path,  './tsconfig.client.json')
                }
            },
            {
                test: /\.scss$/,
                exclude: [path.resolve(appRoot.path, 'client', 'modules'), path.resolve(appRoot.path, 'client', 'common')],
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(appRoot.path, 'config', 'postcss.config.js')
                                }
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.scss$/,
                exclude: [path.resolve(appRoot.path, 'client', 'main.scss')],
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
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(appRoot.path, 'config', 'postcss.config.js')
                                }
                            }
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
                    limit: 10000,
                    outputPath: './assets/images/',
                    publicPath: '/assets/images/'
                }
            },
            {
                test: path.resolve(appRoot.path, './node_modules/jquery/dist/jquery.js'),
                loader: 'expose-loader?$!expose-loader?jQuery'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module, count) {
                return module.resource && module.resource.indexOf('node_modules') !== -1
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new ManifestPlugin(),
        extractSass
    ]
}

module.exports = config;