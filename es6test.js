var timer = {
  seconds: 0,
  start () {
    setInterval(() => {
      this.seconds++
    }, 1000)
  }
}
timer.start()
setTimeout(function () {
  console.log(timer.seconds)
}, 3500)
//==========================
[1, 2, 3].map(value => { number: value, verified: true })// <- SyntaxError
[1, 2, 3].map(value => ({ number: value, verified: true }))
/*[
  { number: 1, verified: true },
  { number: 2, verified: true },
  { number: 3, verified: true }]
*/
//==================
var character = {
  name: 'Bruno',
  pseudonym: 'Batman',
  metadata: {
    age: 34,
    gender: 'male'
  },
  batarang: ['gas pellet', 'bat-mobile control', 'bat-cuffs']
}
var { pseudonym } = character//var  pseudonym  = character.pseudonym
var { pseudonym, name } = character// pseudonym  = character.pseudonym,name = character.name
var { pseudonym: alias } = character//alias=character.pseudonym
var { metadata: { gender } } = character//gender=character.metadata.gender
var { metadata: { gender : metagender } } = character//metagender=character.metadata.gender
console.log(character.boots)// <- undefined
console.log(character['boots'])// <- undefined
var { boots } = character
console.log(boots)// <- undefined
//A destructured declaration accessing a nested property of a parent object that’s null or undefined will throw an Exception
var { batmobile: { gear } } = character// <- Exception
var { missing } = null// <- Exception
//you can provide default values for those cases where the value is undefined
var { boots = true } = character
console.log(boots)// <- true
var { metadata: { enemy = 'Satan' } } = character
console.log(enemy)// <- 'Satan'

//==================================
//3.3.2 Destructuring Arrays
var coordinates = [12, -7]
var [x, y] = coordinates
console.log(x)// <- 12
var names = ['James', 'L.', 'Howlett']
var [ firstName,, lastName ] = names
console.log(lastName)// <- 'Howlett'
var names = ['James', 'L.']
var [ firstName = 'John',, lastName = 'Doe' ] = names
console.log(lastName)// <- 'Doe'
var left = 5
var right = 7
[left, right] = [right, left]//left=7,right=5

//==================================
//3.3.3 Destructuring Function Paremeters
function carFactory (options = { brand: 'Volkswagen', year: 1999 }) {
  console.log(options.brand)// <- 'Volkswagen'
  console.log(options.year)// <- 1999
}
carFactory()
function sumOf (a = 1, b = 2, c = 3) {
  return a + b + c
}
console.log(sumOf(undefined, undefined, 4))// <- 1 + 2 + 4 = 7
function carFactory (options = { brand: 'Volkswagen', year: 1999 }) {
  console.log(options.brand)
  console.log(options.year)
}
carFactory()
// <- 'Volkswagen'
// <- 1999
carFactory({ year: 2000 })
// <- undefined
// <- 2000

function carFactory ({ brand = 'Volkswagen', year = 1999 }) {
  console.log(brand)
  console.log(year)
}
carFactory({ year: 2000 })
// <- 'Volkswagen'
// <- 2000
carFactory()
// <- undefined
// <- undefined
function carFactory ({ brand = 'Volkswagen', year = 1999 }={}) {
  console.log(brand)
  console.log(year)
}
carFactory()
// <- 'Volkswagen'
// <- 2000

//==================================
//3.3.4 Use Cases for Destructuring
function getCoordinates () {
  return { x: 10, y: 22, z: -1, type: '3d' }
}
var { x, y } = getCoordinates()//x=10,y=22
function splitDate (date) {
  var rdate = /(\d+).(\d+).(\d+)/
  return rdate.exec(date)
}
var [x, year, month, day] = splitDate('2015-11-06')//year="2015",month="11",day="06",x="2015-11-06"

//==================================
//3.4 Rest Parameters and Spread Operator
function print () {
  var list = Array.prototype.slice.call(arguments)
  console.log(list)
}
print('a', 'b', 'c')// <- ['a', 'b', 'c']

//ES6 has a better solution to the problem, and that’s rest parameters.
//==================================
//3.4.1 rest Parameters
function print (...list) {
  console.log(list)
}
print('a', 'b', 'c')// <- ['a', 'b', 'c']
function print (first, ...list) {
  console.log(first)// <- 'a'
  console.log(list)// <- [b', 'c']
}
print('a', 'b', 'c')

var sumAll = (...numbers) => numbers.reduce((total, next) => total + next)
console.log(sumAll(1, 2, 5))// <- 8

function sumAll () {
  var numbers = Array.prototype.slice.call(arguments)
  return numbers.reduce(function (a, b) {
    return a + b
  })
}
console.log(sumAll(1, 2, 5))// <- 8

//==================================
//4.4.2 Spread Operator
function cast () {
  return [...arguments]//将参数转换成数组
}
cast('a', 'b', 'c')// <- ['a', 'b', 'c']
function cast () {
  return ['left', ...arguments, 'right']
}
cast('a', 'b', 'c')// <- ['left',a', 'b', 'c','right']
//合并数组
var all = [1, ...[2, 3], 4, ...[5], 6, 7]
console.log(all)// <- [1, 2, 3, 4, 5, 6, 7]
function multiply (left, right) {
  return left * right
}
var result = multiply(...[2, 3])
console.log(result)// <- 6

function print (...list) {
  console.log(list)
}
print(1, ...[2, 3], 4, ...[5])// <- ['1', '2', '3', '4', '5']

var list = ['a', 'b', 'c', 'd', 'e']
var first = list.shift()//a,list=['b', 'c', 'd', 'e']
var second = list.shift()//b,list=['c', 'd', 'e']
console.log(first)// <- 'a'

var [first, second, ...rest] = ['a', 'b', 'c', 'd', 'e']
console.log(rest)// <- ['c', 'd', 'e']


new (Date.bind.apply(Date, [null, 2015, 11, 31]))// <- Thu Dec 31 2015//es5
new Date(...[2015, 11, 31])// <- Thu Dec 31 2015//es6

//==================================
//3.5 Template Literals:``(字符串在可以有引号并且不需要转义)
var text = `I'm "amazed" at these opportunities!`

//3.5.1 String Interpolation(模板中可以插入任意js表达式)
var name = 'Shannon'
var text = `Hello, ${ name }!`
console.log(text)// <- 'Hello, Shannon!'
`The time and date is ${ new Date().toLocaleString() }.`// <- 'the time and date is 8/26/2015, 3:15:20 PM'
`The result of 2+3 equals ${ 2 + 3 }`// <- 'The result of 2+3 equals 5'
`This a template literal ${ `with another ${ 'one' } embedded inside it` }`// <- 'This a template literal with another one embedded inside it'

//3.5.2 Multiline Template Literals(多行)
//way1
var escaped =
'The first line\n\
A second line\n\
Then a third line'
//way2
var concatenated =
'The first line\n' +
'A second line\n' +
'Then a third line'
//way3
var joined = [
'The first line',
'A second line',
'Then a third line'
].join('\n')
//by ES6(es6的模板字支持多行)
var multiline =
`The first line
A second line
Then a third line`

var book = {
  title: 'Modular ES6',
  excerpt: 'Here goes some properly sanitized HTML',
  tags: ['es6', 'template-literals', 'es6-in-depth']
}
var html = `<article>
  <header>
    <h1>${ book.title }</h1>
  </header>
  <section>${ book.excerpt }</section>
  <footer>
    <ul>
      ${
        book.tags
          .map(tag => `<li>${ tag }</li>`)
          .join('\n      ')
      }
    </ul>
  </footer>
</article>`
/*
<article>
  <header>
    <h1>Modular ES6</h1>
  </header>
  <section>Here goes some properly sanitized HTML</section>
  <footer>
    <ul>
      <li>es6</li>
      <li>template-literals</li>
      <li>es6-in-depth</li>
    </ul>
  </footer>
</article>*/

//3.5.3 Tagged Templates
var text = String.raw`The "\n" newline won't result in a new line.
It'll be escaped.`//String.raw使得\n不是换行，而是普通的字符串
console.log(text)// The "\n" newline won't result in a new line.// It'll be escaped.

function tag (parts, ...values) {
  return parts.reduce(
    (all, part, i) => all + values[i - 1] + part
  )
}
var text=tag(['Hello, ', '. I am ', ' to meet you!'], 'Maurice', 'thrilled');
//==var text = tag`Hello, ${ name }. I am ${ emotion } to meet you!`
console.log(text);//Hello, Maurice. I am thrilled to meet you!
function upper (parts, ...values) {
  return parts.reduce(
    (all, part, i) => all + values[i - 1].toUpperCase() + part
  )
}
var name = 'Maurice'
var emotion = 'thrilled'
var text = upper`Hello, ${ name }. I am ${ emotion } to meet you!`
console.log(text)// <- 'Hello MAURICE, I am THRILLED to meet you!'

//========================
//3.6 Let and Const Statements
function isItTwo (value) {
  if (value === 2) {
    var two = true
  }
  return two
}
isItTwo(2)// <- true
isItTwo('two')//undefined
//==function isItTwo (value) {
//  var two
//  if (value === 2) {
//    two = true
//  }
//  return two
//}
//变量名提升，变量声明总会提升到作用域的顶部

//3.6.1 Block Scoping and Let Statements
for (let i = 0; i < 2; i++) {
  console.log(i)  // <- 0 // <- 1
}
console.log(i)// <- i is not defined

