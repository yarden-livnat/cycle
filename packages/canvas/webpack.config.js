const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  module: {
    rules: [
      { test: /\.css$/,
        include: path.join(__dirname, 'style'),
        exclude: /node_modules/,
        use: ['style-loader', 'typings-for-css-modules-loader?modules']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
      // new CleanWebpackPlugin('dist')
  ]
};
