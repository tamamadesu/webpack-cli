"use strict";

let fs                    = require('fs');
let config                = require("../config");
let webpack               = require('webpack');
let ExtractTextPlugin     = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin     = require('html-webpack-plugin');
let WebpackNotifierPlugin = require('webpack-notifier');
let CopyWebpackPlugin     = require('copy-webpack-plugin');

let env        = config.npmCmd;
let basePath   = config.basePath;
let arrArgv    = config.arrArgv;
let outputPath = config[env].outputPath;
let srcDir     = basePath + '/src/js/';

let exportConfig = {
    entry:{
        app: config.basePath + "/src/js/index.js"
    },
    output: {
        path          : outputPath,
        jsonpFunction :'starCityJsonp',
        filename      : 'js/[name].js',
        chunkFilename : 'js/chunk_[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': basePath + '/node_modules/vue/dist/vue.min.js'
        }
    },
    externals: {
        'jquery': 'jQuery',
        '$': 'jQuery'

    },
    // 推荐用 source-map，和打包文件分开，避免单文件过大的问题，但是目前chrome对sourcemap支持有bug，等以后修复
    devtool: env == 'dev' ? 'source-map' : false, //source-map
    performance: {
        hints: env == 'dev' ? false : "warning"
    },
    module: {
        rules:[{
                test    : /\.js$/,
                exclude : /(node_modules|bower_components)/,
                loader  : 'babel-loader',
                include : basePath
            },{
                test    : /\.css$/,
                loader  : ExtractTextPlugin.extract({fallback:'style-loader', loader:'css-loader?sourceMap!postcss-loader'}),
                include : basePath
            },{
                test    : /\.sass$/,
                loader  : ExtractTextPlugin.extract({fallback:'style-loader', loader:'css-loader?sourceMap!postcss-loader!sass-loader?indentedSyntax'}),
                include : basePath
            },{
                test    : /\.vue$/,
                loader  : 'vue-loader',
                options : {
                    postcss : [require('postcss-cssnext')()],
                    loaders : {
                        css  : ExtractTextPlugin.extract({loader: 'css-loader?sourceMap'}),
                        sass : ExtractTextPlugin.extract({loader: 'css-loader?sourceMap!sass-loader?indentedSyntax' })
                    },
                }
            },{
                test   : /\.pug$/,
                loader : "pug-loader",
                options: {
                    pretty: env == 'dev' ? true : false
                }
            },{
                test   : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader : 'url-loader',
                options: {
                    limit : 10000,
                    name  : env == 'dev' ? 'img/[name].[ext]' : 'img/[name].[hash:7].[ext]'
                }
            },{
                test   : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader : 'url-loader',
                options: {
                    limit : 10000,
                    name  : env == 'dev' ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins:[
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([
            { from: basePath + '/src/html' }
        ]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new WebpackNotifierPlugin({excludeWarnings: true}),
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(env)
        })
    ]
};

const getAllEnteyWithHtml = (arrArgv) => {

    let entrys = {};

    fs.readdirSync(srcDir).forEach(function(file){
        let name = file.slice(0,file.lastIndexOf('.'));
        entrys[name] = srcDir + file;
    });

    if(arrArgv.length){
        let custom_entrys = {};
        arrArgv.forEach(function(src){
            if(!entrys[src]){
                throw new Error('参数错误，检查 src/js/');
            }else{
                custom_entrys[src] = entrys[src];
            }
        });

        entrys = custom_entrys;
    }

    for(var i in entrys){
        let filename = `${outputPath}/${i}.html`;

        exportConfig.plugins.push(new HtmlWebpackPlugin({
            filename : filename,
            template : `${basePath}/src/tmpl/${i}.pug`,
            inject   : 'body',
            chunks   : [i]
        }));
    }

    exportConfig.entry = entrys;
};


getAllEnteyWithHtml(arrArgv);

module.exports = exportConfig;