//3.6.2 Temporal Dead Zone(let and const 均不存在变量提升，即具有临时死亡区)
function readName () {
  return name
}
console.log(readName())//报错是因为name在TDZ，即还未声明
// ReferenceError: name is not defined
let name = 'Stephen Hawking'

function readName () {
  return name
}
let name
console.log(readName())//不会报错，name已经离开TDZ
// <- undefined

//3.6.3 Const Statements(不能被显示的重新赋值，但是可以改变)
const pi = 3.1415
{
  const pi = 6
  console.log(pi)  // <- 6
}
console.log(pi)// <- 3.1415

const people = ['Tesla', 'Musk']
people = []
console.log(people)// <- ['Tesla', 'Musk']
people.push('sa')
console.log(people)//<- ['Tesla', 'Musk','sa']

//3.6.4 Merits of Const and Let



//=================================================================
//============Chapter 4 : Classes, Symbols, and Objects============
//=================================================================
//4.1 Classes(类和结构一样，也是语法糖，是基于原型继承的语法糖)
//没有变量名提升

//4.1.1 class fundermentals
function Fruit (name, calories) {
  this.name = name
  this.calories = calories
  this.pieces = 1
}
Fruit.prototype.chop = function () {
  this.pieces++
}
Fruit.prototype.bite = function (person) {
  if (this.pieces < 1) {
    return
  }
  const calories = this.calories / this.pieces
  person.satiety += calories
  this.calories -= calories
  this.pieces--
}
//es6(方法声明之间没有逗号)(构造函数是可选的，比一定要有)
class Fruit {
  constructor (name, calories) {
    this.name = name
    this.calories = calories
    this.pieces = 1
  }
  chop () {
    this.pieces++
  }
  bite (person) {
    if (this.pieces < 1) {
      return
    }
    const calories = this.calories / this.pieces
    person.satiety += calories
    this.calories -= calories
    this.pieces--
  }
}
class Person {
  constructor () {
    this.satiety = 0
  }
  eat (fruit) {
    while (fruit.pieces > 0) {
      fruit.bite(this)
    }
  }
}
const plum = new Fruit('plum', 40)
const person = new Person()
person.eat(plum)
console.log(person.satiety)
// <- 40
//可以这样声明类，省略类名
const Person = class {
  constructor (name) {
    this.name = name
  }
}
const createPersonClass = name => class extends Person {
  constructor () {
    super(name)
  }
}
const Jake = createPersonClass('Jake')
const Jake1 =new Jake()
console.log(Jake1.name)//'Jake'

//4.1.2 Properties and Methods in Classes
class Log {
  constructor (...args) {
    console.log(args)
  }
}
new Log('a', 'b', 'c')// <- ['a' 'b' 'c']（参数可以作为构造函数的参数，用来初始化类）

class Counter {
  constructor (start) {
    this.count = start
  }
  get next () {
    return this.count++
  }
}
const counter = new Counter(2)
console.log(counter.next)// <- 2
console.log(counter.next)// <- 3
console.log(counter.next)// <- 4

//-----getters and setters
class LocalStorage {
  constructor (key) {
    this.key = key
  }
  get data () {
    return JSON.parse(localStorage.getItem(this.key))
  }
  set data (data) {
    localStorage.setItem(this.key, JSON.stringify(data))
  }
}
const ls = new LocalStorage('groceries')
ls.data = ['apples', 'bananas', 'grapes']
console.log(ls.data)// <- ['apples', 'bananas', 'grapes']
//静态变量，还可以是静态方法static get, static set
class MathHelper {
  static sum (...numbers) {
    return numbers.reduce((a, b) => a + b)
  }
}
console.log(MathHelper.sum(1, 2, 3, 4, 5))// <- 15

//4.1.3 Extending JavaScript Classes
/*const util = require('util')
function Banana () {
  Fruit.call(this, 'banana', 105)
}
util.inherits(Banana, Fruit)
Banana.prototype.slice = function () {
  this.pieces = 12
}
function Banana () {
  Fruit.call(this, 'banana', 105)
}
Banana.prototype = Object.create(Fruit.prototype)
Banana.prototype.slice = function () {
  this.pieces = 12
}*/
class Banana extends Fruit {
  constructor () {
    super('banana', 105)
  }
  slice () {
    this.pieces = 12
  }
}
const person = { satiety: 0 }
const banana = new Banana()
banana.slice()
banana.bite(person)
console.log(person.satiety)// <- 8.75
console.log(banana.pieces)// <- 11
console.log(banana.calories)// <- 96.25


//===================================
//==========4.2 Symbols（local glabol well-known）==========
//没有字面表示，是用于实现某种协议

//4.2.1 Local Symbols
const first = Symbol()
const oops = new Symbol()// <- TypeError, Symbol is not a constructor
const mystery = Symbol('my symbol')
//symbol是唯一的，即使描述一样彼此也是不同的
console.log(Symbol() === Symbol())// <- false
console.log(Symbol('my symbol') === Symbol('my symbol'))// <- false
//其类型是symbol
console.log(typeof Symbol())// <- 'symbol'
//Symbol可以作为属性名，
const weapon = Symbol('weapon')
const character = {
  name: 'Penguin',
  [weapon]: 'umbrella'
}
console.log(character[weapon])
// <- 'umbrella'
//symbol 会被隐藏
const weapon = Symbol('weapon')
const character = {
  name: 'Penguin',
  sex:'women',
  [weapon]: 'umbrella'
  //  [weapon]:()=>({key:'value'})
}
for (let key in character) {
  console.log(key)  // <- 'name'// <- 'sex'
  //console.log(key)  // <- 'name'// <- 'sex'//[weapon]
}
console.log(JSON.stringify(character))// <- '{"name":"Penguin"}'
//symbol只能被专门的方法获取
console.log(Object.getOwnPropertySymbols(character))// <- [Symbol(weapon)]

//4.2.2 Practical use cases for Symbols
//Defining Protocols through Symbols
//JSON.stringify获取toJSON返回的内容，如果toJSON不是函数则返回所以属性
const character = {
  name: 'Thor',
  toJSON: () => ({
    key: 'value'
  })
}
console.log(JSON.stringify(character))// <- '"{"key":"value"}"'
const character = {
  name: 'Thor',
  toJSON: true
}
console.log(JSON.stringify(character))// <- '"{"name":"Thor","toJSON":true}"'（toJSON不是函数）
//
const json = Symbol('alternative to toJSON')
const character = {
  name: 'Thor',
  [json]: () => ({
    key: 'value'
  })
}
stringify(character)
function stringify (target) {
  if (json in target) {
    return JSON.stringify(target[json]())//[json]为函数
  }
  return JSON.stringify(target)//[json]为值
}

//4.2.3 Global Symbol Registry
//two methods:Symbol.for and Symbol.keyFor

//Getting symbols with Symbol.for(key)(如果存在就返回该symbol,否则创建并添加该symbol进全局 symbol Registry)it looks for a symbol under a key, creates one if it didn’t already exist, and then returns the symbol.
const example = Symbol.for('example')
console.log(example === Symbol.for('example'))// <- true
//Using Symbol.keyFor(symbol) to retrieve symbol keys(获取symbol返回其key,如果该symbol不存在则返回undifined)
const example1 = Symbol.for('example')
console.log(Symbol.keyFor(example1))//'example'
console.log(Symbol.keyFor(Symbol()))// <- undefined
//局部symbol不是全局symbol的一部分
const example = Symbol.for('example')
console.log(Symbol.keyFor(Symbol('example')))// <- undefined

//Best Practices and Considerations
const d = document
const frame = d.body.appendChild(d.createElement('iframe'))
const framed = frame.contentWindow
const s1 = window.Symbol.for('example')
const s2 = framed.Symbol.for('example')
console.log(s1 === s2)// <- true


//4.2.4 Well-known Symbols
//Symbol.toPrimitive
const morphling = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return Infinity
    }
    if (hint === 'string') {
      return 'a lot'
    }
    return '[object Morphling]'
  }
}
console.log(+morphling)// <- Infinity
console.log(`That is ${ morphling }!`)// <- 'That is a lot!'
console.log(morphling + ' is powerful')// <- '[object Morphling] is powerful'
//Symbol.match
const text = '/an example string/'
const regex = /an example string/
regex[Symbol.match] = false//如果是true则会被当成字符串而不是正则表达式了
console.log(text.startsWith(regex))// <- true

//Shared across realms but not in the registry
//Symbol.iterator
const frame = document.createElement('iframe')
document.body.appendChild(frame)
console.log(Symbol.iterator === frame.contentWindow.Symbol.iterator)// <- true
console.log(Symbol.keyFor(Symbol.iterator))// <- undefined(说明Symbol.iterator不在全局注册表中)


//=======================================
//4.3 Object Built-in Improvements
//之前的Object.getOwnPropertySymbols,其他静态方法：Object.assign, Object.is, and Object.setPrototypeOf

//4.3.1 Extending objects with Object.assign(继承object)
const defaults = {
  first: 'first',
  second: 'second'
}
function print (options) {
  console.log(Object.assign({}, defaults, options))
}
print()// <- { first: 'first', second: 'second' }
print({ third: 3 })// <- { first: 'first', second: 'second', third: 3 }
print({ second: false })// <- { first: 'first', second: false }
Object.assign({}, { a: ['b', 'c', 'd'] }, { a: ['e', 'f'] })// <- { a: ['e', 'f'] }(被覆盖而不是追加)
Object.assign({}, { a: { b: 'c', d: 'e' } }, { a: { f: 'g' } })// <- { a: { f: 'g' } }

