const path = require('path');
const webpack = require('webpack');


module.exports = {
    devServer: {
      contentBase:              './src/index.js',
      // contentBasePublicPath: path.resolve('./apiSettings'),
      // publicPath:            '../apiSettings',
      host:                     'localhost', //'localhost', 193.178.51.107
      port:                     10000,
      open:                     false,
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

    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        library: {
            name: 'TimeInput',
            type: 'umd'
        }
    },
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
        'moment/locale/ru.js': 'moment/locale/ru.js', 
        'moment/locale/uk.js': 'moment/locale/uk.js',
        'create-react-class': 'create-react-class',
        'css-loader': 'css-loader',
        'rc-util':  'rc-util',
        'prop-types': 'prop-types',
        // "@babel/plugin-proposal-class-properties": path.resolve('node_modules/@babel/plugin-proposal-class-properties')
    }
}
