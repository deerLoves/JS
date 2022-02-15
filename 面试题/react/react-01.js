/**
 * 1、React 事件机制
 * 事件机制：React并不是将click事件绑定到了div的真实DOM上，而是在document处监听了所有的事件，当事件发生并且冒泡到document处的时候，React将事件内容封装并交由真正的处理函数运行。
 * 注意事项：如果不想要是事件冒泡的话应该调用event.preventDefault()方法
 * 机制优点：
 *  1）兼容问题。合成事件首先抹平了浏览器之间的兼容问题
 *  2）减少内存分配空间。对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。
 *  3）将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）
 *  4）方便 react 统一管理和事务机制。
 * 
 * 2、React的事件和普通的HTML事件有什么不同？
 * 执行顺序：原生事件先执行，合成事件后执行
 * 注意事项：尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行
 * 
 * 3、React 组件中怎么做事件代理？它的原理是什么？
 * 
 * 4、React 高阶组件
 * 说明：是一种基于 React 的组合特性而形成的设计模式。参数为组件，返回值为新组件的函数。
 * 特点：HOC 是纯函数，没有副作用。
 * 优点：逻辑服用、不影响被包裹组件的内部逻辑。
 * 缺点：
 *  1）ref隔断， React.forwardRef 来解决
 *  2）高阶组件多层嵌套，相同命名的props会覆盖老属性
 * 
 * 5、Render props
 * 说明：React 组件之间使用一个值为函数的 prop 共享代码的简单技术
 * 调用方式：<DataProvider render={data => (<h1>Hello {data.name}</h1>)}/>
 * 优点：数据共享、代码复用，将组件内的state作为props传递给调用者，将渲染逻辑交给调用者。
 * 缺点：无法在 return 语句外访问数据
 * 
 * 6、Hooks
 * 说明：16.8新增特性。
 * 优点：
 *  1）重名问题。解决hoc的prop 重名问题
 *  2）嵌套问题。解决render props 因共享数据 而出现嵌套地狱的问题
 *  3）能在return之外使用数据的问题
 * 
 * 7、对React-Fiber的理解，它解决了什么问题？
 * 理解：可以将浏览器的渲染、布局、绘制、资源加载(例如 HTML 解析)、事件响应、脚本执行视作操作系统的“进程”，需要通过某些调度策略合理地分配 CPU 资源，从而提高浏览器的用户响应速率, 同时兼顾任务执行效率。
 * 优点：分批延时对DOM进行操作，避免一次性操作大量 DOM 节点，可以得到更好的用户体验；
 * 
 * 8、React.Component 和 React.PureComponent 的区别
 * 理解：PureComponent表示一个纯组件，可以用来优化React程序，减少render函数执行的次数，从而提高组件的性能。
 * 对比：
 *  React.Component：当prop或者state发生变化时，可以通过在shouldComponentUpdate生命周期函数中执行return false来阻止页面的更新，从而减少不必要的render执行。
 *  React.PureComponent： 会自动执行 shouldComponentUpdate。
 * 注意事项：pureComponent中的 shouldComponentUpdate() 进行的是浅比较，如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致
 * 优点：PureComponent：当组件更新时，如果组件的props或者state都没有改变，render函数就不会触发。
 * 
 * 9、Component, Element, Instance 之间有什么区别和联系？
 * 
 * 10、React.createClass 和 extends Component的区别有哪些？
 * 
 * 11、对componentWillReceiveProps 的理解
 * 理解：
 *  1）组件初次渲染时不会执行componentWillReceiveProps；
 *  2）当props发生变化时执行componentWillReceiveProps；
 *  3）在这个函数里面，旧的属性仍可以通过this.props来获取；
 *  4）此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。即可以根据属性的变化，通过调用this.setState()来更新你的组件状态，在该函数中调用 this.setState() 将不会引起第二次渲染。
 *  5）也可在此函数内根据需要调用自己的自定义函数，来对prop的改变做出一些响应。
 * 注意：
 *  当父组件向子组件传递引用类型（或复合类型，比如对象、数组等）的属性时，要注意打印的this.props和nextProps的内容是一致的，因为引用类型在内存中只有一份，传值时是浅拷贝
 * 
 * 12、哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？
 * 方法：
 *  1）setState（）方法被调用。当 setState 传入 null 时，并不会触发 render。
 *  2）父组件重新渲染。即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render。
 * 做法：
 *  1）新旧两颗树进行深度优先遍历，每个节点进行标记，有差异就放到一个对象中去
 *  2）遍历差异对象，根据差异的类型和对应对规则更新VNode
 * 
 * 13、React如何判断什么时候重新渲染组件？
 * 回答：
 *  1）组件状态的改变可以因为props的改变，或者直接通过setState方法改变。
 *  2）当React将要渲染组件时会执行shouldComponentUpdate方法来看它是否返回true。
 * 
 * 14、React声明组件有哪几种方法，有什么不同？
 * 方法：
 *  1）函数式定义的无状态组件。
 *  2）ES5原生方式React.createClass定义的组件。
 *  3）ES6形式的extends React.Component定义的组件。
 * 对比：
 *  1）性能优化上，类组件主要依靠 shouldComponentUpdate 阻断渲染来提升性能，而函数组件依靠 React.memo 缓存渲染结果来提升性能。
 * 
 * 15、无状态组件的缺点
 * 缺点：
 *  1）无法使用 ref。
 *  2）无生命周期方法。
 *  3）无法控制组件的重渲染。因为无法使用shouldComponentUpdate方法，当组件接受到新的属性时则会重渲染
 * 
 * 16、React如何获取组件对应的DOM元素？
 * 方法：
 *  1）字符串格式。<p ref="info">span</p>
 *  2）函数格式。<p ref={ele => this.info = ele}></p>
 *  3）createRef()。React 16提供的一个API，使用React.createRef()来实现
 * 
 * 17、对React的插槽(Portals)的理解
 * 
 * 18、在React中如何避免不必要的render？
 *  1）shouldComponentUpdate 和 PureComponent
 *  2）利用高阶组件。
 *      在函数组件中，并没有 shouldComponentUpdate 这个生命周期，可以利用高阶组件，封装一个类似 PureComponet 的功能
 *  3）React.memo
 *      React.memo只能用于函数组件。
 * 
 * 19、React-Intl的理解
 * 
 * 20、React context的理解
 * 理解：当你不想在组件树中通过逐层传递props或者state的方式来传递数据时，可以使用Context来实现跨层级的组件数据传递。
 * 说明：组件通过Context是可以访问到其父组件链上所有节点组件提供的Context的属性。
 * 
 * 21、为什么React并不推荐优先考虑使用Context？
 * 说明：context的更新需要通过setState()触发，但是这并不是很可靠的，Context支持跨组件的访问，但是如果中间的子组件通过一些方法不影响更新，比如 shouldComponentUpdate() 返回false 那么不能保证Context的更新一定可以使用Context的子组件。
 * 
 * 22、受控组件&非受控组件？
 * 
 * 23、React中refs
 * 说明：由于函数组件没有实例，因此不能在函数组件上直接使用 ref
 * 注意：
 *  1）ref 的返回值取决于节点的类型：
 *    a. 当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为他的 current 属性以创建 ref。
 *    b. 当 ref 属性被用于一个自定义的类组件时，ref 对象将接收该组件已挂载的实例作为他的 current。
 *  2）当在父组件中需要访问子组件中的 ref 时可使用传递 Refs 或回调 Refs。
 * 
 * 24、React.forwardRef是什么？它有什么作用？
 * 
 * 25、什么是副作用
 *   数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用
 * 
 * 26、为什么需要使用useMemo
 *  https://www.jianshu.com/p/94ace269414d
 * 
 * 27、为什么需要使用useRef
 *  https://www.jianshu.com/p/34b445a15494
 * 
 * 28、为什么需要使用useCallback
 *  https://www.jianshu.com/p/be8fb469d507
 * 
 * 29、useEffect && useLayoutEffect
 *  useEffect在浏览器渲染完成后执行
    useLayoutEffect在DOM更新后执行
    useLayoutEffect 总是比 useEffect 先执行，useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.
    因为useEffect在render之后调用，页面会有一个从0变成1000的短暂闪烁
    正常情况下，DOM操作很多，等DOM操作完，再去渲染，useLayoutEffect在渲染前，改变DOM
    https://www.jianshu.com/p/f575eba0d0dd
 * 
 */