//4.3.2 Comparing objects with Object.is(相当于===，但又不完全相同)
NaN === NaN// <- false
Object.is(NaN, NaN)// <- true
-0 === +0// <- true
Object.is(-0, +0)// <- false

//4.3.3 Object.setPrototypeOf
const baseCat = { type: 'cat', legs: 4 }
const cat = Object.create(baseCat)//ES5
cat.name = 'Milanesita'
const cat = Object.setPrototypeOf({ name: 'Milanesita' }, baseCat)//ES6//ps:影响性能，建议用ES5的 Object.create



//===================================================
//===============Iteration and Flow Control==========
//============Promises\Iterators\Generators =========

//5.1 Promises:最终将成为可用的值的代表

//5.1.1 Getting Started with Promises
fetch('/items')//获取请求
fetch('/items').then(response => {
  // do something
})//回调函数then,当/items资源加载完毕时调用

const p = fetch('/items')
p.then(res => {
  // handle response
})
p.catch(error => {
  // handle error
})
//or
const p = fetch('/items')
p.then(
  res => {
    // handle response
  },
  err => {
    // handle error
  }
)
//  or
const p = fetch('/items')
p.then(res => {
  // handle response
})
p.then(null, error => {
  // handle error
})//.then(null,err)相当于.catch(err)

//Promise
new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (Math.random() > 0.5) {
      resolve('random success')
    } else {
      reject(new Error('random failure'))
    }
  }, 1000)
})
//promise响应后就会执行.then,若被拒绝，则执行.catch
Promise
  .resolve({ result: 123 })
  .then(data => console.log(data.result))
// <- 123
Promise
  .resolve(2)
  .then(x => x * 7)
  .then(x => x - 3)
  .then(x => console.log(x))
// <- 11
Promise
  .resolve(2)
  .then(x => new Promise(function (resolve) {
    setTimeout(() => resolve(x * 1000), x * 1000)
  }))
  .then(x => console.log(x))
// <- 2000
const p = fetch('/items')
  .then(res => { throw new Error('unexpectedly'); })
  .catch(error => console.error(error))
  //Error: unexpectedly

  //5.1.2 Promise Continuation and Chaining
//resolve can call reject to throw err
  new Promise((resolve, reject) => reject(new Error('oops')))
  .catch(err => console.error(err))//.catch捕捉错误
// resolve itself can throw err
new Promise((resolve, reject) => { throw new Error('oops'); })
  .catch(err => console.error(err))
//
Promise
  .resolve(2)
  .then(x => { throw new Error('failed'); })
  .catch(err => console.error(err))
//Error: failed
//上述过程分解如下：
const p1 = Promise.resolve(2)
const p2 = p1.then(x => { throw new Error('failed'); })
const p3 = p2.catch(err => console.error(err))
//Error: failed
const p1 = Promise.resolve(2)
const p2 = p1.then(x => { throw new Error('failed'); })
const p3 = p2.then(x => x * 2)
const p4 = p3.catch(err => console.error(err))
//Error: failed
const p1 = Promise.resolve(2)
const p2 = p1.then(x => { throw new Error('failed'); })
const p3 = p2.catch(err => console.error(err))
const p4 = p3.then(() => console.log('crisis averted'))
//Error: failed
//crisis averted
const p1 = Promise.resolve(2)
const p2 = p1.then(x => { throw new Error('failed'); })
const p3 = p2.catch(err => { throw new Error('oops', err); })
const p4 = p3.catch(err => console.error(err))
//Error: oops
fetch('/items')
  .then(res => res.a.prop.that.does.not.exist)
  .catch(err => console.error(err.message))
  .catch(err => console.error(err.message))
// <- 'Cannot read property "prop" of undefined'(只会报一次，因为第一个catch执行后没有错误产生)
const p = fetch('/items').then(res => res.a.prop.that.does.not.exist)
p.catch(err => console.error(err.message))
p.catch(err => console.error(err.message))
// <- 'Cannot read property "prop" of undefined'
// <- 'Cannot read property "prop" of undefined'
const p1 = fetch('/items')
const p2 = p1.then(res => res.a.prop.that.does.not.exist)
const p3 = p2.catch(err => {})
const p4 = p3.catch(err => console.error(err.message))
//不会抛出错误，因为p3捕捉了错误，有没有产生新的错误

//5.1.3 Creating a Promise From Scratch(从头开始创建一个Promise)
//使用new Promise()来新建一个Promise
new Promise(resolve => resolve('result'))
new Promise((resolve, reject) => reject(new Error('reason')))
//resolve 和 rejetion一样是 异步执行
new Promise(resolve => setTimeout(resolve, 2000))//2秒钟后建立一个promise
//可靠性：一旦promise变成resolved(fulfilled)或者rejected就不能改变
function resolveUnderThreeSeconds (delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay)
    setTimeout(reject, 3000)
  })
}
resolveUnderThreeSeconds(2000); // becomes fulfilled after 2s（不会再）
resolveUnderThreeSeconds(7000); // becomes rejected after 3s
//等价于简单的fetch('/items'),但只有resolve可以这样，reject不行，reject总是导致promise被拒绝
new Promise(resolve => resolve(fetch('/items')))
//可以事先设置promise的值
new Promise(resolve => resolve(12))
//在仅仅只需要设置promise值的时候，避免声明resolver函数，语法上更友好
Promise.resolve(12)
//通过then来创建一个promise
Promise
  .resolve({ then: resolve => resolve(12) })
  .then(x => console.log(x))// <- 12


//5.1.4 Promise States and Fates
//三个状态:pending, fulfilled, and rejected
//.then()返回promise
fetch('/items')
  .then(() => fetch('/item/first'))
  .then(() => console.log('done'))

fetch('/items')
  .then(res => res.json())
  .then(items => fetch(`/item/${ items[0].slug }`))
  .then(res => res.json())
  .then(item => console.log(item))
//.then返回 value
Promise
  .resolve([1, 2, 3])
  .then(values => values.map(value => value * 2))
  .then(values => console.log(values))
  // <- [2, 4, 6]


//------5.1.5 Leveraging Promise.all and Promise.race----
//-----实现并行的两个方法：Promise.all and Promise.race.-----

//Promise.all
//并行执行，分开打印
fetch('/products/chair')
  .then(r => r.json())
  .then(p => console.log(p))
fetch('/products/table')
  .then(r => r.json())
  .then(p => console.log(p))
//合并打印，当其中一个被拒绝，则p设置为拒绝原因
Promise
  .all([
    fetch('/products/chair'),
    fetch('/products/table')
  ])
  .then(products => console.log(products[0], products[1]))
//参数解构
  Promise
    .all([
      fetch('/products/chair'),
      fetch('/products/table')
    ])
    .then(([chair, table]) => console.log(chair, table))
//拒绝案例
const p1 = Promise.reject('failed')
const p2 = fetch('/products/chair')
const p3 = fetch('/products/table')
const p = Promise
  .all([p1, p2, p3])
  .catch(reason => console.log(reason))  // <- 'failed'

//Promise.race
Promise
  .race([
    new Promise(resolve => setTimeout(() => resolve(1), 1000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000))
  ])
  .then(result => console.log(result))
  // <- 1

  function timeout (delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject('timeout'), delay)
  })
}
Promise
  .race([
    fetch('/large-resource-download'),
    timeout(5000)
  ])
  .then(res => console.log(res))
  .catch(err => console.log(err))


//============================================================
//5.2 Iterator Protocol and Iterable Protocol(es6包括两种协议：迭代器和可迭代协议)

//5.2.1 Understanding Iteration Principles
//Symbol.iterator
const sequence = [...iterable]
//
const example = {}
example[Symbol.iterator] = fn
//
const example = {
  [Symbol.iterator]: fn
}
//next方法：包含两个属性 value(当前项)，done（序列末尾）
const sequence = {
  [Symbol.iterator]() {
    const items = ['i', 't', 'e', 'r', 'a', 'b', 'l', 'e']
    return {
      next: () => ({
        done: items.length === 0,
        value: items.shift()
      })
    }
  }
}
//for..of
for (let item of sequence) {
  console.log(item)
  // <- 'i'
  // <- 't'
  // <- 'e'
  // <- 'r'
  // <- 'a'
  // <- 'b'
  // <- 'l'
  // <- 'e'
}
//Array.from
console.log([...sequence])// <- ['i', 't', 'e', 'r', 'a', 'b', 'l', 'e']
console.log(Array.from(sequence))// <- ['i', 't', 'e', 'r', 'a', 'b', 'l', 'e']
console.log(Array.from({ 0: 'a', 1: 'b', 2: 'c', length: 3 }))// <- ['a', 'b', 'c']
//
for (let element of $('li')) {
  console.log(element)
  // <- a <li> in the jQuery collection
}

