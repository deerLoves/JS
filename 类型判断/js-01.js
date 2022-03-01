// null
function isNull (obj) {
  return obj === null
}
// undefined
function isUndefined (obj) {
  return obj === void 0
}
// NaN
function isNaN (obj) {
  return obj !== obj
}
// Obeject.prototype.toString.call()

// plainObject
function isPlainObject (obj) {
  return typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype
}

// function
function isFunction (fn) {
  return !!fn && typeof fn !== 'string' && !fn.nodeName &&
  fn.constructor != Array && /^[\s[]?function/.test(fn + '')
}

// window
function isWindow (obj) {
  const rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
  return rwindow.test(toString.call(obj))
}