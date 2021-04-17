module.exports = {
    module: {
        rules: [{
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
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