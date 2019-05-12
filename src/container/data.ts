type Record<T> = { value: T }

export class Data<T extends object> {
  private records: Set<Record<T>>
  private indexes: Map<T, Record<T>>
  constructor(values: T[] = []) {
    this.records = new Set()
    this.indexes = new Map()
    values.forEach(ref => {
      const record = this.toRecord(ref)
      this.records.add(record)
      this.indexes.set(ref, record)
    })
  }
  private toRecord(item: T): Record<T> {
    return { value: item }
  }
  private fromRecord(item: Record<T>): T {
    return item.value
  }
  toJSON(): T[] {
    const acc: T[] = []
    this.records.forEach(record => {
      acc.push(this.fromRecord(record))
    })
    return acc
  }
  fork(): Data<T> {
    return new Data(this.toJSON())
  }

  /// IDEMPOTENT ///

  count(): number {
    return this.records.size
  }
  
  find(filter?: (item: T) => true): T[] {
    const json = this.toJSON()
    if(undefined === filter) return json
    return json.filter(filter)
  }

  findOne(filter?: (item: T) => true): T | null {
    if(undefined === filter) return null
    return this.toJSON().find(filter) || null
  }

  /// MODIFIER ///

  private _update(oldItem: T, newItem: T, upsert: boolean = false) {
    const record = this.indexes.get(oldItem)
    if(undefined === record) {
      if(upsert) return this.create(newItem)
      return null
    }
    record.value = newItem
    return this
  }
  update(oldItem: T, newItem: T, upsert: boolean = false): Data<T> {
    const ret = this._update(oldItem, newItem, upsert)
    if(null === ret) return this
    return this.fork()
  }
  updateMany(updates: [T, T][], upsert: boolean = false): Data<T> {
    if(0 === updates.length) return this
    updates.forEach(([ oldItem, newItem ]) => {
      this.update(oldItem, newItem, upsert)
    })
    return this.fork()
  }
  private _create(item: T): Data<T> {
    const record = { value: item }
    this.records.add(record)
    this.indexes.set(item, record)
    return this
  }
  create(item: T): Data<T> {
    return this._create(item).fork()
  }
  createMany(items: T[]): Data<T> {
    items.forEach(this._create.bind(this))
    return this.fork()
  }
  private _drop(item: T) {
    const ref = this.indexes.get(item)
    if(undefined === ref) return null
    this.records.delete(ref)
    this.indexes.delete(item)
    return this
  }
  drop(item: T): Data<T> {
    const ret = this._drop(item)
    if(null === ret) return this
    return this.fork()
  }
  dropMany(items: T[]): Data<T> {
    const count = this.count()
    const clone = this.fork()
    items.forEach(clone._drop.bind(clone))
    if(count === clone.count()) return this
    return clone
  }
}

export default function data<T extends { [key:string]: any }>(values: T[] = []): Data<T> {
  return new Data(values)
}
