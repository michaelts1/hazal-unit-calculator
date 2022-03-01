// @ts-nocheck
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
	mode: 'development',

	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},

	module: {
		rules: [
			{
				include: /src/,
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				include: /src/,
				test: /\.(t|j)sx?$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				include: /src/,
				test: /\.s?css$/,
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
			'.ts',
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

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 5500,
	},
}

module.exports = config
