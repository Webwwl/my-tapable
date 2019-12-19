const Hook = require('./hook')

class AsyncSeriesWaterfallHook extends Hook {

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
    const done = (err, data) => {
      index++
      if (index === this.tasks.length) {
        return finalCallBack()
      }
      if (data !== undefined) {
        this.args.splice(0, 1, data)
      }
      this.tasks[index](...this.args, done)
    }

    this.tasks[index] && this.tasks[index](...this.args, done)
  }
}

const hook = new AsyncSeriesWaterfallHook(['arg1', 'arg2'])

hook.tapAsync('a', (arg1, arg2, cb) => {
  setTimeout(() => {
    console.log('a', arg1, arg2)
    cb(null, undefined)
  }, 2000);
})

hook.tapAsync('b', (arg1, arg2, cb) => {
  setTimeout(() => {
    console.log('b', arg1, arg2)
    cb(null, null)
  }, 1000);
})

hook.callAsync(1, 2, () => console.log('end'))