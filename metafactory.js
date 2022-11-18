// Simple assertion
const assert = (exp, msg) => {
  if (exp) return
  throw new Error(msg)
}

/**
 * Create objects from the type definition object
 */
class MetaFactory {

  /**
   * @param {*} name - Type name
   * @param {*} definition - Type definition object. {TypeName: {schema}}
   * @param {*} typeIndex - Map of already created factories indexed by type name
   */
  constructor(name, definition, typeIndex) {
    this.schema = definition
    assert(!typeIndex.has(name),
    'Factory redefinition is not allowed.')
    typeIndex.set(name, this)
    this.typeIndex = typeIndex
    this.metatype = name
  }

  /**
   * Check properties of payload and create "metaobject"
   * @param {*} payload - to validate type and create object for
   * @returns validated object
   */
  create(payload) {
    const { metatype } = this

    /**
     * Validate properties
     */
    this.validate(payload)

    // If object has type mark
    if (payload.__metatype) return payload

    /**
     * Add __metatype property
     */
    const attr = { value: metatype, writable: false }
    Object.defineProperty(payload, '__metatype', attr)
    return payload
  }

  /**
   * Validate payload properties types
   * @param {*} payload - object to validate
   * @returns will return true of throw Error
   */
  validate(payload) {
    const { schema, typeIndex, metatype } = this

    /**
     * Check if payload has __metatype property,
     * if it is - we will trust object and skip validation
     */
    if (payload.__metatype) {
      assert(payload.__metatype === metatype,
      `Invalid MetaType for ${metatype}`)
      return true
    }

    // Check props
    for (const key in schema) {
      const prop = payload[key]
      assert(prop, `Property "${key}" missed.`)
      const type = schema[key]
      if (typeof type === 'function') {

        /**
         * For native objects like Array, Buffer...
         */
        assert(prop instanceof type, `Invalid "${key}" instance.`)
      } else {

        /**
         * For another metatype
         */
        if (typeIndex.has(type))
        typeIndex.get(type).validate(prop)

        /**
         * For primitive types
         */
        else assert(typeof prop === type, `Invalid "${key}" type.`)
      }      
    }
    
    return true
  }
}

/**
 * Created factories indexed by type (use it single)
 */
const typeIndex = new Map()

/**
 * Create and save to index new factory
 * @param {*} name - type name
 * @param {*} definition - type definition
 * @returns MetaFactory instance
 */
const defineType = (name, definition) => new MetaFactory(name, definition, typeIndex)

/**
 * Get factory from index by type name
 * @param {*} type - type name (string)
 * @returns MetaFactory instance
 */
const getFactory = type => typeIndex.get(type)

module.exports = { MetaFactory, defineType, getFactory }
