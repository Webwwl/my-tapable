const Hook = require('./hook')
const { isUndef } = require('./utils')

class SyncBailHook extends Hook {

  constructor(args) {
    super()
  }

  tap(name, fn) {
    this.tasks.push(fn)
  }

  call(...args) {
    this.args = args
    for (const task of this.tasks) {
      const ret = task(...this.args)
      if (!isUndef(ret)) break
    }
  }
}

const hook = new SyncBailHook()

hook.tap('a', (arg1) => console.log('a'))
hook.tap('b', (arg1) => {
  console.log('b:', arg1)
  return 1
})
hook.tap('c', (arg1) => console.log('c:', arg1))
hook.call(1)