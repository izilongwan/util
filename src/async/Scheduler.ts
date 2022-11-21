class Schduler {
  private task: TaskPromise<any>[] = []
  private taskDoingCount = 0

  constructor(private taskLimit: number = taskLimit) {

  }

  add(promise: PromiseCb) {
    new Promise(resolve => {
      const item = [promise, resolve] as TaskPromise<any>
      this.task.push(item)
    })

    return this
  }

  addAll(promises: PromiseCb[]) {
    if (Array.isArray(promises)) {
      promises.forEach((p) => this.add(p))
    }

    return this
  }

  private run() {
    if (this.taskDoingCount < this.taskLimit) {
      const item = this.task.shift()

      if (!item) {
        return this
      }

      const [promise, resolve] = item

      promise().then(() => {
        resolve()

        this.taskDoingCount--
        this.run()
      })

      this.taskDoingCount++
      this.run()
    }

    return this
  }

  start() {
    return this.run()
  }
}

type TaskPromise<T> = ([() => Promise<T>, (value?: unknown) => void])

type PromiseCb = () => Promise<any>

// function cb(ms: number) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(ms)
//       console.log(ms)
//     }, ms);
//   })
// }

// const list = [
//   () => cb(1000),
//   () => cb(3000),
//   () => cb(2000),
//   () => cb(2000),
//   () => cb(1000),
//   () => cb(1000),
// ] as (PromiseCb)[]

// new Schduler(2)
//   .add(() => cb(2000))
//   .addAll(list)
//   .start()
