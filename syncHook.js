const Hook = require('./hook')

class SyncHook extends Hook {

  constructor(args) {
    super()
  }

  tap(name, fn) {
    this.tasks.push(fn)
  }

  call(...args) {
    this.args = args
    for (const task of this.tasks) {
      task(...this.args)
    }
  }
}

const hook = new SyncHook()

hook.tap('a', (arg1) => console.log('arg1:', arg1))
hook.call(1)