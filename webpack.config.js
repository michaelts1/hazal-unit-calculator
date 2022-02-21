// @ts-nocheck
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				include: /src/,
				test: /\.js$/,
			},
			{
				include: /src/,
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		extensions: [
			'.js',
			'.vue',
		],
		alias: {
			vue: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
		},
	},
	plugins: [
		new VueLoaderPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: 'src/index.html' },
				{ from: 'src/*.png', to: '[name].png' },
			],
		}),
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: JSON.stringify(true),
			__VUE_PROD_DEVTOOLS__: JSON.stringify(true),
		}),
	],
}

module.exports = config
