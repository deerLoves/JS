class MyScroll {
  constructor (element, options) {
    this.element = element
    this.defaultOptions = {
      fixed: {
        'position': 'fixed',
        'top': 0,
        'z-index': 1000
      },
      none: {
        'position': 'relative',
        'z-index': 0
      }
    }
    this.setting = Object.assign({}, options, this.defaultOptions)
    this.init()
  }
  init () {
    const element = document.querySelector(this.element)
    const target = document.querySelector(this.setting.target)
    const fixed = this.setting.fixed
    const none = this.setting.none  
    /**
     * getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
     * 2.返回值类型：
      　rectObject.top：元素上边到视窗上边的距离;

        rectObject.right：元素右边到视窗左边的距离;

        rectObject.bottom：元素下边到视窗上边的距离;

        rectObject.left：元素左边到视窗左边的距离;
     */
    window.addEventListener('scroll', function () {
      // const obj = this.document.querySelector(target).getBoundingClientRect()
      const obj = element.getBoundingClientRect()
      // if (obj.top - element.clientHeight < 0 && obj.bottom - element.clientHeight > 0) {
      if (obj.top < 0) {
        for (const [key, val] of Object.entries(fixed)) {
          target.style[key] = val
        }
        target.style['width'] = target.parentNode.offsetWidth + 'px'
      } else {
        for (const [key, val] of Object.entries(none)) {
          target.style[key] = val
        }
      }
    })
  }
}