var path = require('path')
var webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: resolve('../sails/assets/js'),
    publicPath: '/static/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('./src'),
    }
  },
  module: {
    rules: [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('./src'), resolve('./test')]
    },
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ],
    },
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ],
    },
    {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader?indentedSyntax'
      ],
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
          // the "scss" and "sass" values for the lang attribute to the right configs here.
          // other preprocessors should work out of the box, no loader config like this necessary.
          'scss': [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ],
          'sass': [
            'vue-style-loader',
            'css-loader',
            'sass-loader?indentedSyntax'
          ]
        }
        // other vue-loader options go here
      }
    },
    {
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader"
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('./src'), resolve('./test')],
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  watchOptions: {
    poll: 1000,
    // Ignora o diretório node_modules
    ignored: ['node_modules']
  },
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
      })
    ],
    runtimeChunk: 'single',
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ])
}

if (process.env.NODE_ENV === 'test') {
  // Use inline source map so that it works with mocha-webpack
  module.exports.devtool = 'inline-cheap-module-source-map'
  // Let mochapack set the entry and output
  delete module.exports.entry
  delete module.exports.output
  // Use absolute paths in sourcemaps (important for debugging via IDE)
  module.exports.output = {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  }
}