//5.2.2 Infinite Sequences(无穷序列)
const random = {
  [Symbol.iterator]: () => ({
    next: () => ({ value: Math.random() })
  })
}//没有done属性，无线序列，浏览器会崩溃
//但可如下使用
const random = {
  [Symbol.iterator]: () => ({
    next: () => ({ value: Math.random() })
  })
}
const [one, another] = random
console.log(one)// <- 0.23235511826351285（随机）
console.log(another)// <- 0.28749457537196577
//value大于0.8时停止
for (let value of random) {
  if (value > 0.8) {
    break
  }
  console.log(value)
}
//新方法获取序列的前指定项
function take (sequence, amount) {
  return {
    [Symbol.iterator]() {
      const iterator = sequence[Symbol.iterator]()
      return {
        next() {
          if (amount-- < 1) {
            return { done: true }
          }
          return iterator.next()
        }
      }
    }
  }
}
const s=[...take(random,3)]
console.log(s)//0.7651307189696908,0.8546704182435212,0.5671082545911172(随机)

//返回第一个不在范围内的值前面的所有值
function range (sequence, low=0, high=1) {
  return {
    [Symbol.iterator]() {
      const iterator = sequence[Symbol.iterator]()
      return {
        next() {
          const item = iterator.next()
          if (item.value < low || item.value > high) {
            return { done: true }
          }
          return item
        }
      }
    }
  }
}
//警告：迭代器没有办法识别序列是否是无穷序列

//5.2.3 Iterating Object Maps as Key-Value Pairs(遍历)
const colors = {
  green: '#0e0',
  orange: '#f50',
  pink: '#e07',
  [Symbol.iterator] () {
    const keys = Object.keys(colors)
    return {
      next () {
        const done = keys.length === 0
        const key = keys.shift()
        return {
          done,
          value: [key, colors[key]]
        }
      }
    }
  }
}
console.log([...colors])// <- [['green', '#0e0'], ['orange', '#f50'], ['pink', '#e07']]
//使可重用
function keyValueIterable (target) {
  target[Symbol.iterator] = function () {
    const keys = Object.keys(target)
    return {
      next () {
        const done = keys.length === 0
        const key = keys.shift()
        return {
          done,
          value: [key, target[key]]
        }
      }
    }
  }
  return target
}
const colors = keyValueIterable({
  green: '#0e0',
  orange: '#f50',
  pink: '#e07'
})
for (let [, color] of colors) {
  console.log(color)
  // <- '#0e0'
  // <- '#f50'
  // <- '#e07'
}

//5.2.4 Building Versatility Into Iterating a Playlist
const songs = [
  `Bad moon rising – Creedence`,
  `Don't stop me now – Queen`,
  `The Scientist – Coldplay`,
  `Somewhere only we know – Keane`
]

function playlist (songs, repeat) {
  return {
    [Symbol.iterator] () {
      let copy = []
      return {
        next () {
          if (copy.length === 0) {
            if (repeat < 1) {
              return { done: true }
            }
            copy = songs.slice()
            repeat--
          }
          return {
            value: copy.shift(), done: false
          }
        }
      }
    }
  }
}
console.log([...playlist(['a', 'b'], 3)])// <- ['a', 'b', 'a', 'b', 'a', 'b']

function player (sequence) {
  const g = sequence()
  more()
  function more () {
    const item = g.next()
    if (item.done) {
      return
    }
    playSong(item.value, more)
  }
}
const sequence = playlist(songs, Infinity)
player(sequence)
//随机播放or顺序播放
function playlist (songs, repeat, shuffle) {
  return {
    [Symbol.iterator] () {
      let copy = []
      return {
        next () {
          if (copy.length === 0) {
            if (repeat < 1) {
              return { done: true }
            }
            copy = songs.slice()
            repeat--
          }
          const value = shuffle ? randomSong() : nextSong()
          return { done: false, value }
        }
      }
      function randomSong () {
        const index = Math.floor(Math.random() * copy.length)
        return copy.splice(index, 1)[0]
      }
      function nextSong () {
        return copy.shift()
      }
    }
  }
}
console.log([...playlist(['a', 'b'], 3, true)])// <- ['a', 'b', 'b', 'a', 'a', 'b']


//====================================================
//5.3 Generator Functions and Generator Objects
//*用于标记Generator，yield增加一个value进序列
function* abc () {
  yield 'a'
  yield 'b'
  yield 'c'
}
const chars = abc()
typeof chars[Symbol.iterator] === 'function'
typeof chars.next === 'function'
chars[Symbol.iterator]() === chars
console.log(Array.from(chars))// <- ['a', 'b', 'c']
console.log([...chars])// <- ['a', 'b', 'c']

function* numbers () {
  yield 1
  console.log('a')
  yield 2
  console.log('b')
  yield 3
  console.log('c')
}
console.log([...numbers()])
// <- 'a'
// <- 'b'
// <- 'c'
// <- [1, 2, 3]
for (let number of numbers()) {
  console.log(number)
  // <- 1
  // <- 'a'
  // <- 2
  // <- 'b'
  // <- 3
  // <- 'c'
}
//yeild*
function* salute () {
  yield* 'hello'
}
console.log([...salute()])// <- ['h', 'e', 'l', 'l', 'o']

function* salute (name) {
  yield* 'hello '
  yield* name
}
console.log([...salute('you')])// <- ['h', 'e', 'l', 'l', 'o', ' ', 'y', 'o', 'u']

const salute = {
  [Symbol.iterator]() {
    const items = ['h', 'e', 'l', 'l', 'o']
    return {
      next: () => ({
        done: items.length === 0,
        value: items.shift()
      })
    }
  }
}
function* multiplied (base, multiplier) {
  yield base + 1 * multiplier
  yield base + 2 * multiplier
}
function* trailmix () {
  yield* salute
  yield 0
  yield* [1, 2]
  yield* [...multiplied(3, 2)]
  yield [...multiplied(6, 3)]
  yield* multiplied(15, 5)
}
console.log([...trailmix()])//['h', 'e', 'l', 'l', 'o', 0, 1, 2, 5, 7, [9, 12], 20, 25]

//5.3.2 Iterating over Generators by Hand
function* numbers () {
  yield 1
  console.log('a')
  yield 2
  console.log('b')
  yield 3
  console.log('c')
}
const g = numbers()
while (true) {
  let item = g.next()
  if (item.done) {
    break
  }
  console.log(item.value)
}//1,a,2,b,3,c

function* generator () {
  yield 'only'
}
const g = generator()
console.log(g.next())// <- { done: false, value: 'only' }
console.log(g.next())// <- { done: true }
console.log(g.next())// <- { done: true }


//5.3.3 Coding A Magic 8-ball Generator
const answers = [
  `It is certain`,
  `Yes definitely`,
  `Most likely`,
  `Yes`,
  `Ask again later`,
  `Better not tell you now`,
  `Cannot predict now`,
  `Don't count on it`,
  `My sources say no`,
  `Very doubtful`
]
function answer () {
  return answers[Math.floor(Math.random() * answers.length)]
}
function* ball () {
  while (true) {
    yield `[a] ${ answer() }`
  }
}
const g = ball()
g.next()// <- { value: '[a] Better not tell you now', done: false }
g.next()// <- { value: '[a] Most likely', done: false }

//*
function* ball () {
  let question
  while (true) {
    question = yield `[a] ${ answer() }`
    console.log(`[q] ${ question }`)
  }
}
const g = ball()
g.next()
console.log(g.next('Will JavaScript fall out of grace?').value)
// <- '[q] Will JavaScript fall out of grace?'
// <- '[a] My sources say no'
console.log(g.next('How do you know that?').value)
// <- '[q] How do you know that?'
// <- '[a] Concentrate and ask again'


//5.3.4 Consuming Generator Functions for Flexibility
ball(function* questions () {
  yield 'Will JavaScript fall out of grace?'
  yield 'How do you know that?'
})
// <- '[q] Will JavaScript fall out of grace?'
// <- '[a] Yes'
// <- '[q] How do you know that?'
// <- '[a] It is certain'

function ball (questions) {
  for (let question of questions()) {
    console.log(`[q] ${ question }`)
    console.log(`[a] ${ answer() }`)
  }
}
const g=ball(function* questions () {
  yield 'Will JavaScript fall out of grace?'
  yield 'How do you know that?'
})
console.log(g.next())
/*[q] Will JavaScript fall out of grace?
[a] Don't count on it
[q] How do you know that?
[a] Don't count on it*/

function* ball (questions) {
  for (let question of questions()) {
    yield [
      `[q] ${ question }`,
      `[a] ${ answer() }`
    ]
  }
}
function* questions () {
  yield 'Will JavaScript fall out of grace?'
  yield 'How do you know that?'
}
for (let [q,a] of ball(questions)) {
  console.log(q)
  console.log(a)
}
/*[q] Will JavaScript fall out of grace?
[a] It is certain
[q] How do you know that?
[a] Don't count on it
*/

//5.3.5 Dealing with asynchronous flows
function ball (questions) {
  const g = questions()
  ask()
  function ask () {
    const question = g.next()
    if (question.done) {
      return
    }
    fetch(`/ask?q=${ encodeURIComponent(question.value) }`)
      .then(response => response.text())
      .then(answer => {
        console.log(`[q] ${ question.value }`)
        console.log(`[a] ${ answer }`)
        ask()
      })
  }
}
ball(function* questions () {
  yield 'Will JavaScript fall out of grace?'
  yield 'How do you know that?'
})
//g.next(value)
function ball (questions) {
  const g = questions()
  let question = g.next()
  ask()
  function ask () {
    if (question.done) {
      return
    }
    fetch(`/ask?q=${ encodeURIComponent(question.value) }`)
      .then(response => response.text())
      .then(answer => question = g.next(answer))
      .then(ask)
  }
}
ball(function* questions () {
  console.log(`[a-1] ${ yield 'Will JavaScript fall out of grace?' }`)
  console.log(`[a-2] ${ yield 'How do you know that?' }`)
})


