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
