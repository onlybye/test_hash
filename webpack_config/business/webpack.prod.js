const path = require('path')
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const NamedChunksPlugin = require('webpack/lib/NamedChunksPlugin');
const helpers = require('../helpers');
/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = function (options) {
    return webpackMerge(commonConfig({ env: ENV }), {
        mode: 'production',
        plugins: [
            new HashedModuleIdsPlugin(),
            new NamedChunksPlugin(
                chunk => chunk.name || Array.from(chunk.modulesIterable, m => m.id).join("_")
            ),
            
        ],
        entry: {
            app: [ './src/index.js']
        },
        output: {
            libraryTarget: 'umd',
            library: '[name]',
            umdNamedDefine: true,
            path: helpers.appBuild,
            filename: '[name].[contenthash:8].js',
            chunkFilename: '[name].[contenthash:8].js',
            publicPath: helpers.publicServerBase
        },
    });
}