//5.3.6 Throwing Errors at a Generator

//response.text()发生错误则抛出错误
fetch(`/ask?q=${ encodeURIComponent(question.value) }`)
  .then(response => response.text())
  .then(answer => question = g.next(answer), reason => g.throw(reason))
  .then(ask)

  ball(function* questions () {
    try {
      console.log(`[a-1] ${ yield 'Will JavaScript fall out of grace?' }`)
    } catch (e) {
      console.error('[a-1] Oops!', e)
    }
    try {
      console.log(`[a-2] ${ yield 'How do you know that?' }`)
    } catch (e) {
      console.error('[a-2] Oops!', e)
    }
  })

//5.3.7 Returning on Behalf of a Generator
//.return()终止序列迭代
function* numbers () {
  yield 1
  yield 2
  yield 3
}
const g = numbers()
console.log(g.next())// <- { done: false, value: 1 }
console.log(g.return())// <- { done: true }
console.log(g.next())// <- { done: true }
//try/finally将会避免立即终止迭代
function* numbers () {
  try {
    yield 1
  } finally {
    yield 2
    yield 3
  }
  yield 4
  yield 5
}
const g = numbers()
console.log(g.next())// <- { done: false, value: 1 }
console.log(g.return(-1))// <- { done: false, value: 2 }
console.log(g.next())// <- { done: false, value: 3 }
console.log(g.next())// <- { done: true, value: -1 }
console.log(g.next())// <- { done: true, value：undefined }
//return num 及之后的yeild:不能通过array.from或for..of访问.只能通过.next访问
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}
console.log([...numbers()])// <- [1, 2]
console.log(Array.from(numbers()))// <- [1, 2]
for (let number of numbers()) {
  console.log(number)  // <- 1  // <- 2
}

const g = numbers()
console.log(g.next())// <- { done: false, value: 1 }
console.log(g.next())// <- { done: false, value: 2 }
console.log(g.next())// <- { done: true, value: 3 }
console.log(g.next())// <- { done: true }


//5.3.8 Asynchronous I/O Using Generators
saveProducts(function* () {
  yield '/products/javascript-application-design'
  yield '/products/modular-es6'
  return '/wishlists/books'
})
//
saveProducts(function* () {
  const p1 = yield '/products/javascript-application-design'
  const p2 = yield '/products/modular-es6'
  return '/wishlists/books'
}).then(response => {
  // continue after storing the product list
})
//
saveProducts(function* () {
  yield '/products/javascript-application-design'
  yield '/products/modular-es6'
  if (addToCart) {
    return '/cart'
  }
  return '/wishlists/books'
})
//合并fetch和API
function saveProducts (productList) {
  const g = productList()
  const item = g.next()
  fetch(item.value)
    .then(res => res.json())
    .then(product => {})
}
//
function saveProducts (productList) {
  const g = productList()
  more(g.next())
  function more (item) {
    if (item.done) {
      return
    }
    fetch(item.value)
      .then(res => res.json())
      .then(product => {
        more(g.next(product))
      })
  }
}
//
function saveProducts (productList) {
  const products = []
  const g = productList()
  more(g.next())
  function more (item) {
    if (item.done) {
      save(item.value)
    } else {
      details(item.value)
    }
  }
  function details (endpoint) {
    fetch(endpoint)
      .then(res => res.json())
      .then(product => {
        products.push(product)
        more(g.next(product))
      })
  }
  function save (endpoint) {
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ products })
    })
  }
}
//s
function saveProducts (productList) {
  const products = []
  const g = productList()
  return more(g.next())
  function more (item) {
    if (item.done) {
      return save(item.value)
    }
    return details(item.value)
  }
  function details (endpoint) {
    return fetch(endpoint)
      .then(res => res.json())
      .then(product => {
        products.push(product)
        return more(g.next(product))
      })
  }
  function save (endpoint) {
    return fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ products })
      })
      .then(res => res.json())
  }
}

//==========================================
//===========5.4 Async Functions============

//5.4.1 Flavors of Async Code
function getRandomArticle () {
  return fetch('/articles/random', {
    headers: new Headers({
      Accept: 'application/json'
    })
  })
  .then(res => res.json())
}
//链式响应很难捕捉到错误，
getRandomArticle()
  .then(model => renderView(model))
  .then(html => setPageContents(html))
  .then(() => console.log('Successfully changed page!'))
  .catch(reason => console.error(reason));
//回调函数 代码重复，难以阅读
getRandomArticle((err, model) => {
  if (err) {
    return console.error(reason)
  }
  renderView(model, (err, html) => {
    if (err) {
      return console.error(reason)
    }
    setPageContents(html, err => {
      if (err) {
        return console.error(reason)
      }
      console.log('Successfully changed page!')
    })
  })
})
//异步函数，利用.waterfall()方法，(较好的选择)
async.waterfall([
  getRandomArticle,
  renderView,
  setPageContents
], (err, html) => {
  if (err) {
    return console.error(reason)
  }
  console.log('Successfully changed page!')
})
//-----
function getRandomArticle (gen) {
  const g = gen();
  fetch('/articles/random', {
    headers: new Headers({
      Accept: 'application/json'
    })
  })
  .then(res => res.json())
  .then(json => g.next(json))
  .catch(error => g.throw(error))
}
//使用generators重写getRandomArticle
getRandomArticle(function* printRandomArticle () {
  const json = yield;
  // render view
});
//通过yeild获取json
getRandomArticle(function* printRandomArticle () {
  const json = yield;
  // render view
});

//5.4.2 Using async / await
getRandomArticle()
  .then(model => renderView(model))
  .then(html => setPageContents(html))
  .then(() => console.log('Successfully changed page!'))
  .catch(reason => console.error(reason));
async function read () {
  try {
    const model = await getRandomArticle()
    const html = await renderView(model)
    await setPageContents(html)
    console.log('Successfully changed page!')
  } catch (err) {
    console.error(err)
  }
}
read()
//combined:异常时抛出错误，否则返回响应value
async function read () {
  const model = await getRandomArticle()
  const html = await renderView(model)
  await setPageContents(html)
  return 'Successfully changed page!'
}

read()
  .then(message => console.log(message))
  .catch(err => console.error(err))
//增加read函数的重用性
async function read () {
  const model = await getRandomArticle()
  const html = await renderView(model)
  return html
}
read().then(html => console.log(html))//打印html
//写 功能
async function write () {
  const html = await read()
  console.log(html)
}

//5.4.3 Concurrent Async Flows
async function concurrent () {
  const p1 = new Promise(resolve => setTimeout(resolve, 500, 'fast'))
  const p2 = new Promise(resolve => setTimeout(resolve, 200, 'faster'))
  const p3 = new Promise(resolve => setTimeout(resolve, 100, 'fastest'))
  const r1 = await p1 // execution is blocked until p1 settles
  const r2 = await p2
  const r3 = await p3
}
//promise.all()同步执行异步流
async function concurrent () {
  const p1 = new Promise(resolve => setTimeout(resolve, 500, 'fast'))
  const p2 = new Promise(resolve => setTimeout(resolve, 200, 'faster'))
  const p3 = new Promise(resolve => setTimeout(resolve, 100, 'fastest'))
  const [r1, r2, r3] = await Promise.all([p1, p2, p3])
  console.log(r1, r2, r3)
  // 'fast', 'faster', 'fastest'
}
//Promise.race更快
async function race () {
  const p1 = new Promise(resolve => setTimeout(resolve, 500, 'fast'))
  const p2 = new Promise(resolve => setTimeout(resolve, 200, 'faster'))
  const p3 = new Promise(resolve => setTimeout(resolve, 100, 'fastest'))
  const result = await Promise.race([p1, p2, p3])
  console.log(result)  // 'fastest'
}


//5.4.4 Error Handling
read()
  .then(html => console.log(html))
  .catch(err => console.error(err))

//5.4.6 Understanding Async Function Internals
//首先假设如下异步函数
async function example (a, b, c) {
  // example function body
}
//转换成简单的函数声明，返回generator函数的结果
function example (a, b, c) {
  return spawn(function* () {
    // example function body
  })
}
function spawn (generator) {
  // wrap everything in a promise
  return new Promise((resolve, reject) => {
    const g = generator()

    // run the first step
    step(() => g.next())

    function step (nextFn) {
      const next = runNext(nextFn)
      if (next.done) {
        // finished with success, resolve the promise
        resolve(next.value)
        return
      }
      // not finished, chain off the yielded promise and run next step
      Promise
        .resolve(next.value)
        .then(
          value => step(() => g.next(value)),
          err => step(() => g.throw(err))
        )
    }

    function runNext (nextFn) {
      try {
        // resume the generator
        return nextFn()
      } catch (err) {
        // finished with failure, reject the promise
        reject(err)
      }
    }
  })
}

//-----------
async function exercise () {
  const r1 = await new Promise(resolve => setTimeout(resolve, 500, 'slowest'))
  const r2 = await new Promise(resolve => setTimeout(resolve, 200, 'slow'))
  return [r1, r2]
}

exercise().then(result => console.log(result))// <- ['slowest', 'slow']

//first:return spawn
function exercise () {
  return spawn(function* () {
    const r1 = yield new Promise(resolve => setTimeout(resolve, 500, 'slowest'))
    const r2 = yield new Promise(resolve => setTimeout(resolve, 200, 'slow'))
    return [r1, r2]
  })
}

