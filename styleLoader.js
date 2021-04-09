console.log('\x1b[33m%s\x1b[0m', "STYLE LOADER  - type of compilation", process.env.NODE_ENV)
const devServer = process.env.NODE_ENV == 'development';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
	module: {
		rules: [{
				test: /\.(scss|css)$/,
				use: [ //'cache-loader',
					devServer ? {
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							// reloadAll: true,
							cacheDirectory: devServer,
						},
					} :
					'style-loader',
					{
						loader: 'css-loader?url=false',
					},
					devServer ? {
						loader: 'sass-loader',
						options: {
							// insertAt: 'top', //Insert style tag at top of <head>
							// singleton: true, //this is for wrap all your style in just one style tag
							sourceMap: true,
							convertToAbsoluteUrls: true,
							cacheDirectory: true,
						}
					} : {
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(gif|png|ico|svg|jpe?g)$/,
				exclude: path.resolve(__dirname, 'src/jsxImages'),
				use: [{
					loader: 'url-loader',
					options: {
						// limit: 8192,
						cacheDirectory: true,
					}
				}]
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css',
			ignoreOrder: true, // Enable to remove warnings about conflicting order
		}),
	],
};
