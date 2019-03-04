export type Fn<R = any> = (...args: any[]) => R

export function overrideProperty<T = any>(
  desc: TypedPropertyDescriptor<T>,
  update: (oldValue: T) => T,
) {
  if (desc.get) {
    let oldValue = desc.get()
    desc.get = () => update(oldValue)
  } else if (desc.value) {
    let oldValue = desc.value
    desc.value = update(oldValue)
  } else {
    throw new Error(`Invalid property`)
  }
}
