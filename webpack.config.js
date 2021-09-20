const { mode } = process.env

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  experiments:
    mode === 'esm'
    ? { outputModule: true }
    : {}
  ,

  output:
    mode === 'esm'
      ? {
        filename: 'esm/index.js',
        library: {
          type: 'module',
          export: 'default',
        },
        globalObject: 'this',
      }
      : {
        filename: 'cjs/index.js',
        library: {
          name: 'util',
          type: 'umd',
          export: 'default',
          umdNamedDefine: true,
        },
        globalObject: 'this',
      }
  ,

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
