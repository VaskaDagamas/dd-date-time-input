const webpack =                 require('webpack');
const merge =                   require('webpack-merge')
const path =                    require('path');
const DashboardPlugin =         require('webpack-dashboard/plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin =       require('html-webpack-plugin');
const EntrypointsPlugin =       require('webpack-entrypoints-plugin')
const CopyPlugin =              require('copy-webpack-plugin');

module.exports = merge(require('./webpack.config'), {
   devtool: "source-map", //'cheap-module-source-map', //"source-map", //
   mode: 'development',
   devServer: {
      contentBase:              path.resolve(__dirname, '../src'),
      // contentBasePublicPath: path.resolve('./apiSettings'),
      // publicPath:            '../apiSettings',
      host:                     'localhost', //'localhost', 193.178.51.107
      port:                     9000,
      open:                     true,
      https:                    false,
      compress:                 false,
      hot:                      true,

      clientLogLevel:           'warning', //'none', //'warning',

      // useLocalIp:         true,
      // watchContentBase:       true,
      // overlay:                true,
      // https:                 false,
      // compress:              false,
   },
   plugins: [
      new DashboardPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin({
         "DEVELOPMENT":   JSON.stringify(true),
         "DEV_SERVER":    JSON.stringify(true),
         "MASTER_SERVER": JSON.stringify(false),
         "PROD_SERVER":   JSON.stringify(false),
         "VERSION_APP":   JSON.stringify(require("../package.json").version)
      }),

      new HtmlWebpackPlugin({
         inject:   true,
         hash:     true,
         template: 'index.template.html',
         filename: 'index.html',
      }),
      new CopyPlugin([
         { from: path.resolve(__dirname, '../vendors'), to: 'vendors' },
         { from: path.resolve(__dirname, '../workers'), to: 'workers' },
         // { from: 'other', to: 'public' },
      ]),
      new HardSourceWebpackPlugin({ //https://github.com/mzgoddard/hard-source-webpack-plugin
         cacheDirectory: 'cache/HardSource/[confighash]',
         cachePrune: {
            sizeThreshold: 1300 * 1024 * 1024, //1300 mb
            maxAge:        2 * 24 * 60 * 60 * 1000 //two days
         },
         info: {
            // 'none' or 'test'.
            mode: 'none',
            // 'debug', 'log', 'info', 'warn', or 'error'.
            level: 'debug',
         },
         // environmentHash: {
         //    root: process.cwd(),
         //    directories: [],
         //    files: ['package-loc.kjson', 'yarn.lock'],
         // },
         // configHash: function(webpackConfig) {
         //    // node-object-hash on npm can be used to build this.
         //    return require('node-object-hash')({ sort: false }).hash(webpackConfig);
         // }
      }),

      new webpack.ContextReplacementPlugin( //for ignore not requirement elem
         /moment[/\\]locale$/,
         /ru|uk|en/
      ),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
   ]
})
