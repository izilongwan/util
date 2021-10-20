module.exports = {
  mode: 'production',

  entry: './src/index.js',

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

  module: {
    rules: [
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
  }
}
