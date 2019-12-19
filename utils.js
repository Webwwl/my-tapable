const isUndef = exports.isUndef = (val) => !val && val !== 0

const addArgs = exports.addArgs = (args, fnRet) => {
  !isUndef(fnRet) && (args[0] = fnRet)
  return args
}