var webpack = require('webpack');

module.exports = {
  entry: './client/app/app.js',

  output: {
    path: __dirname + '/client',
    filename: 'bundle.js'
  },

/*  plugins: [*/
    //new webpack.optimize.UglifyJsPlugin({
      //compressor: {
        //warnings: false,
        //join_vars: true
      //},
    //})
  //],

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
