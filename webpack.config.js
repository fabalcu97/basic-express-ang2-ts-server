var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		server: './src/server/index.ts'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'dist')
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false,
	},
	module: {
		loaders: [
			{ test: /\.json$/,  loader: 'json-loader' },        
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{ test: /\.node$/, loader: 'node-loader' }
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".webpack.js", ".web.js", ".js", ".node"]
	},
	plugins: []
};