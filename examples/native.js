const { defineType } = require('..')

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
