const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const FileListPlugin = require('./plugins/file-list-plugin');
const InlineSourcePlugin = require('./plugins/inline-source-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist')
  },
  resolveLoader: {
    modules: [path.resolve('./loaders')]
    // alias: {
    //   loader1: path.resolve('./loaders/loader1.js'),
    //   loader2: path.resolve('./loaders/loader2.js'),
    //   loader3: path.resolve('./loaders/loader3.js')
    // }
  },
  devtool: 'source-map',
  // watch: true,
  module: {
    rules: [
      //   {
      //   test: /\.less$/,
      //   use: [
      //     path.resolve('./loader/style-loader.js'),
      //     path.resolve('./loader/less-loader.js')
      //   ]
      // }

      // {
      //   test: /\.js$/,
      //   use: 'loader1',
      //   enforce: 'pre'  // pre loader
      // },
      // {
      //   test: /\.js$/,
      //   use: 'loader2' // normal loader
      // },
      // {
      //   test: /\.js$/,
      //   use: 'loader3',
      //   enforce: 'post' // post loader
      // }

      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // }

      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'banner-loader',
      //     options: {
      //       text: 'typpp',
      //       filename: path.resolve('./src/banner.txt')
      //     }
      //   }
      // }

      // {
      //   test: /\.(jpe?g|png|gif)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: 'imgs/[name].[hash:8].[ext]'
      //     }
      //   }
      // }

      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'imgs/[name].[hash:8].[ext]',
            limit: 100 * 1024,
            mimeType: 'image/png',
            fallback: './file-loader'
          }
        }
      },

      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve('./index.html')
    // }),
    // new FileListPlugin({
    //   filename: 'list.md'
    // }),
    // new InlineSourcePlugin({
    //   match: /\.(js|css)/
    // })
  ]
}
