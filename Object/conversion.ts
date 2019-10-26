export function getObjectType(obj: any): string {
  const iden = toString.call(obj)
  return iden.substring(8, iden.length - 1)
}
