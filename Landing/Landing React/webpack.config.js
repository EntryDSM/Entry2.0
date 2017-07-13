var webpack = require('webpack');
var scrollToElement = require('scroll-to-element');
module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 3000,
        contentBase: __dirname + '/public'
    },

    module:
    {
        loaders: [
            {
                test: /\.js|.jsx$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders:[
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    }
};
