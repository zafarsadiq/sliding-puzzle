const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module:{
		rules:[
			{
				test: /\.js$/,
				exclude: /node_module/,
				use:{
					loader: 'babel-loader',
					options: {
					  presets: ['@babel/preset-env', '@babel/preset-react'],
					}
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader','css-loader']
			}
				
		]
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'src/index.html'
	})],
	mode: 'development'
}