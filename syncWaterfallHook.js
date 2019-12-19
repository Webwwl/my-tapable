const Hook = require('./hook')
const { isUndef, addArgs } = require('./utils')

class SyncWaterfallHook extends Hook {

  constructor(args) {
    super()
  }

  tap(name, fn) {
    this.tasks.push(fn)
  }

  call(...args) {
    this.args = args
    this.tasks.reduce((pre, curr) => {
      if (Array.isArray(pre)) {
        return addArgs(this.args, curr(...pre))
      }
      return addArgs(this.args, curr(pre))
    }, this.args)
  }
}


// const { SyncWaterfallHook } = require('tapable')

const hook = new SyncWaterfallHook(['arg1', 'arg2'])

hook.tap('a', (arg1, arg2) => console.log('a', arg1, arg2))
hook.tap('b', (arg1, arg2) => {
  console.log('b:', arg1, arg2)
  return 2
})
hook.tap('c', (arg1, arg2) => console.log('c:', arg1, arg2))
hook.call(1, 2)