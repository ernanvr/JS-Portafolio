const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
	},

	mode: 'development',

	// watch: true,

	resolve: {
		extensions: ['.js'],
		alias: {
			Utilities: path.resolve(__dirname, './src/utils'),
			Styles: path.resolve(__dirname, './src/styles'),
			Templates: path.resolve(__dirname, './src/templates'),
			Images: path.resolve(__dirname, './src/assets/images'),
			Fonts: path.resolve(__dirname, './src/assets/fonts'),
		},
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$|\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.png$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[hash][ext][query]',
				},
			},
			{
				test: /\.(woff|woff2)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[hash][ext][query]',
				},
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/main.css',
		}),
		new Dotenv(),
		new BundleAnalyzerPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 3006,
	},
};
