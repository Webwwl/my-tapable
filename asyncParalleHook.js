const Hook = require('./hook')

class asyncParalleHook extends Hook {

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
      index === this.tasks.length && finalCallBack()
    }

    for (const task of this.tasks) {
      task(...this.args, done)
    }
  }
}

const hook = new asyncParalleHook(['arg1'])

hook.tapAsync('a', (arg1, cb) => {
  setTimeout(() => {
    console.log('a', arg1)
    cb()
  }, 1000);
})

hook.tapAsync('b', (arg1, cb) => {
  setTimeout(() => {
    console.log('b', arg1)
    cb()
  }, 1000);
})

hook.callAsync(1, () => console.log('end'))