const { defineType } = require('..')

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
