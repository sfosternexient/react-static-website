'use strict';
/**
 * This file contains the webpack config for all environments.
 * Use NODE_ENV to set the environment either to 'production', 'development'
 * or 'testing' to get the right webpack config.
 *
 * This file should be written in ES5.
 */

require('babel-core/register')();
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const SHARED_AUTOPREFIXER_CONFIG = '{browsers:["> 1% in AT", "last 2 version", "Firefox ESR"]}';
const SHARED_BABEL_PRESETS = ['react', 'es2015'];
const SHARED_BABEL_PLUGINS = ['transform-class-properties'];

// Keep this in sync with `src/routes.js`.
// Blog posts are dynamically added based on `src/articles/index`;
const BASE_PATHS = [
  '/',
  '/home/',
  '/about/'
];

/**
 * Shared config
 */
let config = {
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
    loader: 'style!css!autoprefixer?' + SHARED_AUTOPREFIXER_CONFIG + '!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
  }, {
    test: /\.js$/,
    loader: 'babel',
    query: {
      presets: [...SHARED_BABEL_PRESETS, 'react-hmre'],
      plugins: SHARED_BABEL_PLUGINS
    },
    exclude: [path.join(__dirname, 'node_modules')],
    include: path.join(__dirname, 'src')
  });
}


/**
 * Production config
 *
 * This adds all the generated assets (JavaScript, CSS, images) into the
 * publicPath (see below) and provides a file named webpack-stats.json in
 * the root folder, which can be used to get the names of the generated assets.
 */
if (process.env.NODE_ENV === 'production') {
  // Add blog posts
  let paths = BASE_PATHS.slice();
  const articles = require('./src/articles').default;
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
    loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?' + SHARED_AUTOPREFIXER_CONFIG + '!sass')
  }, {
    test: /\.js$/,
    loader: 'babel',
    query: {
      presets: SHARED_BABEL_PRESETS,
      plugins: SHARED_BABEL_PLUGINS
    },
    exclude: [path.join(__dirname, 'node_modules')],
    include: path.join(__dirname, 'src')
  });
}


module.exports = config;
