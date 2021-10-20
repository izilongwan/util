export class Scheduler1 {
  constructor(limit = 2) {
    this.limit = limit;
    this.tasks = []; // 待执行的任务
    this.num = 0; // 正在执行的任务数量
  }

  addTask(time, fn) {
    this.tasks.push([time, fn]);

    this.start();
    return this
  }

  start() {
    if (this.tasks.length) {
      if (this.num >= this.limit) {
        return this;
      }

      const [time, fn] = this.tasks.shift();

      this.num++;

      setTimeout((fn) => {
        this.num--;
        fn()
        this.start();
      }, time * 1, fn);

      this.start();
    }

    return this
  }
}
