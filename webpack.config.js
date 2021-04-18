const path = require('path');
const webpack = require('webpack');
const WrapperPlugin = require('wrapper-webpack-plugin');
module.exports = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        library: {
            name: 'TimeInput',
            type: 'umd'
        }
    },
    entry: './src/index.js',
    module: {
        rules: [{
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
    },

    externals: {
        'react': 'react',
        'react-click-outside': 'react-click-outside',
        'react-dom': 'react-dom',
        'moment': 'moment',
        'create-react-class': 'create-react-class',
        // "@babel/plugin-proposal-class-properties": path.resolve('node_modules/@babel/plugin-proposal-class-properties')
    }
    // plugins: [
    //     new WrapperPlugin({
    //       test: /\.js$/,
    //       // header: ('(function umdWrapper(root, factory) {' +
    //       //   '  if(typeof exports === "object" && typeof module === "object")' +
    //       //   '    module.exports = factory().default;' +
    //       //   '  else if(typeof define === "function" && define.amd)' +
    //       //   '    define("NAME", [], function() { return factory().default; });' +
    //       //   '  else if(typeof exports === "object")' +
    //       //   '    exports["NAME"] = factory().default;' +
    //       //   '  else' +
    //       //   '    root["NAME"] = factory().default;' +
    //       //   '})(this, function() {' +
    //       //   'return ').replace(/NAME/g, 'dd-date-time-input'), // this is the name of the lib
    //       // footer: '\n})',
    //     }),
    //   ]
    /*    output:
        {
           path: './dist',
           filename: '[name].js',
        },*/
    // optimization: {
    //     // runtimeChunk: false,
    //     // noEmitOnErrors: false,
    //     // removeAvailableModules: false,
    //     // mergeDuplicateChunks: false,
    //     // concatenateModules: false,
    //     splitChunks: {
    //         maxInitialRequests: 20,
    //         minSize: 1024 * 1024 * 0.2, //300 kb
    //         maxSize: 1024 * 1024 * 0.35, //800 kb
    //         maxAsyncRequests: 20,
    //         chunks: "async",
    //         cacheGroups: {
    //             styles: {
    //                 name: 'styles',
    //                 test: /\.(scss|css)$/,
    //                 chunks: 'all',
    //                 enforce: true,
    //             },
    //             commons: {
    //                 name: 'common',
    //                 priority: 50,
    //                 enforce: true,
    //             },
    //             vendors: {
    //                 test: /node_modules/,
    //                 chunks: "initial",
    //                 priority: -10,
    //                 name(module) {
    //                     // get the name. E.g. node_modules/packageName/not/this/part.js
    //                     // or node_modules/packageName
    //                     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //                     // npm package names are URL-safe, but some servers don't like @ symbols
    //                     const packageNameInFileName = `vendor-${packageName.replace('@', '')}`;
    //                     return packageNameInFileName;
    //                 },
    //                 enforce: true,
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             }
    //         },
    //     },
    // },
}