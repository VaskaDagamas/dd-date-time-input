const webpack =                       require('webpack')
const path =                          require('path');
const merge =                         require('webpack-merge')
const ExtractTextPlugin =             require('extract-text-webpack-plugin');
const HtmlWebpackPlugin =             require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const versionApp = getVersiopn();

console.log('\x1b[33m%s\x1b[0m', "versionApp", versionApp)

module.exports = merge(require('./styleLoader'),
{
   context: path.join(__dirname, '../src'),
   name: 'clientApp',
   entry:
   {
      main: './entry.jsx',
      vendors: path.resolve('./vendors/entryForVendors.jsx'),
      services: path.resolve('./apiSettings/entrySettings.js'),
   },
   output:
   {
      path: path.resolve(__dirname, '../build'),
      filename: versionApp + '[name].js',
   },
   module:
   {
      rules: [
      {
         test: /\.(jsx|js)$/,
         exclude: /node_modules/||/vendors/,
         use: [
         {
            loader: 'babel-loader',
            options:
            {
               cacheDirectory: true,
            }
         }]
      }, ]
   },
   optimization:
   {
      // runtimeChunk: false,
      // noEmitOnErrors: false,
      // removeAvailableModules: false,
      // mergeDuplicateChunks: false,
      // concatenateModules: false,
      splitChunks:
      {
         maxInitialRequests: 20,
         minSize: 1024 * 1024 * 0.3, //300 kb
         maxSize: 1024 * 1024 * 0.35, //800 kb
         maxAsyncRequests: 20,
         chunks: "async",
         cacheGroups:
         {
            styles:
            {
               name: 'styles',
               test: /\.(scss|css)$/,
               chunks: 'all',
               enforce: true,
            },
            commons:
            {
               name: 'common' + versionApp,
               priority: 50,
               enforce: true,
            },
            vendors:
            {
               test: /node_modules/,
               chunks: "initial",
               priority: -10,
               name(module)
               {
                  // get the name. E.g. node_modules/packageName/not/this/part.js
                  // or node_modules/packageName
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                  // npm package names are URL-safe, but some servers don't like @ symbols
                  const packageNameInFileName = `${versionApp}vendor-${packageName.replace('@', '')}`;
                  return packageNameInFileName;
               },
               enforce: true,
            },
            default:
            {
               minChunks: 2,
               priority: -20,
               reuseExistingChunk: true
            }
         },
      },
   },
   resolve:
   {
      extensions: ['.js', '.jsx', '.scss', '.css'], //
      modules: [
         path.join(__dirname, '../src'),
         'node_modules',
         //'vendors'
      ],
   },
   node:
   {
      fs: "empty",
   },
   plugins: [

      new LodashModuleReplacementPlugin({
         'collections': true,
         'shorthands': true,
         'caching': true,
      }),
      new webpack.DefinePlugin({
         APP_VERSION: JSON.stringify(new String(versionApp)),
         "VERSION_APP": JSON.stringify(new String(versionApp))
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.NamedChunksPlugin(),
   ]

})


function getVersiopn() {
   let   versionApp = 'V-' + require("../package.json").version + '-';
         versionApp = versionApp.replace(/(\.|")/g, '-');
         return versionApp
}