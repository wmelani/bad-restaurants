const express = require('express');
const app = express();
const historyMiddleware = require('connect-history-api-fallback');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const httpProxyMiddleware = require('http-proxy-middleware');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const globalConfig = require('../config.json');


app.use(httpProxyMiddleware('/api/**', {
    target : globalConfig.server.protocol
    + "://"
    + globalConfig.server.host
    + ":"
    + globalConfig.server.port
    + globalConfig.server.root
}));
app.use(historyMiddleware());


app.use(express.static(__dirname));
app.use(devMiddleware(compiler,  {
    noInfo: true
}));
app.use(hotMiddleware(compiler));

app.listen(8080);