exercise().then(result => console.log(result))
//then
function spawn (generator) {
  // wrap everything in a promise
  return new Promise((resolve, reject) => {
    const g = generator()

    // run the first step
    step(() => g.next())
    // ...
  })
}
function step (nextFn) {
  const next = runNext(nextFn)
  if (next.done) {
    // finished with success, resolve the promise
    resolve(next.value)
    return
  }
  // not finished, chain off the yielded promise and run next step
  Promise
    .resolve(next.value)
    .then(
      value => step(() => g.next(value)),
      err => step(() => g.throw(err))
    )
}

function runNext (nextFn) {
  try {
    // resume the generator
    return nextFn()
  } catch (err) {
    // finished with failure, reject the promise
    reject(err)
  }
}

//=========================================
//========5.5 Asynchronous Iteration=======
//Symbol.asyncIterator
const sequence = {
  [Symbol.asyncIterator]() {
    const items = ['i', 't', 'e', 'r', 'a', 'b', 'l', 'e']
    return {
      next: () => Promise.resolve({
        done: items.length === 0,
        value: items.shift()
      })
    }
  }
}
//无穷序列
const interval = duration => ({
  [Symbol.asyncIterator]: () => ({
    i: 0,
    next () {
      return new Promise(resolve =>
        setTimeout(() => resolve({
          value: this.i++,
          done: false
        }), duration)
      )
    }
  })
})
//for await..of
async function print () {
  for await (const i of interval(1000)) {
    console.log(`${i} seconds ellapsed.`)
  }
}
print()

//5.5.2 Async Generators
async function* fetchInterval(duration, ...params) {
  for await (const i of interval(duration)) {
    yield await fetch(...params)
  }
}
//
async function process () {
  for await (const response of fetchInterval(1000, '/api/status')) {
    const data = await response.json()
    // use updated data
  }
}
process()



//===========================================================
//========Chapter 6:Leveraging ECMAScript Collections========
//===========================================================

//turn a object to hash-map，这种方法的缺陷：Keys限制在字符串类型；迭代冗长（Object.keys(registry).forEach）；安全问题
const registry = {}
function add (name, meta) {
  registry[name] = meta
}
function get (name) {
  return registry[name]
}
add('contra', { description: 'Asynchronous flow control' })
add('dragula', { description: 'Drag and drop' })
add('woofmark', { description: 'Markdown and WYSIWYG editor' })
//解决安全问题：添加前缀 or .Object.create(null)
const registry = {}
function add (name, meta) {
  registry['pkg:' + name] = meta
}
function get (name) {
  return registry['pkg:' + name]
}
//
const registry = Object.create(null)
function add (name, meta) {
  registry[name] = meta
}
function get (name) {
  return registry[name]
}
//迭代问题
const registry = Object.create(null)
function list () {
  return Object.keys(registry).map(key => [key, registry[key]])
}

const registry = Object.create(null)
registry[Symbol.iterator] = () => {
  const keys = Object.keys(registry)
  return {
    next () {
      const done = keys.length === 0
      const key = keys.shift()
      const value = [key, registry[key]]
      return { done, value }
    }
  }
}
console.log([...registry])

//====================
//6.1 Using ES6 Maps
//6.1.1 First Look into ES6 Maps
//map.set()
const map = new Map()
map.set('contra', { description: 'Asynchronous flow control' })
map.set('dragula', { description: 'Drag and drop' })
map.set('woofmark', { description: 'Markdown and WYSIWYG editor' })
console.log([...map])
map.has('contra')// <- true
map.has('jquery')// <- false
//-----map.has()
const map = new Map([[1, 'a'],[2,'r']])
map.has(1)// <- true
map.has(2)// <- true
map.has('1')// <- false
map.has('a')// <- false
//--------map.get()
map.get('contra')// <- { description: 'Asynchronous flow control' }
//-----map.delete()
map.delete('contra')
map.get('contra')// <- undefined
//---new Map()
const map = new Map([[1, 2], [3, 4], [5, 6]])
map.has(1)// <- true
map.clear()
map.has(1)// <- false
[...map]// <- []
//-------.size
const map = new Map([[1, 2], [3, 4], [5, 6]])
map.size// <- 3
map.delete(3)
map.size// <- 2
map.clear()
map.size// <- 0
//====使用任意对象
const map = new Map()
map.set(new Date(), function today () {})
map.set(() => 'key', { key: 'door' })
map.set(Symbol('items'), [1, 2])
//---Symbol对象
const map = new Map()
const key = Symbol('items')
map.set(key, [1, 2])
map.get(Symbol('items')); // <- undefined // not the same reference as "key"
map.get(key)// <- [1, 2]
//---for...of 遍历
const items = [
  [new Date(), function today () {}],
  [() => 'key', { key: 'door' }],
  [Symbol('items'), [1, 2]]
]
const map = new Map()
for (let [key, value] of items) {
  map.set(key, value)
}
//====初始化
const items = [
  [new Date(), function today () {}],
  [() => 'key', { key: 'door' }],
  [Symbol('items'), [1, 2]]
]
const map = new Map(items)
//产生一个副本
const copy = new Map(map)
// consume
const map = new Map()
map.set(1, 'one')
map.set(2, 'two')
map.set(3, 'three')
console.log([...map])// <- [[1, 'one'], [2, 'two'], [3, 'three']]
//总结几个es6新功能
const map = new Map()
map.set(1, 'one')
map.set(2, 'two')
map.set(3, 'three')
for (let [key, value] of map) {
  console.log(`${ key }: ${ value }`)
  // <- '1: one'
  // <- '2: two'
  // <- '3: three'
}
//key唯一,重复赋值只会重写
const map = new Map()
map.set('a', 1)
map.set('a', 2)
map.set('a', 3)
console.log([...map])// <- [['a', 3]]
//在map中，NaN相等
console.log(NaN === NaN)// <- false
const map = new Map()
map.set(NaN, 'a')
map.set(NaN, 'b')
console.log([...map])// <- [[NaN, 'b']]
//map.entries()返回key/value迭代器
map[Symbol.iterator] === map.entries// <- true
//.keys(),.values()
const map = new Map([[1, 2], [3, 4], [5, 6]])
[...map.keys()]// <- [1, 3, 5]
[...map.values()]// <- [2, 4, 6]
[...map.entries()]// <- [[1, 2], [3, 4], [5, 6]]
//map.forEach()
const map = new Map([[NaN, 1], [Symbol(), 2], ['key', 'value']])
map.forEach((value, key) => console.log(key, value))
// <- NaN 1
// <- Symbol() 2
// <- 'key' 'value'

//6.1.2 Hash-Maps and the DOM
//联系DOM元素与API对象 by ES5（十分冗长）
const map = []
function customThing (el) {
  const mapped = findByElement(el)
  if (mapped) {
    return mapped
  }
  const api = {
    // custom thing api methods
  }
  const entry = storeInMap(el, api)
  api.destroy = destroy.bind(null, entry)
  return api
}
function storeInMap (el, api) {
  const entry = { el: el, api: api }
  map.push(entry)
  return entry
}
function findByElement (el) {
  for (const i = 0; i < map.length; i++) {
    if (map[i].el === el) {
      return map[i].api
    }
  }
}
function destroy (entry) {
  const i = map.indexOf(entry)
  map.splice(i, 1)
}
//结合Map，DOM to API
const map = new Map()
function customThing (el) {
  const mapped = findByElement(el)
  if (mapped) {
    return mapped
  }
  const api = {
    // custom thing api methods
    destroy: destroy.bind(null, el)
  }
  storeInMap(el, api)
  return api
}
function storeInMap (el, api) {
  map.set(el, api)
}
function findByElement (el) {
  return map.get(el)
}
function destroy (el) {
  map.delete(el)
}
//再简化
const map = new Map()
function customThing (el) {
  const mapped = map.get(el)
  if (mapped) {
    return mapped
  }
  const api = {
    // custom thing api methods
    destroy: () => map.delete(el)
  }
  map.set(el, api)
  return api
}


//==================================
//6.2 Understanding and Using WeakMap
//WeakMap可看做Map的子集 具有许多限制：不可迭代；没有entries、keys、values、forEach、clear等方法，其key必须是Object(Symbol是value类型的，不被允许使用)
const map = new WeakMap()
map.set(Date.now, 'now')
map.set(1, 1)// <- TypeError
map.set(Symbol(), 2)// <- TypeError
//仍可初始化
const map = new WeakMap([
  [new Date(), 'foo'],
  [() => 'bar', 'baz']
])
//仍有has、get、delete方法
const date = new Date()
const map = new WeakMap([[date, 'foo'], [() => 'bar', 'baz']])
map.has(date)// <- true
map.get(date)// <- 'foo'
map.delete(date)
map.has(date)// <- false

//6.2.1 Is WeakMap Strictly Worse Than Map?

/*Map 的一个最大弊端就是它会导致作为key的对象增加一个引用，
因此导致GA无法回收这个对象，如果大量使用object作为Map的key会导致大量的内存泄露。
WeakMap就是为了解决这个问题，在WeakMap中对作为key的对象是一个弱引用，
也就是说，GA在计算对象引用数量的时候并不会把弱引用计算进去。
这样当一个对象除了WeakMap没有其他引用的时候就会被GA回收掉。*/


