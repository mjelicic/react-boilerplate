/* @flow weak */

'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('./notifyplugin');
var path = require('path');
var webpack = require('webpack');
var config = require('../src/server/config/environment');

var loaders = {
  'css': '',
  'less': '!less-loader',
  'scss|sass': '!sass-loader',
  'styl': '!stylus-loader'
};

module.exports = function(opts) {
  var opts = opts || { isDevelopment: false };

  function stylesLoaders() {
    return Object.keys(loaders).map(function(ext) {
      var prefix = 'css-loader!autoprefixer-loader?browsers=last 2 version';
      var extLoaders = prefix + loaders[ext];
      var loader = opts.isDevelopment
        ? 'style-loader!' + extLoaders
        : ExtractTextPlugin.extract('style-loader', extLoaders);
      return {
        loader: loader,
        test: new RegExp('\\.(' + ext + ')$')
      };
    });
  }

  return {
    cache: opts.isDevelopment,
    debug: opts.isDevelopment,
    devtool: opts.isDevelopment ? 'eval-source-map' : '',
    entry: {
      app: opts.isDevelopment ? [
        'webpack-dev-server/client?http://localhost:8888',
        // Why only-dev-server instead of dev-server:
        // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
        'webpack/hot/only-dev-server',
        './src/client/main.js'
      ] : [
        './src/client/main.js'
      ],
      // For Safari, IE<11, and some old browsers. More languages will need more
      // specific builds.
      appintl: opts.isDevelopment ? [
        'webpack-dev-server/client?http://localhost:8888',
        // Why only-dev-server instead of dev-server:
        // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
        'webpack/hot/only-dev-server',
        './node_modules/intl/Intl.js',
        './node_modules/intl/locale-data/jsonp/en.js',
        './src/client/main.js'
      ] : [
        './node_modules/intl/Intl.js',
        './node_modules/intl/locale-data/jsonp/en.js',
        './src/client/main.js'
      ]
    },
    module: {
      loaders: [
        { loader: 'url-loader?limit=8192', test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/ },
        {
          exclude: /node_modules/,
          loaders: opts.isDevelopment ? [ 'react-hot', 'babel-loader' ] : [ 'babel-loader' ],
          test: /\.js$/
        }
      ].concat(stylesLoaders())
    },
    output: opts.isDevelopment ? {
      path: path.join(__dirname, '/build/'),
      filename: '[name].js',
      publicPath: 'http://localhost:8888/build/'
    } : {
      path: 'build/' + config.version,
      publicPath: config.aws.url + config.version + '/',
      filename: '[name].js'
    },
    plugins: (function() {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(opts.isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        })
      ];
      if (opts.isDevelopment)
        plugins.push(
          NotifyPlugin,
          new webpack.HotModuleReplacementPlugin(),
          // Tell reloader to not reload if there is an error.
          new webpack.NoErrorsPlugin()
        );
      else
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              // Because uglify reports so many irrelevant warnings.
              warnings: false
            }
          })
        );
      return plugins;
    })(),
    resolve: {
      extensions: ['', '.js', '.json']
    }
  };

};
