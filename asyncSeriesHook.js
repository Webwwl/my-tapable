const Hook = require('./hook')

class asyncSeriesHook extends Hook {

  constructor(args) {
    super()
  }

  tapAsync(name, fn) {
    this.tasks.push(fn)
  }

  callAsync(...args) {
    const finalCallBack = args.pop()
    this.args = args
    let index = 0
    const done = () => {
      index++
      if (index === this.tasks.length) {
        return finalCallBack()
      }
      this.tasks[index](...this.args, done)
    }

    this.tasks[index] && this.tasks[index](...this.args, done)
  }
}

const hook = new asyncSeriesHook(['arg1'])

hook.tapAsync('a', (arg1, cb) => {
  setTimeout(() => {
    console.log('a', arg1)
    cb()
  }, 2000);
})

hook.tapAsync('b', (arg1, cb) => {
  setTimeout(() => {
    console.log('b', arg1)
    cb()
  }, 1000);
})

hook.callAsync(1, () => console.log('end'))