function* countAppleSales () {
  const saleList = [3, 7, 5]
  for (let i = 0; i < saleList.length; i++) {
    yield saleList[i]
  }
}
// console.log(countAppleSales)

const myArr = countAppleSales()
// console.log(myArr)
// 传参可以缺省，默认调用函数
// console.log(myArr.next(countAppleSales()))
// console.log(myArr.next())
// console.log(myArr.next())
// console.log(myArr.next())

function* countAppleSales2 () {
  for (let i = 0; true; i++ ) {
    const reset = yield i
    console.log(reset, i)
    if (reset) i = 1
  }
}
const myArr2 = countAppleSales2()
// console.log(myArr2.next()) // 0
// console.log(myArr2.next()) // 1
// console.log(myArr2.next()) // 2
// console.log(myArr2.next()) // 3
// console.log(myArr2.next()) // 4
// console.log(myArr2.next(true))
// console.log(myArr2.next()) // 0
// console.log(myArr2.next(true))

function * test (x) {
  const y = 2 * (yield (x + 1))
  console.log(y)
  const z = yield (y / 3)
  console.log('x=' + x + ',y=' + y + ',z=' + z)
  return 2
}
const a = test(5)
console.log(a.next()) // 
console.log(a.next()) // 
console.log(a.next()) // 
// console.log(undefined / 3) // 

const b = test(5)
// console.log(b.next()) // 
// console.log(b.next(12)) // 
// console.log(b.next(13)) // 