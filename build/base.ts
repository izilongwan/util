module.exports = {
  mode: 'development',

  output: {
    filename: 'index.js',
    library: {
      name: 'util',
      type: 'umd',
      export: 'default',
      umdNamedDefine: true,
    },
    globalObject: 'this',
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'es2015'],
              plugins: [
                ["transform-runtime", {
                "helpers": false,
                "polyfill": false
                }]
              ]
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },
}

export {}
