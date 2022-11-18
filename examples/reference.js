const { defineType } = require('..')

// Define types
const animalFactory = defineType('Animal', { name: 'string', age: 'number' })
const humanFactory = defineType('Human', { name: 'string', age: 'number', pet: 'Animal' })

// Create objects
const pet = animalFactory.create({ name: 'Lex', age: 3 })
const human = humanFactory.create({ name: 'John', age: 23, pet })

// { human: { name: 'John', age: 23, pet: { name: 'Lex', age: 3 } } }
console.dir({human})

// Or
{
  const human = humanFactory.create({ name: 'John', age: 23, pet: { name: 'Lex', age: 3 }})
}

// Validate (will return true)
const isValid = humanFactory.validate({ name: 'John', age: 23, pet: { name: 'Lex', age: 3 }})

// { isValid: true }
console.dir({isValid})

// Will throw: Error: Invalid "age" type.
// humanFactory.validate({ name: 'John', age: 23, pet: { name: 'Lex', age: '3' }})
