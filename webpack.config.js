/**
 * Created by Pathik on 06-01-2017.
 */
let path = require('path');
let webpack = require('webpack');
let HTMLWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");


let DEVELOPMENT = process.env.NODE_ENV === 'dev';
let PRODUCTION = process.env.NODE_ENV === 'prod';

//plugins
let plugins = PRODUCTION
    ? [
        new webpack.optimize.UglifyJsPlugin(),
    ] : [
        new HTMLWebpackPlugin({
            template: './demo/index.html'
        }),
    ];


//add default data
plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    })
);

//add template file
plugins.push(
    new ExtractTextPlugin("jq.select.min.css")
);


let entry = PRODUCTION ?
    [
        './src/plugin.js' //startup file of application
    ] :
    [
        './demo/index.js', //startup file of application
        'webpack-dev-server/client?http://localhost:8080'
    ];


module.exports = {
    devtool: PRODUCTION ? '' : 'source-map',
    plugins: plugins,
    entry: entry,
    output: {
        path: PRODUCTION ? path.join(__dirname, 'dist') : path.join(__dirname, 'demo'),
        publicPath: '',
        filename: "jq.select.min.js"
    },


    module: {
        loaders: [
            //es6 loader
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },

            //html loader
            {
                test: /\.html$/,
                loader: 'html',
                query: {
                    minimize: true
                }
            },

            //image loader
            {test: /\.(jpg|png)$/, loader: "file-loader?name=img/[name].[hash:12].[ext]"},


            //sass loader
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!resolve-url-loader!sass-loader?sourceMap&sourceMapContents")
            },

            //font loader
            {test: /\.ttf$/, loader: 'file?mimetype=application/x-font-ttf&name=font/[name].[hash:12].[ext]'},

        ]
    },
    htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/],
        root: path.resolve(__dirname, 'assert'),
        attrs: ['img:src', 'link:href']
    }
};


