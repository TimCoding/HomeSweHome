const webpack = require('webpack');
const config = {
    entry:  __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '../server/static/',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
};
module.exports = config;
