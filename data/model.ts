type Record<T> = { value: T }

export class DataModel<T extends object> {
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
  fork(): DataModel<T> {
    return new DataModel(this.toJSON())
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
  update(oldItem: T, newItem: T, upsert: boolean = false): DataModel<T> {
    const ret = this._update(oldItem, newItem, upsert)
    if(null === ret) return this
    return this.fork()
  }
  updateMany(updates: [T, T][], upsert: boolean = false): DataModel<T> {
    if(0 === updates.length) return this
    updates.forEach(([ oldItem, newItem ]) => {
      this.update(oldItem, newItem, upsert)
    })
    return this.fork()
  }
  private _create(item: T): DataModel<T> {
    const record = { value: item }
    this.records.add(record)
    this.indexes.set(item, record)
    return this
  }
  create(item: T): DataModel<T> {
    return this._create(item).fork()
  }
  createMany(items: T[]): DataModel<T> {
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
  drop(item: T): DataModel<T> {
    const ret = this._drop(item)
    if(null === ret) return this
    return this.fork()
  }
  dropMany(items: T[]): DataModel<T> {
    const count = this.count()
    const clone = this.fork()
    items.forEach(clone._drop.bind(clone))
    if(count === clone.count()) return this
    return clone
  }
}

export function Model<T extends { [key:string]: any }>(values: T[] = []): DataModel<T> {
  return new DataModel(values)
}
