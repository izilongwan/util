### @izilong/util

- Install｜安装
```shell
npm i @izilong/util
```

```shell
yarn add @izilong/util
```


## Use
```js
import util from '@izilong/util'
```

- ES6
```js
import {
  array
  async
  bom
  data
  date
  element
  geometric
  object
  plugins
  regexp
  string
  url
  xhr
  func } from '@izilong/util'
```

- NODE
```js
const util = require('@izilong/util')
```

```js
const {
  array
  async
  bom
  data
  date
  element
  geometric
  object
  plugins
  regexp
  string
  url
  xhr
  func } = require('@izilong/util')
```


## API Reference

```js
util
  |-array
  |-async
    -| Scheduler
    -| Scheduler1
  |-bom
    -| domReady
    -| getBrowserType
    -| getNetworkType
    -| mCookie
  |-data
    -| formDataTree
    -| LRUCache
  |-date
    -| countdown
  |-element
  |-func
    -| clone
    -| compose
    -| curry
    -| debounce
    -| genderator
    -| M
    -| memorize
    -| myApply
    -| myBind
    -| myCall
    -| myInstanceOf
    -| myNew
    -| partial
    -| throttle
  |-geometric
    -| isPointerTriangle
  |-object
    -| deepClone
    -| getObjKeyValue
    -| getType
    -| inherit
    -| isObject
    -| merge
  |-plugins
  |-regexp
    -| checkCarCard
    -| checkColor
    -| checkDate
    -| checkMail
    -| checkPhoneNumber
    -| regTpl
    -| trimSpace
  |-string
    -| getStringBytesLength
    -| sQueryCount
    -| sUnique
  |-url
    -| asyncLoad
    -| asyncLoadCallback
    -| getUrlParam
    -| parseUtlParams
  |-xhr
    -| xhr
    -| xhrAjavDomain
    -| xhrWindowName
```
