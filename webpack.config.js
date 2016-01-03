/* eslint-disable */

/**
 * This file contains the webpack config for all environments.
 * Use NODE_ENV to set the environment either to 'production', 'development'
 * or 'testing' to get the right webpack config.
 *
 * This file should be written in ES5.
 */

require('babel-core/register')();
var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var deepmerge = require('deepmerge');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsWebpackPlugin = require('stats-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const AUTOPREFIXER_CONFIG = '{browsers:["> 1% in AT", "last 2 version", "Firefox ESR"]}';

/**
 * Shared config
 */
var config = {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {optional: 'runtime'},
      exclude: [path.join(__dirname, 'node_modules')],
      include: path.join(__dirname, 'src')
    }, {
      test: /.*\.(gif|png|svg|jpe?g)$/i,
      loaders: [
        'url-loader?limit=1024',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }]
  }
};

/**
 * Development config
 *
 * CSS is dynamically applied in the browser and JS files are concatenated
 * to bundle.js, which is available to the browser (but isn't written to disk).
 */
if (process.env.NODE_ENV === 'development') {
  config.devtool = 'source-map';

  config.entry = [
    'webpack-hot-middleware/client',
    './src/index'
  ];

  config.output = {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

  config.module.loaders.push({
    test: /\.scss$/,
    loader: 'style!css!autoprefixer?' + AUTOPREFIXER_CONFIG + '!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
  });
}


/**
 * Production config
 *
 * This adds all the generated assets (JavaScript, CSS, images) into the
 * publicPath (see below) and provides a file named webpack-stats.json in
 * the root folder, which can be used to get the names of the generated assets.
 */
else if (process.env.NODE_ENV === 'production') {

  var paths = [
    '/',
    '/home/',
    '/about/'
  ];

  // Add blog posts
  const articles = require('./src/articles');
  articles.forEach(article => {
    paths.push('/articles/' + article.slug);
  });

  config.entry = {
    'main': './src/index'
  };

  config.output = {
    path: path.join(__dirname, 'dist'),
    filename: 'main-[hash].js',
    libraryTarget: 'umd',
    publicPath: ''
  };

  config.plugins.push(
    new ExtractTextPlugin('main-[hash].css', {allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({compressor: { warnings: false}}),
    new webpack.optimize.DedupePlugin(),
    new StaticSiteGeneratorPlugin('main', paths)
  );

  config.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?' + AUTOPREFIXER_CONFIG + '!sass')
  });
}


module.exports = config;
