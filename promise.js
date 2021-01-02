// 判断是否是Promise对象
function isPromise(value) {
  return value
         && (typeof value === 'object' || typeof value === 'function')
         && typeof (value.then) === 'function';
}

// 处理promise, x有可能是promise对象，则需要继续处理，直至返回的是普通数据（非异常和promise）
function resolvePromise(promise, x, resolve, reject) {
  if(x === promise) {
    return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`));
  }
  /**
   * 判断是否是promise有三个条件
   * 1.是对象，且不是null
   * 2.是函数
   * 3.满足1，2其中一个的基础上，有then属性，且是个函数
   */
  if(x && (typeof x === 'object' || typeof x === 'function')) {
    // 确保即使x是他人自定义的promise对象时，状态改变也只执行一次
    let called = false;

    try { // 如果then属性通过getter定义
      let { then } = x;

      if (typeof then === 'function') {// 是promise
        // then方法调用时绑定this,否则可能会导致this指向变更; 第二个参数成功回调
        then.call(x, y => {
          if(called) return;
          called = true;
          // y仍然可能是promise
          resolvePromise(promise, y, resolve, reject);
        }, r => {//失败回调
          if(called) return;
          called = true;
          reject(r);
        })

        return;
      }

      resolve(x);

    } catch (e) {
      if(called) return;
      called = true;
      reject(e);
    }

    return;
  }
   // 普通值
  resolve(x);
}

const state = {
  PENDING: 'PENDING',
  FULFILLED:'FULFILLED',
  REJECTED: 'REJECTED'
}

class Promise {
  constructor(fn) {

    this.state = state.PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    const resolve = (value) => {
      // resolve的值如果是promise, 则一直取值直到非promise为止
      if (value instanceof Promise) {
        value.then(resolve, reject);
        return;
      }

      if (this.state === state.PENDING) {
        this.state = state.FULFILLED;
        this.value = value;

        this.onFulfilledCallback.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if (this.state === state.PENDING) {
        this.state = state.REJECTED;
        this.reason = reason;

        this.onRejectedCallback.forEach(fn => fn());
      }
    }

    try {
      fn(resolve, reject);

    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 当参数不是回调函数或者省略时,赋予默认回调函数,将值向后传递
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };

    // 返回promise可以实现链式调用
    const p = new Promise((resolve, reject) => {

      // 微任务，等到new实例完成之后，获取返回的promise;否则promise未定义
      switch (this.state) {

        case state.FULFILLED:
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(p, x, resolve, reject);

            } catch (error) {
              reject(error);
            }
          });
          break;

        case state.REJECTED:
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(p, x, resolve, reject);

            } catch (error) {
              reject(error);
            }
          });
          break;

        case state.PENDING:
          this.onFulfilledCallback.push(() =>
            setTimeout(() => {
              try {
                const x = onFulfilled(this.value);
                resolvePromise(p, x, resolve, reject);

              } catch (error) {
                reject(error);
              }
            })
          )

          this.onRejectedCallback.push(() =>
            setTimeout(() => {
              try {
                const x = onRejected(this.reason);
                resolvePromise(p, x, resolve, reject);

              } catch (error) {
                reject(error);
              }
            })
          )
          break;

        default:
          break;
      }

    })

    return p;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(value =>
      Promise
        .resolve(callback())
        .then(() => value)
    ).catch(error =>
      Promise
        .resolve(callback())
        .then(() => { throw new Error(error) })
    );
  }


  static resolve(value) {
    if (isPromise(value)) {
      return value;
    }

    return new Promise((resolve, reject) => resolve(value))
  }

  static reject(reason) {
    if (isPromise(reason)) {
      return reason;
    }

    return new Promise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      const len = promises.length;

      if (len <= 0) {
        resolve([]);
        return;
      }

      const result = [];
      let idx = 0;

      const doProcess = (value, i) => {
        result[i] = value;
        ++idx === len && resolve(result);
      }

      for (const i in promises) {
          const iter = promises[i];

          isPromise(iter)
            ? iter.then(value => doProcess(value, i), reject)
            : doProcess(iter, i);
      }
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      const len = promises.length;

      if (len <= 0) {
        resolve([]);
      }

      for (const i in promises) {
          const iter = promises[i];

          isPromise(iter)
            ? iter.then(resolve, reject)
            : resolve(iter);
      }
    })
  }

  static deferred() {
    const dfd = {};

    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    })

    return dfd;
  }
}


module.exports = Promise;
