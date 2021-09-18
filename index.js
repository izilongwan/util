import * as array from './src/array'
import * as _async from './src/async'
import * as bom from './src/bom'
import * as data from './src/data'
import * as date from './src/date'
import * as element from './src/element'
import * as geometric from './src/geometric'
import * as object from './src/object'
import * as plugins from './src/plugins'
import * as regexp from './src/regexp'
import * as string from './src/string'
import * as url from './src/url'
import * as xhr from './src/xhr'
import * as _function from './src/function'

const m = {
  array,
  async: _async,
  bom,
  data,
  date,
  element,
  geometric,
  object,
  plugins,
  regexp,
  string,
  url,
  xhr,
}

console.log(m)

window.m = m
