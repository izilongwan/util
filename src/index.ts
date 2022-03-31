import * as array from './array'
import * as async from './async'
import * as bom from './bom'
import * as data from './data'
import * as date from './date'
import * as element from './element'
import * as geometric from './geometric'
import * as object from './object'
import * as plugins from './plugins'
import * as regexp from './regexp'
import * as string from './string'
import * as url from './url'
import * as xhr from './xhr'
import * as func from './func'

import { LRUCache2, LRUCache } from './test'

const m = {
  LRUCache2,
  LRUCache,
  array,
  async,
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
  // func,
}

export {
  LRUCache2,
  LRUCache,
  array,
  async,
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
  // func,
}

module?.hot?.accept()

export default m
