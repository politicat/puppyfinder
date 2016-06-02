var webpack = require('webpack');

module.exports = {
  entry: './client/app/app.js',

  output: {
    path: __dirname + '/client',
    filename: 'bundle.js'
  },

<<<<<<< HEAD
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        join_vars: true
      },
    })
  ],
=======
/*  plugins: [*/
    //new webpack.optimize.UglifyJsPlugin({
      //compressor: {
        //warnings: false,
        //join_vars: true
      //},
    //})
  //],
>>>>>>> refactor/make-routes-module

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'angular']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
};
