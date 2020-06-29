/// <reference path="webpack.config.d.ts" />

import ExtractCssChunksPlugin from 'extract-css-chunks-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { resolve } from 'path';
import { Configuration, DefinePlugin } from 'webpack';

type Mode = 'development' | 'production';

const generate_configuration = (mode: Mode): Configuration => ({
	name: mode,
	mode,

	devtool: mode === 'development' ? 'eval-source-map' : false,

	entry: resolve(__dirname, 'src', 'index.tsx'),

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loaders: [
					{
						loader: 'ts-loader',
						options: {
							configFile: resolve(__dirname, 'src', 'tsconfig.json'),
						},
					},
				],
			},
			{
				test: /\.scss$/,
				loader: [
					mode === 'development' ? 'style-loader' : ExtractCssChunksPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: mode === 'development',
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: mode === 'development',
						},
					},
				],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname, 'src', 'index.html'),
		}),
		...(mode === 'production' ? [new ExtractCssChunksPlugin(), new OptimizeCssAssetsPlugin()] : []),
		new DefinePlugin({
			__DEBUG__: JSON.stringify(mode === 'development'),
		}),
	],

	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		alias: {
			'@utils': resolve(__dirname, 'src', 'utils'),
			'@components': resolve(__dirname, 'src', 'components'),
		},
	},

	output: {
		path: resolve(__dirname, 'dist'),
	},

	devServer: {
		contentBase: resolve(__dirname, 'public'),
		overlay: true,
		port: 8080,
		historyApiFallback: true,
	},
});

export default [generate_configuration('development'), generate_configuration('production')];
