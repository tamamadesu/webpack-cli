"use strict";

let path     = require('path');
let basePath = path.resolve(__dirname, '../');

const config = {
    npmCmd   : process.env.npm_lifecycle_event,  // 执行命令
    arrArgv  : require('optimist').argv._,   // 传递参数
    basePath : basePath,
    dev: {
        outputPath     : basePath + "/dist",
        liveReloadPort : 3000,
        server: true         // 默认预览dist目录
        // proxyUrl       : 'http://xxx.com'
    },
    build: {
        outputPath: basePath + "/build"
    }
};

module.exports = config;
