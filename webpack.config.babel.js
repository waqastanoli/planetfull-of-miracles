import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  entry: {
    app: [
      path.resolve(__dirname, 'client/index.js'),
      'webpack-hot-middleware/client'
    ]
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  module: {
    rules: [{
      test: /\.js|jsx$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
    }, {
      test: /\.scss|sass$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader', 'less-loader'],
        publicPath: path.resolve(__dirname, 'dist')
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader'],
        publicPath: path.resolve(__dirname, 'dist'),
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'css-loader',
        use: ['css-loader', 'sass-loader', 'less-loader'],
        publicPath: path.resolve(__dirname, 'dist')
      })
    }, {
      test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.(png|jp(e*)g|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1000,
            mimetype: 'application/font-woff'
          }
        }

      ]
    }, {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader'
        }
      ]
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'client/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

export default config;
