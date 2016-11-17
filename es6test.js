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
