
const path = require('path');
const webpack = require('webpack');
const helpers = require('../helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = function (options) {
    return {
        optimization: {
            splitChunks: {
                cacheGroups: {         
                    vendor: {
                        name: "vendor",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "all",
                        priority: 10
                    }
                }
            }
        },

        externals: [
           {
            // jquery: "jquery"
           }
        ],
        resolve: {
            extensions: ['.js', '.json'],
            modules: [
                helpers.root('src'),
                helpers.root('lib'),
                helpers.root('node_modules')
            ],
            alias: {
                "src": helpers.root("src"),
            }
            
        },

        module: {
            rules: [{
                    test: /\.json$/,
                    loaders: [
                        'json-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loaders: [
                        'ng-annotate-loader',
                        'babel-loader'
                    ]
                },
                {
                    test: require.resolve('jquery'), // 注意 这里是require的resolve 方法
                    use: [{
                        loader: "expose-loader",
                        options: "jQuery"
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }
            ]
        },
        plugins: [
            new cleanWebpackPlugin(['dist'], {
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                inject: true
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: () => [autoprefixer]
                },
                debug: true
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'window.$': 'jquery',
                _: 'underscore'
            }),
            // new CopyWebpackPlugin(helpers.staticCopyArray()),
            new DefinePlugin({
                'WEBPACK_THEME': JSON.stringify(helpers.consoleTheme),
            })
        ],

        devtool: 'source-map',
        node: {
            fs: 'empty'
        }   
    }
};
