/**
 * (?:pattern)、(?=pattern)、(?!pattern)、(?<=pattern)、(?<!pattern) 
 */

// 1、(?:pattern) -- (?:)表示非捕获分组，和捕获分组唯一的区别在于，非捕获分组匹配的值不会保存起来
const a = "123abc456ww"
const pattern1 = /([0-9]*)([a-z]*)([0-9]*)/g
// match:如果有g全局标志,那么返回的数组保存的是所有匹配的内容，不包括子匹配
// console.log(a.match(pattern1))
console.log(pattern1.exec(a))
const pattern2 = /(?:[0-9]*)([a-z]*)([0-9]*)/g
// 可以看到 (?:[0-9]*) 匹配的第一个 [0-9]*  没有保存下来，即没有保存匹配到的“123”，而([0-9]*)则保存了下来
console.log(pattern2.exec(a))
