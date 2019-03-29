const path = require('path');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const helpers = require('../helpers');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true';
/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = function (options) {
    return webpackMerge(commonConfig({
        env: ENV
    }), {
        entry: {
            app: [hotMiddlewareScript, './src/index.js'],
            home_themes: [
                path.resolve(`./webpack_config/theme_config/${helpers.themeDir}/app_css.js`)
            ],
        },
        output: {
            libraryTarget: 'umd',
            library: '[name]',
            umdNamedDefine: true,
            path: helpers.appBuild,
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].js',
            publicPath: helpers.publicServerBase
        },
        mode: "development"
    });
}
