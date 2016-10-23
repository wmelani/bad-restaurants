var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var globalConfig = require('../config.json');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    },
    inline : true,
    proxy: {
        "/api/**" : globalConfig.server.protocol + "://" + globalConfig.server.host + ":" + globalConfig.server.port + globalConfig.server.root
    }
}).listen(8080, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});