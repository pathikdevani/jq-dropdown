/**
 * Created by Pathik on 06-01-2017.
 */
let WebpackDevServer = require("webpack-dev-server");
let webpack = require('webpack');
let config = require('./webpack.config.js');

let compiler = webpack(config);
let server = new WebpackDevServer(compiler, {
    inline: true,
    progress: true,
    contentBase: "./demo",
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
});

server.listen(8080, 'localhost', function () {
});
