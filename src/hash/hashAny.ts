let objUid = 0
let objUidKey = typeof Symbol !== 'undefined' ? Symbol('_hmuid_') : '_hmuid_'
let objUidMap =
  typeof WeakMap !== 'undefined' ? new WeakMap<object, number>() : null

function getType(key: any) {
  const t: string = Object.prototype.toString.call(key)
  return t.slice(8, -1).toLowerCase()
}

export function hashObjByRef(obj: any) {
  if (objUidMap) {
    let uid = objUidMap.get(obj)
    if (!uid) {
      uid = ++objUid
      objUidMap.set(obj, uid)
    }
    return '⭕️' + uid
  }
  if (!obj.hasOwnProperty(objUidKey)) {
    obj[objUidKey] = ++objUid
    hide(obj, objUidKey)
  }

  return '⭕️' + obj[objUidKey]
}

export function hashObjByJson(obj: any): string {
  return (
    obj.constructor.name +
    JSON.stringify(obj, (k, v) => {
      if (!k) return v
      return hashAny(v, hashObjByJson)
    })
  )
}

export default function hashAny(
  key: any,
  hashObj: (val: any) => string = hashObjByRef,
): string {
  switch (getType(key)) {
    case 'undefined':
    case 'null':
    case 'boolean':
    case 'number':
    case 'regexp':
      return key + ''

    case 'date':
      return '📅' + key.getTime()

    case 'string':
      return '📝' + key

    case 'array':
      return '🔗' + (key as any[]).map(k => hashAny(k)).join('⁞')

    default:
      return hashObj(key)
  }
}

function hide(obj: object, prop: PropertyKey) {
  // Make non iterable if supported
  if (Object.defineProperty) {
    Object.defineProperty(obj, prop, { enumerable: false })
  }
}
