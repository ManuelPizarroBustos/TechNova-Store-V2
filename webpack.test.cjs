
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist-test'),
    filename: '[name].js',
  },
};
