export class Scheduler1 {
  constructor(limit) {
    this.limit = limit;
    this.tasks = []; // 待执行的任务
    this.num = 0; // 正在执行的任务数量
  }

  addTask(time, str) {
    this.tasks.push([time, str]);

    this.start();
  }

  start() {
    if (this.tasks.length) {
      if (this.num >= this.limit) {
        return;
      }

      const [time, str] = this.tasks.shift();

      this.num++;

      setTimeout((str) => {
        this.num--;
        console.log(str);
        this.start();
      }, time * 1000, str);

      this.start();
    }
  }
}