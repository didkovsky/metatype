const { MetaFactory } = require('..')

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
