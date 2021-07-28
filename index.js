/**
 * let
 * 1、同一作用域下不可重复声明
 * 2、声明不会被提升，暂时性死区
 * 3、只在该作用域下生效
 */


/**
 * 箭头函数 =>
 * 1、this指向由外层作用域决定，this指向固化
 * 2、=> 不能作为构造函数来使用
 * 3、没有arguments对象，rest运算符代替
 * 4、在generator函数中，yield命令不能生效
 */

/**
 * Object.keys() 遍历自身可枚举、非Symbol属性键名，并返回返回一个数组
 * Object.values() 遍历自身可枚举、非Symbol属性键值，并返回一个数组
 * Object.entries() 遍历自身可枚举、非Symbol属性，并返回一个类数组
 * Object.getOwnPropertySymbols() 遍历自身Symbol属性，并返回一个数组
 * Object.assign() 合并（浅拷贝）非继承、可枚举的属性（含Symbol属性）
 * for in 遍历自身及继承的可枚举、非Symbol属性
 * for of 遍历迭代对象
 * JSON.stringify() 遍历自身可枚举属性
 */


/**
 * 拷贝对象
 * 1、深度克隆
 * 2、圣杯模式
 * 3、JSON.parse/JSON.stringify
 */



/**
 * 引起回流的因素：
 * 1、DOM节点的增删
 * 2、DOM节点位置
 * 3、DOM节点的尺寸
 * 4、DOM节点的显示与否（display）
 * 5、页面初始渲染
 * 6、向浏览器请求样式信息（client getComputedStyle currentStyle offset scroll）
 */

const isObject = (value) => value && typeof value === 'object';

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

  var args  = [].slice.call(arguments, 1),
      len   = args.length,
      param = [],
      random = Math.random();

  for (var i = 0; i < len; i++) {
    param.push('args[' + i + ']');
  }

  ctx[random] = this;

  var res = eval('ctx[random](' + param + ')');

  delete ctx[random];

  return res;
}

Function.prototype.myApply = function (ctx, args) {
  ctx = ctx ? Object(ctx) : window;

  var len    = args.length,
      param  = [],
      random = Math.random();

  for (var i = 0; i < len; i++) {
    param.push('args[' + i + ']');
  }

  ctx[random] = this;

  var res = eval('ctx[random](' + param + ')');

  delete ctx[random];

  return res;
}

Function.prototype.myBind = function (ctx) {
  ctx = ctx ? Object(ctx) : window;

  var self = this;

  var func = function () {
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
 * @param {Object} target 被克隆对象
 * @param {Object} origin 克隆对象
 */
function deepClone(target, origin = {}) {
  const types = [Set, Map, WeakMap, WeakSet, Date, RegExp];

  // IIFE 立即执行函数递归调用
  const ret = (function _(target, hash = new WeakMap()) {
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
      cloneObj[key] = _(target[key], hash);
    }

    return cloneObj;
  })(target);

  return Object.assign(
    {},
    origin,
    ret
  );
}


const cloneBar = deepClone(bar, { a: 1, b: 2 })

for (const key of Reflect.ownKeys(bar)) {
  // console.log(key, bar[key] === cloneBar[key])
}
// console.log('cloneBar', cloneBar)

/**
 *
 * @param {Function} fn 方法
 * @param {Number} delay 延迟毫秒数
 * @param {Boolean} triggerNow 立即触发
 * @returns
 */
function debounce(fn, delay = 300, triggerNow = false) {
  let t = null,
      result = null;

  const _ = function(...args) {
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
 * @param {Function} fn 方法
 * @param {Number} delay 延迟毫秒数
 * @returns
 */
function throttle(fn, delay = 300) {
  let t  = null,
      ft = Date.now();

  return function(...args) {
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
 * @param {String} url
 * @returns {Object}
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
 * @param {String} key 提取的属性值
 * @param {String} url 提取的字符串
 * @returns any
 */
function getUrlParam(key = '', url = '') {
  url = url
    ? url
    : window.location.search.substr(1);

  const reg = new RegExp('(^|&)' + key + '=([^&]+)(&|$)');
  const values = url.match(reg);

  if (values && values.length) {
    let value = decodeURIComponent(values[2]);

    return isNaN(parseFloat(value))
      ? value
      : parseFloat(value);
  }

  return null;
}

/**
 *
 * @param {Function} fn 方法
 * @returns {Object}
 */
function myNew(fn) {
  var ctx = {};

  Object.setPrototypeOf(ctx, fn.prototype);

  var res = fn.apply(ctx, [].slice.call(arguments, 1));

  return isObject(res) ? res : ctx;
}


/**
 * 左边的__proto__上是否有右边的prototype
 * @param {Object} tar 目标值
 * @param {Object} org 原始的
 * @returns {Boolean}
 */
function myInstanceOf(tar, org) {
  var originPrototype = org.prototype,
      theProto = Object.getPrototypeOf(tar);

  while (theProto !== originPrototype) {

    if (theProto === null) {
      return false;
    }

    theProto = Object.getPrototypeOf(theProto);
  }

  return true;
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

/**
 * 【原型链继承】         引用值共享
 * 【借用构造函数继承】    父类原型无法继承
 * 【组合继承】           父类构造函数执行类2次
 * 【圣杯继承】
 * 【class继承】
 */

/**
 * 圣杯继承
 * @param {Object} Org 被克隆对象
 * @param {Object} Tar 克隆对象
 */
const inherit = (() => {
  function Buffer() {};

  return (Org, Tar = {}) => {
    Buffer.prototype = Org.prototype;
    Tar.prototype = new Buffer();
    Tar.prototype.constructor = Tar;
    Tar.prototype.superConstructor = Org;

    return Tar;
  }
})();
