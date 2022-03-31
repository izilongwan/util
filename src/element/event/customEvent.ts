/**
 * 自定义事件
 */
export class EventEmitter {
  events: Record<string, [Function, number][]> = {};
  constructor() {
  }

  on(name: string, myFn: Function, n = Infinity) {
    if (this.events[name]) {
      const isExist = this.events[name].some(([fn]) => fn === myFn);
      !isExist && this.events[name].push([myFn, n]);
    }
    else {
      this.events[name] = [[myFn, n]];
    }
  }

  once(name: string, fn: Function) {
    this.on(name, fn, 1);
  }

  off(name: string, myFn: Function, cb?: Function) {
    if (this.events[name]) {
      this.events[name] = this.events[name].filter(([fn]) => fn !== myFn);
      cb && cb();
    }
  }

  trigger(name: string, data: any, ctx: Object, cb: Function) {
    if (this.events[name]) {
      this.events[name].forEach(([fn, n]) => {
        fn.call(ctx, data);
        cb && cb();
        n > 0 && --n >= 0 && this.off(name, fn);
      });
    }
  }
}
