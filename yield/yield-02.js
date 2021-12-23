/**
 * Generator 函数
 * 
 * 可迭代协议：js对象定义或定制它们的迭代行为 例如：for..of  内置可迭代对象： Array Map 
 * 要成为可迭代对象，一个对象必须实现@ @iterator 方法，这意味着对象（或者它原型链上的某个对象）必须有一个键为@ @iterator 的属性，可通过常量Symbol.iterator访问该属性
 * [Symbol.iterator] 一个无参数的函数，其返回值为一个符合迭代器协议的对象。
 * 
 * 迭代器协议
 * 值为有限个数时，所有值被迭代完毕后，则会返回一个默认值；只有实现一个拥有以下语义的next()方法，一个对象才能成为迭代器
 * 一个无参函数，返回一个拥有以下两个属性的对象：
 * done（boolean）：如果迭代器可以产生序列中的一个值，则为false；如果迭代器已将序列迭代完毕，则为true。这种情况下，value是可选的，如果他依然存在，即为迭代器结束之后的默认返回值
 * value：迭代器返回的任何 JavaScript 值。done 为 true 时可省略。
 * next对象必须返回一个对象，该对象有done&value两个属性。如果返回一个非对象值（false or undefined）则会抛出一个TypeError异常
 * 
{ value: 'h', done: false }
{ value: 'i', done: false }
{ value: undefined, done: true }
 */
let someString = 'hi'
// console.log(typeof someString[Symbol.iterator])
let iterator = someString[Symbol.iterator]()
iterator + 'a'

// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

function createIterator (arr) {
  let i = 0
  return {
    next: function () {
      const done = i >= arr.length
      const value = !done ? arr[i] : undefined
      i ++
      return { value: value, done: done }
    }
  }
}
// var interator = createIterator([1,3,4,3])
// console.log(interator.next())
// console.log(interator.next())
// console.log(interator.next())
// console.log(interator.next())
// console.log(interator.next())
// console.log(interator.next())

function* helloWorldGenerator () {
  yield 'hello'
  yield 'world'
  return 'ending'
}
const hw = helloWorldGenerator()
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())

// 作为表达式使用 需要加括号，不然会报错
// yield表达式本身没有返回值，或者说总是返回undefined(由next返回)
function * demo () {
  console.log('Hello ' + (yield))
  console.log('Hello ' + (yield 123))
  return 2
}
const d = demo()
// console.log(d.next())
// console.log(d.next())
// console.log(d.next())

const arr2 = [0, 1, 2, 3, 4]
function * flat (arr) {
  for (let i = 0; i < arr.length; i++ ) {
    console.log(typeof i)
    if (typeof i === 'number') {
      yield i
    } else {
      yield* flat(i)
    }
  }
}
const f = flat(arr2)
for (let j of f) {
  console.log(j)
}