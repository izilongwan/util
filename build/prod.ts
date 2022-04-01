const base = require('./base')

module.exports = Object.assign({}, base, {
  mode: 'production',

  entry: '/src/index.ts',
})
