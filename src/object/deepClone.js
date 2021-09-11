import { isObject } from './isObject';

/**
 * 深拷贝
 * @param {Object} org 被拷贝原型对象
 * @param {Object} tar 对象
 * @returns {Object}
 */
export function deepClone(org = {}, tar = {}) {
  const TYPES = [Set, Map, Date, RegExp, WeakMap, WeakSet]

  const newClone = (function _(org, hash = new WeakMap()) {

    if (!isObject()) {
      return org
    }

    let value = hash.get(org)

    if (value) {
      return value
    }

    if (TYPES.includes(org.constructor)) {
      return new org.construct(org)
    }

    const descriptors = Object.getOwnPropertyDescriptors(org),
          clone = Object.create(Reflect.getPrototypeOf(org), descriptors)

    hash.set(org, clone)

    for (const key of Reflect.ownKeys(org)) {
      clone[key] = _(org[key], hash)
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

bar.loop = bar;
bar.map.set(bar, bar)

// const newBar = deepClone(bar, {a: 1, b:2})

// for (const key of Reflect.ownKeys(bar)) {
  // console.log(key, bar[key] === newBar[key])
// }
// console.log('newBar', newBar)
