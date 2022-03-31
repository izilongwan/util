import { IPromiseFunction } from '../types/typing';

export class Scheduler {
  limit: number// 并发最大值
  doing: IPromiseFunction[] = [] // 正在运行的任务
  tasks: IPromiseFunction[] = [] // 待运行的任务

  constructor(limit = 2) {
    this.limit = limit;
  }

  add(cb: IPromiseFunction) {
    // cb 是一个异步函数，return Promise
    return new Promise((resolve, reject) => {
      cb.resolve = resolve;
      this.doing.length < this.limit
        ? this.run(cb)
        : this.tasks.push(cb);
    })
  }

  run(cb: IPromiseFunction) {
    this.doing.push(cb);

    cb().then(() => {
      cb.resolve();
      this.doing.splice(this.doing.findIndex(cb), 1);
      this.tasks.length && this.run(this.tasks.shift()!);
    })
  }
}
