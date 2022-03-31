import { isObject } from './isObject'
import { getType } from './getType'
import { deepClone } from './deepClone';
import { ICommonObject } from '../types/typing';

export function merge(...args: ICommonObject[]): ICommonObject{
  const origin = args.shift() as unknown as ICommonObject,
        isCover = typeof(args[args.length - 1]) === 'boolean' ? args.pop() : false

  for (const obj of args) {
    if (!isObject(obj)) {
      continue
    }

    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (isObject(value)) {
          const isArray = getType(value) === 'Array'

          if (!origin[key]) {
            origin[key] = isArray ? [] : {}
          }

          let isWrite = true

          if (isCover) {
            if (getType(value) !== getType(origin[key])) {
              origin[key] = deepClone(value)
              isWrite = false
            }
          }

          isWrite && isArray
            ? origin[key] = origin[key].concat(value)
            : merge(origin[key], value)

        }
        else {
          origin[key] = value
        }
      }
    }
  }

  return origin
}
