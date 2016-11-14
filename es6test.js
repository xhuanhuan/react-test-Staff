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
