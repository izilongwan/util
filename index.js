const isObject = (value) => value && typeof value === 'object';
// const deepClone = (target, origin = {}) => {
//   const types = [Set, Map, WeakMap, WeakSet, Date, RegExp];


//   const clone = (target, wm = new WeakMap()) => {
//     const value = wm.get(target);

//     if (value) {
//       return value;
//     }

//     const Constructor = target.constructor;

//     if (types.includes(Constructor)) {
//       return new Constructor(target);
//     }

//     const descriptors = Object.getOwnPropertyDescriptors(target), // 获取属的属性描述符
//           cloneObj = Object.create(Reflect.getPrototypeOf(target), descriptors); // 继承原型

//     // 设置hash，防止成环
//     wm.set(target, cloneObj);

//     for (const key of Reflect.ownKeys(target)) {
//       const value = target[key];

//       cloneObj[key] = isObject(value) ? clone(value, wm) : value;
//     }

//     return cloneObj;
//   }

//   return {
//     ...clone(origin),
//     ...clone(target)
//   }
// }

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

const newBar = deepClone(bar, {a: 1, b:2})

for (const key of Reflect.ownKeys(bar)) {
  // console.log(key, bar[key] === newBar[key])
}
// console.log('newBar', newBar)

// 拷贝函数
Function.prototype.clone = function () {
  const self = this;

  const func = function () {
    return self.apply(this, arguments);
  }

  for (const key in self) {
    if (self.hasOwnProperty(key)) {
      const value = self[key];

      func[key] = isObject(value) ? deepClone(value) : value;
    }
  }

  return func;
}

const foo = function (x) {
  return Math.pow(x, x);
}

foo.a = 100;
foo.obj = {
  arr: [1, 2, 4],
  bool: true,
  symbol: Symbol(9)
}

const cloneFoo = foo.clone();
// console.log('cloneFoo === foo', cloneFoo === foo)
// console.log('cloneFoo(9) === foo(9)', cloneFoo(9) === foo(9))

for (const key in foo) {
  if (foo.hasOwnProperty(key)) {
    const value = foo[key];

    // console.log(key, value === cloneFoo[key]);
  }
}

Function.prototype.myCall = function (ctx) {
  ctx = ctx ? Object(ctx) : window;

  const args = [].slice.call(arguments, 1),
        len = args.length;

  let param = [];

  for (let i = 0; i < len; i++) {
    param.push('args[' + i + ']');
  }

  ctx.func = this;

  const res = eval('ctx.func(' + param + ')');

  delete ctx.func;

  return res;
}

Function.prototype.myApply = function (ctx, args) {
  ctx = ctx ? Object(ctx) : window;

  const len = args.length,
        param = [];

  for (let i = 0; i < len; i++) {
    param.push('args[' + i + ']');
  }

  ctx.func = this;

  const res = eval('ctx.func(' + param + ')');

  delete ctx.func;

  return res;
}

Function.prototype.myBind = function (ctx) {
  ctx = ctx ? Object(ctx) : window;

  const self = this;

  const func = function () {
    return self.myApply(this instanceof func ? this : ctx, [].slice.call(arguments));
  }

  function Buffer() {}

  Buffer.prototype = this.prototype;
  func.prototype = new Buffer();

  return func;
}

function tab (x, y) {
  console.log(x, y, this);
  return x * y;
}

// tab.call({}, 1, [2]);
// tab.myCall({}, [1], 2);
// tab.myApply({}, [1, 2]);
// tab.myBind({})([1, 10], 1);


/**
 * 深拷贝
 * @param {Object} target 克隆目标
 * @param {Object} origin 克隆对象
 */
