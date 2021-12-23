/**
 * 1、let const var
 * 
 * 2、ES6对Array数组类型做了哪些升级优化
 * 数组解构赋值 扩展运算符
 * 数组查询
 * 实现数组去重（ES6）
 * 如何copy一个数组 slice() arr.concat()
 * 
 * 3、Object升级优化
 * Object.is()
 * Object.assign() 
 * assign合并的对象target只能合并source1、source2中的自身属性，并不会合并source1、source2中的继承属性，也不会合并不可枚举的属性，且无法正确复制get和set属性
 * 深浅拷贝
 * Object.keys()，Object.values()，Object.entries()
 * 
 * Object.entries(a).forEach(v => {
    let [key, value] = v
    console.log('key:', key, 'value:', value)
   })

   4、箭头函数和普通函数区别
      this指向 arguments对象

   5、call apply bind
      call 参数 一个一个传递
      apply 参数 数组形式传递
      bind 语法和call一样，区别在于call是立即执行，bind是等待执行
      let fn = function(a){
        console.log(this, a)
      }
      let obj = { name:"obj" }
      // this改变为obj了，但是绑定的时候立即执行，当触发点击事件的时候执行的是fn的返回值undefined
      document.onclick = fn.call(obj)
      // bind会把fn中的this预处理为obj，此时fn没有执行，当点击的时候才会把fn执行
      document.onclick = fn.bind(obj)
      
   6、for...in 和for...of有什么区别

 */