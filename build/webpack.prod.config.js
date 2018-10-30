const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const os = require('os');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');

fs.open('./src/config/env.js', 'w+', function(err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});


// 环境变量的使用
function get_env(name, de = '') {
    if (typeof process.env[name] != 'string') {
        return de;
    }
    return process.env[name];
}


const APP_BASE_URL = get_env('APP_BASE_URL', 'http://demo01.xingshuwangluo.com'); //api的请求地址
const APP_SITE_URL = get_env('APP_SITE_URL', 'http://demo01.xingshuwangluo.com'); //附件的请求地址
const APP_SHARE_URL = get_env('APP_SHARE_URL', 'http://demo01.hbz.2xso.com'); //web版本的地址
const APP_SCOKET_URL = get_env('APP_SCOKET_URL', 'ws://192.168.1.220:34504/'); //web版本的地址
const APP_DOWNLOAD_URL = get_env('APP_DOWNLOAD_URL', 'http://wgjappd.s115.psd1412.com'); //apk下载地址
const APP_VALIDATION_URL = get_env('APP_VALIDATION_URL', 'http://wgjappd.s115.psd1412.com'); //
const APP_EDITOR_URL = get_env('APP_EDITOR_URL', 'http://article_edit.s217.psd1412.com'); //

fs.open('./src/config/xitong.js', 'w+', function (err, fd) {
    let buf2 = `export default {
        base_url: "${APP_BASE_URL}",
        share_url : "${APP_SHARE_URL}",
        download_url : "${APP_DOWNLOAD_URL}",
        validation_url : "${APP_VALIDATION_URL}",
        site_url: "${APP_SITE_URL}",
        editor_url: "${APP_EDITOR_URL}",
        scoket_url: "${APP_SCOKET_URL}"
    };`;
    fs.write(fd, buf2, 0, buf2.length);
});





module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',  // 修改 https://iv...admin 这部分为你的服务器域名 
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'vendors',
            // filename: 'vendors.[hash].js'
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new UglifyJsParallelPlugin({
        //     workers: os.cpus().length,
        //     mangle: true,
        //     compressor: {
        //       warnings: false,
        //       drop_console: true,
        //       drop_debugger: true
        //      }
        // }),
        new CopyWebpackPlugin([
            {
                from: 'td_icon.ico'
            },
            {
                from: 'src/styles/fonts',
                to: 'fonts'
            },
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
            {
                from: 'src/views/my-components/text-editor/tinymce'
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            favicon: './td_icon.ico',
            filename: '../index.html',
            template: '!!ejs-loader!./src/template/index.ejs',
            inject: false
        })
    ]
});