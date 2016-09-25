const top = (type) => {
if(type === 'dev'){
    return `const path = require('path');
  module.exports = {
    context: __dirname,
    entry: './index.jsx',
    output: {\n`
  }

  if(type === 'prod'){
    return `const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: __dirname,
  entry: './index.jsx',
  output: {\n`
  }
};

const path = (framework) => {
  if(framework === 'express'){
    return `    path: '../server/static',\n`
  }
  if(framework === 'rails'){
    return `    path: path.join(__dirname, 'public', 'javascripts'),`
  }
};

const bottom = (type) => {
  if(type === 'dev'){
    return`    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      },
      {
        test: [/\.css?$/],
        loader: 'style-loader!css-loader'
      }
    ]
  },
  devtool: 'source-maps'
};`
  }
  if(type === 'prod'){
    return `    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      },
      {
        test: [/\.css?$/],
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
      }
    })
  ]
};`
  }
};

const WPSetup = (type, framework) => {
  return top(type) + path(framework) + bottom(type);
}

module.exports = WPSetup;
