// 向上查找元素
function _closest (el, selector, ctx) {
  if (el && ctx) {
    ctx = ctx || document
    selector = selector.split('.')
    console.log(selector)
    var tag = selector.shift().toUpperCase()
      , re = new RegExp('\\b('+selector.join('|')+')\\b', 'g')
    do {
      console.log(tag, el.nodeName, el.className, (el.className + '').match(re), selector)
      if (
        (tag === '' || el.nodeName === tag) 
        && (!selector.length || ((el.className + '').match(re) || []).length === selector.length)
      ) {
        return el
      }
    } while ( el !== ctx && (el = el.parentNode))
  }
  return null
}