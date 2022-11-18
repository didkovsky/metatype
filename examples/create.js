const { defineType, getFactory } = require('..')

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
