/**
 * vue 优化
 */

/**
 * 1、v-if & v-show
 * 
 * v-if 是通过控制dom节点的存在与否来控制元素的显隐
 * 
 * v-show不管初始条件是什么，元素总是会被渲染，并且是通过设置DOM元素的display样式，block为显示，none为隐藏
 * 
 * v-if适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show则适用于需要非常频繁切换条件的场景。
 * 
 * v-if 适合控制组件渲染&销毁，目的是为了利用组件中的生命周期
 * 
 */ 

/**
 * 2、computed和watch
 * 
 * Object.defineProperty() => Object.defineProperty(obj, prop, descriptor)
 * 参数
 * 参数一：obj要定义属性的对象
 * 参数二：prop要定义或修改的属性的名称或 Symbol
 * 参数三：descriptor要定义或修改的属性描述符，是一个json，定义get set
 * 
 * Object.defineProperties(obj, 'a', {
    set: function (val) {
      console.log('set funtion execute')
      this._a = val
    },
    get: function () {
      console.log('get function execute')
      return this._a
    }
  })
 * 
 * computed: 
 * a) data属性初始化getter setter
 * b) computed计算属性初始化，提供的函数将作属性 vm.reversedMessage 的 getter
 * c) 当首次获取reversedMessage计算属性值时，Dep开始依赖收集
 * d) 在执行data getter方法时，如果Dep处于依赖收集状态，则判断data为reversedMessage的依赖，并建立依赖关系
 * e) 当data发生变化时，根据依赖关系，触发reversedMessage重新计算
 * 
 * 运用场景
 * a) 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；-- 主要是UI操作
 * b) 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch -- 主要是业务逻辑判断
 * 
 */

  // let Dep = null
  // function defineReactive (obj, key, val) {
  //   const deps = []
  //   Object.defineProperty(obj, key, {
  //     get: function () {
  //       if (Dep) {
  //         deps.push(Dep)
  //       }
  //       console.log(deps.length, '---')
  //       return val
  //     },
  //     set: function (newVal) {
  //       val = newVal
  //       deps.forEach(func => func())
  //     }
  //   })
  // }
  // function defineComputed (obj, key, func) {
  //   func = func.bind(obj)
  //   let value
  //   Dep = function () {
  //     console.log('22')
  //     value = func()
  //   }
  //   value = func() // 执行一次属性计算函数，计算函数中的thia.a的执行，会执行a的get函数，将计算属性函数放到依赖数组中
  //   Dep = null
  //   Object.defineProperty(obj, key, {
  //     get: function () {
  //       return value // 返回闭包中的值
  //     }
  //   })
  // }

  // let obj = {}
  // defineReactive(obj, 'a', 0)
  // defineComputed(obj, 'b', function () {
  //   let a = this.a
  //   return a + 1
  // })

  // console.log(obj.b)
  // obj.a += 1
  // console.log(obj.b)
  // obj.a += 1
  // console.log(obj.b)
  // obj.a += 1
  // console.log(obj.b)

  /**
   * 3.v-for 遍历必须为item添加key，避免同时使用v-if
   * 
   * key:
   * 如果不加key，diff执行起来将逐个进行修改；如果添加了key，可以仅修改数据变动的item
   * 此外，如果强制替换元素，vue认为一个新的元素
   * 
   * v-for 比 v-if优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当需要渲染很小一部分的时候，必要情况下应该替换成computed属性，或者提高到最外层元素上
   * js:
      computed: {
        activeUsers: function () {
          return this.users.filter(v => v.isActive)
        }
      }
    vue:
      <ul>
        <li
          v-for="user in activeUsers"
          :key="user.id"
        >
          {{ user.name }}
        </li>
      </ul>

      为什么不能用index做为key？
      1.如果删除中间元素后，后面的元素key值会重新排列，所以被重新渲染，影响性能
      2.如果此时list的item是select的选项，其中元素3被选中，如果此时元素2被删除了，用index作为key就会变成为元素4被选中了，出现了bug
   * 
   * 
   */

   /**
    * 4、长列表性能优化
    * Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，
    * 在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，可以通过 Object.freeze方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。
    * 
    * Object.freeze() : 对象冻结，添加、修改、删除属性被禁止。可枚举性，可写性，可配置性，也被禁止修改
    * Object.freeze()冻结的是值，你仍然可以将变量的引用替换掉。
    * 例如
    * new Vue({
        data: {
          list: Object.freeze([
            { value: 1 },
            { value: 2 }
          ])
        },
        created () {
            // 界面不会有响应
            this.list[0].value = 100;

            // 下面两种做法，界面都会响应
            this.list = [
                { value: 100 },
                { value: 200 }
            ];
            this.list = Object.freeze([
                { value: 100 },
                { value: 200 }
            ]);
        }
      })
    */
    

    /**
     * 5、图片资源懒加载
     * 使用Vue的 vue-lazyload插件
     * 在 vue 文件中将 img 标签的 src 属性直接改为 v-lazy ，从而将图片显示方式更改为懒加载显示
     * <img v-lazy="/static/img/1.png">
     */
      
    /**
     * 6、第三方插件按需引入
     * babel-plugin-component
     */

    /**
     * 7、优化无限列表性能
     * 只需要渲染少部分区域的内容，减少重新渲染组件和创建 dom 节点的时间
     */

    /**
     * 8、什么是source map?
     * Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
     * 
     * sourcr-map: 会将报错信息直接映射到哪一行哪一列哪里错了
     * cheap-source-map: 只会帮我们直接提示哪一行报错。cheap：映射业务代码，不映射loader和第三方库。会提升打包构建速度。
     * cheap-module-souce-map: 使用一下babel转换es6的代码. cheap-source-map => index.js cheap-module-souce-map => format.js
     */