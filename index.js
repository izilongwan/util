const isObject = (value) => value && typeof value === 'object';
/**
 * 深拷贝
 * @param {Object} target 克隆目标
 * @param {Object} origin 克隆对象
 */
const deepClone = (target, origin = {}) => {
  const types = [Set, Map, WeakMap, WeakSet, Date, RegExp];


  const clone = (target, wm = new WeakMap()) => {
    const value = wm.get(target);

    if (value) {
      return value;
    }

    const Constructor = target.constructor;

    if (types.includes(Constructor)) {
      return new Constructor(target);
    }

    const descriptors = Object.getOwnPropertyDescriptors(target), // 获取属的属性描述符
          cloneObj = Object.create(Reflect.getPrototypeOf(target), descriptors); // 继承原型

    // 设置hash，防止成环
    wm.set(target, cloneObj);

    for (const key of Reflect.ownKeys(target)) {
      const value = target[key];

      cloneObj[key] = isObject(value) ? clone(value, wm) : value;
    }

    return cloneObj;
  }

  return {
    ...clone(origin),
    ...clone(target)
  }
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
    map: new Map([[{}, {}]]),
    [Symbol(5)]: Symbol(5),
  bigInt: BigInt(123)
}

bar.loop = bar;

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
