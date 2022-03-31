export class Scheduler1 {
  tasks: [number, Function][] = []; // 待执行的任务
  num = 0; // 正在执行的任务数量
  limit: number

  constructor(limit = 2) {
    this.limit = limit;
  }

  addTask(time: number, fn: Function) {
    this.tasks.push([time, fn]);

    this.start();
    return this
  }

  start() {
    if (this.tasks.length) {
      if (this.num >= this.limit) {
        return this;
      }

      const [time, fn] = this.tasks.shift()!;

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