//===========================================
//==============6.3 Sets in ES6==============
//有.keys, .values, .entries, .forEach, .has, .delete, and .clear
//增加元素 .add
const set = new Set()
set.add({ an: 'example' })
//set可迭代，不一定成对，类似数组
const set = new Set(['a', 'b', 'c'])
console.log([...set])// <- ['a', 'b', 'c']
//set中的元素是唯一的
const set = new Set(['a', 'b', 'b', 'c', 'c'])
console.log([...set])// <- ['a', 'b', 'c']
//div已经包含在set中，再次添加不会改变size的值（set 元素的唯一性）
function divs () {
  return [...document.querySelectorAll('div')]
}
const set = new Set(divs())
console.log(set.size)// <- 56
divs().forEach(div => set.add(div))
console.log(set.size)// <- 56


//=============================
//=====6.4 ES6 WeakSets========
//类似于weakmap，weakset也是不可has 代，每个值必须是唯一的object引用，若唯一值引用，则垃圾回收
//只有.add, .delete .has 没有get(因为set是一维的)
const set = new WeakSet()
set.add('a')// <- TypeError
set.add(Symbol())// <- TypeError（因为不是Object数据类型）
//认可使用迭代器初始化
const set = new WeakSet([
  new Date(),
  {},
  () => {},
  [1]
])
//car example
const cars = new WeakSet()
class Car {
  constructor() {
    cars.add(this)
  }
  fuelUp () {
    if (!cars.has(this)) {
      throw new TypeError('Car#fuelUp called on incompatible object!')
    }
  }
}

//总结
//使用集合来扩展使用元数据：考虑 weak
//只挂心是否存在，用 Set
//考虑创建缓存，用 Map



//===========================================================
//===========================================================
//======Chapter 7:Managing Property Access with Proxies======
//===========================================================
//代理作为API和Object之间的中介,底层目标的看门人，可以允许某些操作通过，也可以阻止

//===========================================================
//===========7.1 Getting Started with Proxy==================

//proxy.exposed
const target = {}
const handler = {}
const proxy = new Proxy(target, handler)
proxy.exposed = true
console.log(target.exposed)// <- true
console.log(proxy.somethingElse)// <- undefined

//====7.1.1 Trapping get accessors======
const handler = {
  get (target, key) {
    console.log(`Get on property "${ key }"`)
    return target[key]
  }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy.numbers = 123
console.log(proxy.numbers)
// 'Get on property "numbers"'
// <- 123
console.log(proxy['something-else'])
// 'Get on property "something-else"'
// <- undefined

//reflect:it is useful 当 代理陷阱提供一些默认行为
const handler = {
  get (target, key) {
    console.log(`Get on property "${ key }"`)
    return Reflect.get(target, key)
  }
}
const target = {}
const proxy = new Proxy(target, handler)

//例：设置以下划线开头的属性不可访问
const handler = {
  get (target, key) {
    const [prefix] = key//key='_secret',premix='_'
    if (prefix === '_') {
      throw new Error(`Property "${ key }" cannot be read through this proxy.`)
    }
    return Reflect.get(target, key)
  }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy._secret// <- Uncaught Error: Property "_secret" cannot be read through this proxy.

//7.1.2 Trapping set accessors(set用于拦截属性赋值)
const handler = {
  get (target, key) {
    invariant(key, 'get')
    return Reflect.get(target, key)
  },
  set (target, key, value) {
    invariant(key, 'set')
    return Reflect.set(target, key, value)
  }
}
function invariant (key, action) {
  if (key.startsWith('_')) {
    throw new Error(`Invalid attempt to ${ action } private "${ key }" property`)
  }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy.text = 'the great black pony ate your lunch'
console.log(target.text)
// <- 'the great black pony ate your lunch'
proxy._secret
// <- Error: Invalid attempt to get private "_secret" property
proxy._secret = 'invalidate'
// <- Error: Invalid attempt to set private "_secret" property

//打包代理为函数
function proxied () {
  const target = {}
  const handler = {
    get (target, key) {
      invariant(key, 'get')
      return Reflect.get(target, key)
    },
    set (target, key, value) {
      invariant(key, 'set')
      return Reflect.set(target, key, value)
    }
  }
  return new Proxy(target, handler)
}
function invariant (key, action) {
  if (key.startsWith('_')) {
    throw new Error(`Invalid attempt to ${ action } private "${ key }" property`)
  }
}

// expose proxy to consumers
function concealWithPrefix (original, prefix='_') {
  const handler = {
    get (original, key) {
      invariant(key, 'get')
      return Reflect.get(original, key)
    },
    set (original, key, value) {
      invariant(key, 'set')
      return Reflect.set(original, key, value)
    }
  }
  return new Proxy(original, handler)
}
function invariant (key, action) {
  if (key.startsWith(prefix)) {
    throw new Error(`Invalid attempt to ${ action } private "${ key }" property`)
  }
}
const target = {
  _secret: 'secret',
  text: 'everyone-can-read-this'
}
const proxy = concealWithPrefix(target)

//7.1.3 Schema Validation with Proxies(模式验证)
const validations = new Map()
const validator = {
  set (target, key, value) {
    if (validations.has(key)) {
      return validations[key](value)
    }
    return true
  }
}
validations.set('age', validateAge)

function validateAge (value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError('Age must be a number')
  }
  if (value <= 0) {
    throw new TypeError('Age must be a positive number')
  }
  return true
}
const person = {}
const proxy = new Proxy(person, validator)
proxy.age = 'twenty three'// <- TypeError: Age must be a number
proxy.age = NaN// <- TypeError: Age must be a number
proxy.age = 0// <- TypeError: Age must be a positive number
proxy.age = 28
console.log(person.age)// <- 28


//=======================================
//===7.2 Revocable Proxies(可撤销的代理)
//关键字没变，但要返回{ proxy, revoke }，revoke被调用则抛出错误
const target = {}
const handler = {}
const { proxy, revoke } = Proxy.revocable(target, handler)
proxy.isUsable = true
proxy.as = 'csa'
console.log(proxy.isUsable)// <- true
console.log(proxy.as)// <- csa
revoke()
console.log(proxy.as)// <- TypeError: illegal operation attempted on a revoked proxy
//代理一旦撤销就不可恢复
const proxies = new WeakMap()
const storage = {}

function getStorage () {
  const handler = {}
  const { proxy, revoke } = Proxy.revocable(storage, handler)
  proxies.set(proxy, { revoke })
  return proxy
}

function revokeStorage (proxy) {
  proxies.get(proxy).revoke()
  proxies.delete(proxy)
}


//===========================================
//=======7.3 Proxy Trap Handlers(代理陷阱处理程序)========
//介绍其他几种拦截用户操作（之前介绍了get set）

//7.3.1 has Trap(针对 in 操作)
const handler = {
  get (target, key) {
    invariant(key, 'get')
    return Reflect.get(target, key)
  },
  set (target, key, value) {
    invariant(key, 'set')
    return Reflect.set(target, key, value)
  },
  has (target, key) {
    if (key.startsWith('_')) {
      return false
    }
    return Reflect.has(target, key)
  }
}
function invariant (key, action) {
  if (key.startsWith('_')) {
    throw new Error(`Invalid attempt to ${ action } private "${ key }" property`)
  }
}
const target = {
  _secret: 'securely-stored-value',
  wellKnown: 'publicly-known-value'
}
const proxy = new Proxy(target, handler)
console.log('wellKnown' in proxy)// <- true
console.log('_secret' in proxy)// <- false
console.log('_secret' in target)// <- true

//7.3.2 deleteProperty Trap
const cat = { furBall: true }
cat.furBall = undefined
console.log('furBall' in cat)// <- true
delete cat.furBall
console.log('furBall' in cat)// <- false
//
const target = { _secret: 'foo' }
const proxy = new Proxy(target, handler)
console.log('_secret' in proxy)// <- false
console.log('_secret' in target)// <- true
delete proxy._secret
console.log('_secret' in target)// <- false
console.log('_secret' in proxy)// <- false
//拦截删除操作：handler.deleteProperty
const handler = {
  get (target, key) {
    invariant(key, 'get')
    return Reflect.get(target, key)
  },
  set (target, key, value) {
    invariant(key, 'set')
    return Reflect.set(target, key, value)
  },
  deleteProperty (target, key) {
    invariant(key, 'delete')
    return Reflect.deleteProperty(target, key)
  }
}
function invariant (key, action) {
  if (key.startsWith('_')) {
    throw new Error(`Invalid attempt to ${ action } private "${ key }" property`)
  }
}
const target = { _secret: 'foo' }
const proxy = new Proxy(target, handler)
console.log('_secret' in proxy)// <- true
delete proxy._secret// <- Error: Invalid attempt to delete private "_secret" property

//7.3.3 defineProperty Trap
//Object.defineProperty(target, key, descriptor)(添加新的属性)（该方法添加的属性是只读的，不可删除的，而手动添加的属性是读写的，可删除的）
/*deicrioter设置：
configurable = false：属性描述符不可改变，属性不可删除
enumerable = false：隐藏于 for in，Object.keys
writable = false:只读
value = undefined：属性的初始值
get = undefined：
set = undefined
*/
const pizza = {}
pizza.topping = 'ham'
Object.defineProperty(pizza, 'extraCheese', { value: true })
console.log(Object.getOwnPropertyDescriptor(pizza, 'topping'))// <- { value: 'ham', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor(pizza, 'extraCheese'))// <- { value: true, writable: false, enumerable: false, configurable: false }

//拦截新增属性
const handler = {
  defineProperty (target, key, descriptor) {
    return false
  }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy.extraCheese = false// <- TypeError: 'defineProperty' on proxy: trap returned false for property 'extraCheese'
//拦截下划线开头的属性创建
const handler = {
  defineProperty (target, key, descriptor) {
    invariant(key, 'define')
    return Reflect.defineProperty(target, key, descriptor)
  }
}
function invariant (key, action) {
  if (key.startsWith('_')) {
    throw new Error(`Invalid attempt to ${ action } private "${ key }" property`)
  }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy.topping = 'cheese'
proxy._secretIngredient = 'salsa'// <- Error: Invalid attempt to define private "_secretIngredient" property

//7.3.4 ownKeys Trap
//handler.ownKeys返回所以属性
const handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target)
  }
}
const target = {
  [Symbol('id')]: 'ba3dfcc0',
  _secret: 'sauce',
  _toppingCount: 3,
  toppings: ['cheese', 'tomato', 'bacon']
}
const proxy = new Proxy(target, handler)
for (let key of Object.keys(proxy)) {
  console.log(key)
  // <- '_secret'
  // <- '_toppingCount'
  // <- 'toppings'
}
/*Reflect.ownKeys() return every own key on the object
Object.getOwnPropertyNames() returns only non-symbol properties
Object.getOwnPropertySymbols() returns only symbol properties
Object.keys() returns only non-symbol enumerable properties
for..in returns only non-symbol enumerable properties*/

//属性中非字符串的总是返回true，过滤掉字符串中以下划线开头的属性
const handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => {
      const isStringKey = typeof key === 'string'
      if (isStringKey) {
        return !key.startsWith('_')
      }
      return true
    })
  }
}
const target = {
  [Symbol('id')]: 'ba3dfcc0',
  _secret: 'sauce',
  _toppingCount: 3,
  toppings: ['cheese', 'tomato', 'bacon']
}
const proxy = new Proxy(target, handler)
for (let key of Object.keys(proxy)) {
  console.log(key)  // <- 'toppings'（Object。keys过滤掉了Symbol属性关键字）
}
for (let key of Object.getOwnPropertySymbols(proxy)) {
  console.log(key)  // <- Symbol(id)
}


