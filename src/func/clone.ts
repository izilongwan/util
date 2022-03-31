import { deepClone, isObject } from '../object';
import { ICommonFunction } from '../types/typing';

/**
 * 拷贝函数的属性和方法
 * @param {Function} fn
 * @returns {Function}
 */
export function clone (fn: ICommonFunction) {
  const self = fn;

  const func: ICommonFunction = function (this: Object, ...args: any[]) {
    return self.apply(this, args);
  }

  for (const key in self) {
    if (Object.hasOwnProperty.call(self, key)) {
      const value = self[key];

      func[key] = isObject(value) ? deepClone(value) : value;
    }
  }

  return func;
}

// const foo = function (x) {
//   return Math.pow(x, x);
// }

// foo.a = 100;
// foo.obj = {
//   arr: [1, 2, 4],
//   bool: true,
//   symbol: Symbol(9)
// }

// const cloneFoo = clone(foo);
// console.log('cloneFoo === foo', cloneFoo === foo)
// console.log('cloneFoo(9) === foo(9)', cloneFoo(9) === foo(9))

// for (const key in foo) {
//   if (foo.hasOwnProperty(key)) {
//     const value = foo[key];

//     console.log(key, value === cloneFoo[key]);
//   }
// }
