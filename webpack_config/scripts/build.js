const webpack = require("webpack");
const webpackConfig = require("../business/webpack.prod.js");
const errHandler = require('./webpackErrorHandler');
let theme = process.argv.splice(2)[0];
theme = (theme==undefined)? "hws":theme;
const compiler = webpack(webpackConfig());
compiler.run(errHandler);