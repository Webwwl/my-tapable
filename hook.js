class Hook {

  constructor(args) {
    if (args && !Array.isArray(args)) {
      throw new Error('args need to be an array')
    }
    this.args = args
    this.tasks = []
  }

  tap() {}

  tapAsync() {}

  tapPromise() {}
}

module.exports = Hook