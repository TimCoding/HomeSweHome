const webpack = require('webpack');
const config = {
    entry:  __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '/../server/static/js/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/,         // Match both .js and .jsx files
            exclude: /node_modules/,
            use: "babel-loader"
        }]
    },
		externals: {
			'react/addons': true,
			'react/lib/ExecutionEnvironment': true,
			'react/lib/ReactContext': true
		}
};
module.exports = config;
