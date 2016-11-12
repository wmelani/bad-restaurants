var path = require('path');
var webpack = require('webpack');
var dir_js = path.resolve(__dirname, '../app');
var dir_build = path.resolve(__dirname, '../dist');
module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        "babel-polyfill",
        path.resolve(dir_js + '/index.js')
    ],
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    target: "web",
    module: {
        rules : [
            {
                loader: 'file?name=assets[name].[ext]',
                test: /\.png($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/
            },
            {
                test: /\.js($|\?)|\.jsx($|\?)/,
                include: [
                    dir_js
                ],
                exclude : [
                    'node_modules'
                ],
                loader : "babel"

            },
            {
                loader: 'file?name=/[name].html',
                test: /\.html$/
            },
            {
                test: /\.s?css$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    devtool: "source-map"
};