//================================================
//=======7.4 Advanced Proxy Traps==============

//7.4.1 getOwnPropertyDescriptor Trap(查询一些关键属性描述符时触发)
const handler = {
  getOwnPropertyDescriptor (target, key) {
    invariant(key, 'get property descriptor for')
    return Reflect.getOwnPropertyDescriptor(target, key)
  }
}
function invariant (key, action) {
  if (key.startsWith('_')) {
    throw new Error(`Invalid attempt to ${ action } private "${ key }" property`)
  }
}
const target = {}
const proxy = new Proxy(target, handler)
Reflect.getOwnPropertyDescriptor(proxy, '_secret')
// <- Error: Invalid attempt to get property descriptor for private "_secret" property

//返回undefined一遍更好的隐藏某些属性
const handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key.startsWith('_')) {
      return
    }
    return Reflect.getOwnPropertyDescriptor(target, key)
  }
}
const target = {
  _secret: 'sauce',
  topping: 'mozzarella'
}
const proxy = new Proxy(target, handler)
console.log(Object.getOwnPropertyDescriptor(proxy, 'dressing'))// <- undefined
console.log(Object.getOwnPropertyDescriptor(proxy, '_secret'))// <- undefined
console.log(Object.getOwnPropertyDescriptor(proxy, 'topping'))// <- { value: 'mozzarella', writable: true, enumerable: true, configurable: true }


//7.4.2 apply Trap(target函数被调用时触发)
proxy('cats', 'dogs')
proxy(...['cats', 'dogs'])
proxy.call(null, 'cats', 'dogs')
proxy.apply(null, ['cats', 'dogs'])
Reflect.apply(proxy, null, ['cat', 'dogs'])
//apply有三个参数：target,ctx,args,such as
const handler = {
  apply (target, ctx, args) {
    return Reflect.apply(target, ctx, args)
  }
}
//
const twice = {
  apply (target, ctx, args) {
    return Reflect.apply(target, ctx, args) * 2
  }
}
function sum (a, b) {
  return a + b
}
const proxy = new Proxy(sum, twice)
console.log(proxy(1, 2))// <- 6

//另一个实例logger：确保logger始终返回自己，使用bind
logger.test = logger.test.bind(logger)
//使用get解决上述问题
const selfish = {
  get (target, key) {
    const value = Reflect.get(target, key)
    if (typeof value !== 'function') {
      return value
    }
    return value.bind(target)
  }
}
const proxy = new Proxy(logger, selfish)
const something = {}
console.log(logger.test() === logger)// <- true
console.log(logger.test.call(something) === something)// <- true
console.log(proxy.test() === logger)// <- true
console.log(proxy.test.call(something) === logger)// <- true
//每当我们通过代理获取一个方法的引用时，我们得到了一个新创建的绑定函数，使得本身与本身不相等
console.log(proxy.test !== proxy.test)// <- true
//上述问题用 WeakMap 解决
function selfish (target) {
  const cache = new WeakMap()
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key)
      if (typeof value !== 'function') {
        return value
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target))
      }
      return cache.get(value)
    }
  }
  const proxy = new Proxy(target, handler)
  return proxy
}
const selfishLogger = selfish(logger)
console.log(selfishLogger.test === selfishLogger.test)// <- true
console.log(selfishLogger.test() === selfishLogger)// <- true
console.log(selfishLogger.test.call(something) === selfishLogger)// <- true

//7.4.3 construct Trap
const handler = {
  construct (Target, args) {
    return new Target(...args)
  }
}
//另一种写法，实质同上
const handler = {
  construct (Target, args) {
    return Reflect.construct(Target, args)
  }
}
//实例：
const handler = {
  construct (Target, args) {
    const [ name ] = args
    const target = Reflect.construct(Target, args)
    target.name = name
    return target
  }
}
class Target {
  hello () {
    console.log(`Hello, ${ this.name }!`)
  }
}
const target = new Target()
target.name = `Nicolás`
target.hello()// <- 'Hello, Nicolás'

const ProxiedTarget = new Proxy(Target, handler)
const proxy = new ProxiedTarget(`Nicolás`)
proxy.hello()// <- 'Hello, Nicolás'

//7.4.4 getPrototypeOf Trap
//我们可以用handler.getprototypeof方法作为以下所有操作的陷阱
/*Object.prototype.proto property
Object.prototype.isPrototypeOf method
Object.getPrototypeOf method
Reflect.getPrototypeOf method
instanceof operator*/

//将代理Object原型设为数组
const handler = {
  getPrototypeOf: target => Array.prototype
}
const target = {}
const proxy = new Proxy(target, handler)
console.log(proxy instanceof Array)// <- true
//只声明原型为数组是不够的，
console.log(proxy.push)// <- undefined
//修改使具有数组的方法
const handler = {
  getPrototypeOf: target => Array.prototype,
  get (target, key) {
    return (
      Reflect.get(target, key) ||
      Reflect.get(Array.prototype, key)
    )
  }
}
const target = {}
const proxy = new Proxy(target, handler)
console.log(proxy.push)// <- function push () { [native code] }
proxy.push('first', 'second')
console.log(proxy)// <- { 0: 'first', 1: 'second', length: 2 }
proxy.pop()
console.log(proxy)// <- { 0: 'first', length: 1 }

//7.4.5 setPrototypeOf Trap
const handler = {
  setPrototypeOf (target, proto) {
    Object.setPrototypeOf(target, proto)//等价于Reflect.setPrototypeOf
  }
}
const base = {}
function Target () {}
const proxy = new Proxy(Target, handler)
proxy.setPrototypeOf(proxy, base)
console.log(proxy.prototype === base)// <- true
//防止代理修改原型
const handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden')
  }
}
const base = {}
function Target () {}
const proxy = new Proxy(Target, handler)
proxy.setPrototypeOf(proxy, base)// <- Error: Changing the prototype is forbidden

//7.4.6 isExtensible Trap(可扩展)（主要用于记录、审计）
//TypeError抛出 如果对象扩展性（代理）！= =对象的扩展性（目标）
//如果你不希望消费者知道潜在对象是否可扩展，你可以利用isExtensible trap抛出一个错误

//7.4.7 preventExtensions Trap
//你可以使用handler.preventextensions限制object.preventextensions方法。当一个对象上的扩展被阻止时，新的属性不能被添加任何更长的：对象不能被扩展
//使用WeakSet选择性的阻止

//实例：weakset里面的可扩展，剩下的不可，Reflect.isExtensible(target)返回true则不可扩展，false则可扩展
const canExtend = new WeakSet()
const handler = {
  preventExtensions (target) {
    const canPrevent = !canExtend.has(target)
    if (canPrevent) {
      Object.preventExtensions(target)
    }
    return !Reflect.isExtensible(target)
  }
}
const target = {}
const proxy = new Proxy(target, handler)
canExtend.add(target)
Object.preventExtensions(proxy)
// <- TypeError: 'preventExtensions' on proxy: trap returned falsy

//增加一个代理
const target = {}
const proxy = new Proxy(target, handler)
canExtend.add(target)
canExtend.delete(target)
Object.preventExtensions(proxy)
console.log(Object.isExtensible(proxy))
// <- false
