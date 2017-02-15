"use strict";

let merge             = require('webpack-merge');
let config            = require('./index');
let webpack           = require('webpack');
let baseWebpackConfig = require("./webpack.base.js");
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

const  devWebpackConfig = merge(baseWebpackConfig,{

    output:{
        publicPath : "/static/",
        sourceMapFilename: 'sourceMap/[file].map'
    },
    plugins: [
        new ExtractTextPlugin({
            filename  : 'css/[name].css',
            allChunks : true
        }),
        new BrowserSyncPlugin({
            host   : 'localhost',
            port   : config.dev.liveReloadPort,
            proxy  : config.dev.proxyUrl ? config.dev.proxyUrl : false,
            server : config.dev.proxyUrl ? false : { baseDir: [config.dev.outputPath] }
        })
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

webpack(devWebpackConfig).watch(null,outputDebug);


