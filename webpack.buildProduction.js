const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin');
const copyInfo = require('./copyInfo.js')

const outputPath = path.join(__dirname, '../bundleProdServer');
const copyConfig = copyInfo(outputPath);

const prodConf = merge(require('./webpack.buildConfig'), {

    output: {
        path: outputPath
    },
    devtool: 'none',
    plugins: [
        new CopyPlugin(copyConfig),
        new webpack.DefinePlugin({
            "DEVELOPMENT": JSON.stringify(false),
            "DEV_SERVER": JSON.stringify(false),
            "MASTER_SERVER": JSON.stringify(false),
            "PROD_SERVER": JSON.stringify(true),
            "VERSION_APP": JSON.stringify(require("../package.json").version)
        }),

    ],

    // optimization: {
    //     splitChunks: {
    //         minSize:  1024*1024*0.07,
    //         maxSize:  1024*1024*0.2,
    //     }
    // },
})
module.exports = prodConf
