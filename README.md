# Metatype
Metatype is a runtime type validation system for browser and nodejs.

# Installing
```sh
npm i @didkovsky/metatype
```
# Usage
Check `/examples` folder.

## Create objects
```javascript
const { defineType, getFactory } = require('@didkovsky/metatype')

// Type name
const typeName = 'Human'

// Type description
const schema = { name: 'string', age: 'number' }

// Define type
const factory = defineType(typeName, schema)

{
  // Will works only for types defined by defineType()
  factory = getFactory(typeName)
}

// Create object
const human = factory.create({ name: 'John', age: 23 })

// { human: { name: 'John', age: 23 } }
console.dir({human})

// Will throw: Error: Invalid "age" type.
// factory.create({ name: 'John', age: '23' })

```
## Validate objects
```javascript
const { defineType } = require('@didkovsky/metatype')

// Type description
const schema = { name: 'string', age: 'number' }

// Define type
const factory = defineType('Human', schema)

// Validate struct (will return true)
const isValid = factory.validate({ name: 'John', age: 23 })

// { isValid: true }
console.dir({ isValid })

// Will throw: Error: Invalid "age" type.
// factory.validate({ name: 'John', age: '23' })

```
## Type reference
```javascript
const { defineType } = require('@didkovsky/metatype')

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

```
## Native objects reference
```javascript
const { defineType } = require('@didkovsky/metatype')

// Custom function
function MyFunction () {}

// Custom class
class MyClass {}

// Define type
const factory = defineType('Type1', {
  arr: Array,
  buff: Buffer,
  customFunction: MyFunction,
  customClass: MyClass
})

// Create object
const obj = factory.create({
  arr: [1, 2, 3],
  buff: Buffer.alloc(1),
  customFunction: new MyFunction(),
  customClass: new MyClass()
})

/*
obj: {
    arr: [ 1, 2, 3 ],
    buff: Buffer(1) [Uint8Array] [ 0 ],
    customFunction: MyFunction {},
    customClass: MyClass {}
  }
*/
console.dir({obj})

```
## Type indexes
```javascript
const { MetaFactory } = require('@didkovsky/metatype')

// Types indexes
const indexA = new Map()
const indexB = new Map()

// Type name and definition
const typeName = 'MyType'
const schema = { a: 'string', b: 'number' }

// Create fectory in indexA
const factory = new MetaFactory(typeName, schema, indexA)
console.dir({factory})

// Will throw, because typeName already defined in indexA
// new MetaFactory(typeName, schema, indexA)

{
  // Ok, because typeName is not defined in indexB
  const factory = new MetaFactory(typeName, schema, indexB)
  console.dir({factory})
}

```
