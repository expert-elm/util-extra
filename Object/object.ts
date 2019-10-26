export function makeObjectPropertyNonEnumerable(obj: object, property: PropertyKey) {
  Object.defineProperty(obj, property, { enumerable: false })
}