function deepClone(target, origin = {}) {
  const types = [Set, Map, WeakMap, WeakSet, Date, RegExp];

  const clone = (target, hash = new WeakMap()) => {
    if (target === null || typeof target !== 'object') {
      return target;
    }

    const value = hash.get(target);

    if (value) {
      return value;
    }

    const Constructor = target.constructor;

    if (types.includes(Constructor)) {
      const res = new Constructor(target);

      hash.set(target, res);

      return res;
    }

    // 获取对象属性描述符
    const descriptors = Object.getOwnPropertyDescriptors(target);
    // 添加属性描述符
    const cloneObj = Object.create(Object.getPrototypeOf(target), descriptors);

    hash.set(target, cloneObj);

    // 遍历所有属性
    for (const key of Reflect.ownKeys(target)) {
      cloneObj[key] = clone(target[key], hash);
    }

    return cloneObj;
  }

  return Object.assign(
    {},
    origin,
    clone(target)
  );
}


const cloneBar = deepClone(bar, { a: 1, b: 2 })

for (const key of Reflect.ownKeys(bar)) {
  console.log(key, bar[key] === cloneBar[key])
}
// console.log('cloneBar', cloneBar)

/**
 *
 * @param {*} fn
 * @param {*} delay
 * @param {*} triggerNow
 * @returns
 */
function debounce(fn, delay = 300, triggerNow = false) {
  let t = null,
      result = null;

  const _ = (...args) => {
    clearTimeout(t);

    if (triggerNow) {
      const exec = !t;

      setTimeout(() => {
        t = null;
      }, delay);

      exec && (result = fn.apply(this, args));
      return result;
    }

    t = setTimeout(() => {
      result = fn.apply(this, args);
    }, delay)

    return result;
  }

  _.remove = () => {
    clearTimeout(t);
    t = null;
  }

  return _
}

/**
 *
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
function throttle(fn, delay = 300) {
  let t  = null,
      ft = Date.now();

  return (...args) => {
    let st = Date.now();

    if (st - ft <= delay) {
      ft = st;
      return fn.apply(this, args);
    }

    clearTimeout(t);

    t = setTimeout(() => {
      return fn.apply(this, args);
    })
  }
}

/**
 * 解析URL参数
 * @param {string} url
 * @returns object
 */
function parseUrlParams(url = '') {
  url = url
    ? url
    : window.location.search.substr(1);

  const values = url.split('&');

  return values.reduce((prev, curr) => {
    let [key, value] = curr.split('=');

    value = decodeURIComponent(value);
    value = isNaN(parseFloat(value)) ? value : parseFloat(value);

    prev[key] = prev.hasOwnProperty(key)
      ? [].cancat(prev[key], value)
      : value;

    return prev;
  }, {})
}


/**
 * 获取URL键名的值
 * @param {string} params
 * @param {string} url
 * @returns any
 */
function getUrlParam(params = '', url = '') {
  url = url
    ? url
    : window.location.search.substr(1);

  const reg = new RegExp('(^|&)' + params + '=([^&]+)(&|$)');
  const values = url.match(reg);

  if (values && values.length) {
    let value = decodeURIComponent(values[2]);

    return isNaN(parseFloat(value))
      ? value
      : parseFloat(value);
  }

  return null;
}


function myNew(fn) {
  const ctx = {};

  Object.setPrototypeOf(ctx, fn.constructor);

  const res = fn.apply(ctx, [].slice.call(arguments, 1));

  return isObject(res) ? res : ctx;
}

/**
 * 生成器
 * @param {Array} arr
 */
function generator(arr) {
  let idx = 0,
      len = arr.length;

  return {
    next: function() {
      return {
        value: arr[idx++],
        done: idx > len ? true : false
      }
    }
  }
}

arr = [1, 2, 3, 4];

const iter = generator(arr);

// console.log(iter.next())
// console.log(iter.next())
// console.log(iter.next())
// console.log(iter.next())
// console.log(iter.next())


// 中间件函数
const M = (functions) => {
  const init = () => {
    const iter = generator(functions);

    nextDo(iter);
  }

  function* generator(functions) {
    for (const item of functions) {
      yield item;
    }
  }

  function nextDo(iter) {
    const { done, value } = iter.next();

    if (done) {
      return;
    }

    value && value(() => nextDo(iter));
  }

  init();
};

function test1(next) {
  console.log(1);
  next();
}

function test2(next) {
  console.log(2);
  next();
}

function test3(next) {
  console.log(3, this);
  next();
}

var array = [test1, test2, test3.bind({})];

M(array);
