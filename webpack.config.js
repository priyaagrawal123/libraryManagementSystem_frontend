const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // Entry point for React app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js',  // Bundle name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',  // Use Babel to transpile JS
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],  // To handle CSS imports
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Automatically inject the bundle into index.html
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,  // Local server will run on port 3000
  },
};
