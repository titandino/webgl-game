module.exports = {
  entry: './app/index',
  output: {
    filename:'compiled.js',
    path:'./build'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      }
    ],
  }
};
