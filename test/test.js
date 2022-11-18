const { defineType, getFactory } = require('..')
const metatests = require('metatests')

// Creation test
metatests.test('Creation test', test => {
  const factory = defineType('Human', { name: 'string', age: 'number'})
  const human = factory.create({ name: 'John', age: 23 })
  test.strictEqual(human.__metatype, 'Human')
  test.throws(() => {
    factory.create({ name: 'John', age: '23' })
  })
  test.end()
})

// Validation test
metatests.test('Validation test', test => {
  const factory = defineType('Animal', { name: 'string', age: 'number'})
  const isValid = factory.validate({ name: 'Lex', age: 3 })
  test.strictEqual(isValid, true)
  test.throws(() => {
    factory.validate({ name: 'Lex', age: '3' })
  })
  test.end()
})

// Type redefinition test
metatests.test('Type redefinition test', test => {
  const schema = { name: 'string', age: 'number'}
  defineType('Type1', schema)
  test.throws(() => {
    defineType('Type1', schema)
  })
  test.end()
})

// Get factory test
metatests.test('Get factory test', test => {
  const schema = { name: 'string', age: 'number'}
  const type = 'Type2'
  defineType(type, schema)
  const factory = getFactory(type)
  test.strictEqual(factory.metatype, type)
  test.end()
})
