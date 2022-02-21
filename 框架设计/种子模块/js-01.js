var avalon = {}
// \s : 表示空白（空格，tab ，回车，换行)
// ?: 限制?前面一个或一组字符串连续出现至少0次,最多1次  相当于{0,1}
// []: 表示范围 例子： /^[abc]{3,5}$/
avalon.isFunction = function (fn) {
  // console.log(!!fn)
  // console.log(fn.nodeName) // undefined
  // console.log(fn.constructor) // ƒ Function() { [native code] }
  return !!fn && typeof fn !== 'string' && !fn.nodeName
  && fn.constructor != Array && /^[\s[]?function]/.test(fn + '')
}
// Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）
avalon.isPlainObject = function (obj) {
  return typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype
}
// console.log(avalon.isFunction(function(){}))
avalon.mix = function () {
  let options, name, src, copy, copyIsArray, clone, 
  target = arguments[0] || {},
  i = 1,
  length = arguments.length,
  deep = false

  // 如果第一个参数为布尔，判定是否拷贝
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[1] || {}
    i ++
  }
  // 确保接收方为一个复杂的数据结构
  if (typeof target !== 'object' && !avalon.isFunction(target)) {
    target = {}
  }
  // 如果只有一个参数，那么新成员添加于mix所在的对象上
  if (i === length) {
    target = this
    i --
  }
  for (; i < length; i ++) {
    // 只处理非空参数
    if ((options = arguments[i]) !== null) {
      // 找到相同的属性
      for (name in options) {
        try {
          src = target[name]
          copy = options[name]
          console.log(src, copy)
          // console.log(JSON.parse(JSON.stringify(target)), JSON.parse(JSON.stringify(options)))
        } catch (e) {
          continue
        }
        // 防止环引用
        if (target === copy) {
          continue
        }
        if (deep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            /*
              这一步很有必要，如果不加这一步，那么
              const c = {
                a: 'sss'
              }
              const d = {
                a: [2, 5, 8]
              }
              avalon.mix(true, c, d) // {a: {0: 2, 1: 5, 2: 8}}
            */
            clone = src && Array.isArray(src) ? src : []
            // console.log(clone)
          } else {
            clone = src && avalon.isPlainObject(src) ? src : {}
          }
          target[name] = avalon.mix(deep, clone, copy)
        } else if (copy !== void 0) {
          target[name] = copy
        }
      }
    }
  }
  return target
}
const a = {
  a: 1,
  b: [2, 3, 4],
  c: function () {
    console.log('abc')
  },
  d: {
    d1: 6
  },
  g: 'sss'
}
const b = {
  a: 2,
  b: [5, 6, 7],
  d: {
    d2: 8
  },
  e: 'Jack',
  f: false,
  g: [3, 9, 8]
}
const c = {
  a: 'sss'
}
const d = {
  a: [2, 5, 8]
}
const e = {
  a: 'sss'
}
const f = {
  a: {
    a1: 'tom'
  }
}
// console.log(avalon.mix(true, a))
// console.log(avalon.mix(true, a, b))
// console.log(avalon.mix(true, c, d))
console.log(avalon.mix(true, e, f))
// avalon.fn.mix = avalon.mix