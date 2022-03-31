import { ICommonObject } from '../types/typing';
import { isObject } from './isObject';

/**
 * 深拷贝
 * @param {Object} org 被拷贝原型对象
 * @param {Object} tar 对象
 * @returns {Object}
 */
export function deepClone(org: ICommonObject & { constructor: any } = {}, tar: ICommonObject = {}) {
  const TYPES = [Set, Map, Date, RegExp, WeakMap, WeakSet]

  const newClone = (function _(org, hash = new WeakMap()) {

    if (!isObject(org)) {
      return org
    }

    let value = hash.get(org)

    if (value) {
      return value
    }

    if (TYPES.includes((<any>org).constructor)) {
      return new org.constructor(org)
    }

    const descriptors = Object.getOwnPropertyDescriptors(org),
          clone = Object.create(Reflect.getPrototypeOf(org), descriptors)

    hash.set(org, clone)

    for (const key of Reflect.ownKeys(org)) {
      clone[key] = _(org[key as string], hash)
    }

    return clone

  })(org)

  return Object.assign(tar, newClone)
}


const bar = {
  str: 'string',
  bool: true,
  number: 1,
  func: () => {},
  undefined: undefined,
  null: null,
  array: [
    {a: 1, b: 2 },
    2,
    [{}]
  ],
  obj: {
    a: 1,
    b: 2,
    c: 3,
    d: {}
  },
  date: new Date(),
  regexp: /\s/gi,
  set: new Set([1, 2, 3, 4, 5]),
  map: new Map([[{1: 1}, {2: 2}]]),
  [Symbol(5)]: Symbol(5),
  bigInt: BigInt(123)
}

// bar.loop = bar;
// bar.map.set(bar, bar)

const newBar = deepClone(bar, { a: 1, b: 2 })

// ownKeys(bar, newBar)
// console.log('newBar', newBar)

// function ownKeys(params = {}, cloneParams = {}) {
//   if (params === cloneParams
//       || !isObject(params)
//       || !isObject(cloneParams)
//     ) {
//     return
//   }

//   for (const key of Reflect.ownKeys(cloneParams)) {
//     const cloneValue = cloneParams[key],
//           value = params[key]

//     ownKeys(value, cloneValue)
//     console.log(key, params[key] === cloneParams[key])
//   }
// }
