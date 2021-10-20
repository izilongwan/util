export class Scheduler {
  constructor(limit = 2) {
    this.limit = limit;  // 并发最大值
    this.doing = [];     // 正在运行的任务
    this.tasks = [];     // 待运行的任务
  }

  add(cb) {
    // cb 是一个异步函数，return Promise
    return new Promise((resolve, reject) => {
      cb.resolve = resolve;
      this.doing.length < this.limit
        ? this.run(cb)
        : this.tasks.push(cb);
    })
  }

  run(cb) {
    this.doing.push(cb);

    cb().then(() => {
      cb.resolve();
      this.doing.splice(this.doing.findIndex(cb), 1);
      this.tasks.length && this.run(this.tasks.shift());
    })
  }
}
