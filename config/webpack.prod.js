"use strict";

let merge             = require('webpack-merge');
let webpack           = require('webpack');
let baseWebpackConfig = require("./webpack.base.js");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let WebpackMd5Hash    = require('webpack-md5-hash');

const  prodWebpackConfig = merge(baseWebpackConfig,{
    output:{
        publicPath    : "http://cdn.xxx.com/",
        filename      : 'js/[name].[chunkhash:8].js',
        chunkFilename : 'js/chunk.[name].[chunkhash:8].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new ExtractTextPlugin({
            filename  : 'css/[name].[contenthash:8].css',
            allChunks : true
        }),
        new WebpackMd5Hash(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
});

const outputDebug = (err, stats) => {

    if(err){
        console.err(err);
    }

    console.log(stats.toString({
        chunks : false,
        colors : true
    }));
};
webpack(prodWebpackConfig).run(outputDebug);