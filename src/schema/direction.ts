export const enum Direction {
  Top,
  Right,
  Bottom,
  Left
}

export const DIRECTIONS: ReadonlyArray<Direction> = [
  Direction.Top,
  Direction.Right,
  Direction.Bottom,
  Direction.Left
]


/// PREDICATE ///

export function isTop(direction: any): direction is Direction.Top {
  return direction === Direction.Top
}

export function isRight(direction: any): direction is Direction.Right {
  return direction === Direction.Right
}

export function isBottom(direction: any): direction is Direction.Bottom {
  return direction === Direction.Bottom
}

export function isLeft(direction: any): direction is Direction.Left {
  return direction === Direction.Left
}

export function isDirection(direction: any): direction is Direction {
  return isTop(direction) 
    || isBottom(direction)
    || isBottom(direction)
    || isLeft(direction)
}


/// TRANSFORM ///

export const INVALID_DIRECTION_ERROR: TypeError = new TypeError(`Invalid direction`)

export const DIRECTION_ALIAS_MAP: Readonly<Map<Direction, ReadonlyArray<string>>> = new Map([
  [Direction.Top, [`top`, `tt`, `t`]],
  [Direction.Right, [`right`, `rr`, `r`]],
  [Direction.Bottom, [`bottom`, `bb`, `b`]],
  [Direction.Left, [`left`, `ll`, `l`]]
])

export function fromString(alias: string, allowShort: boolean = true): Direction {
  let ret: null | Direction = null
  DIRECTION_ALIAS_MAP.forEach((aliases, direction) => {
    const as: ReadonlyArray<string> = allowShort ? aliases : aliases.slice(0, 1)
    if(!as.includes(alias)) return
    ret = direction
  })

  if(null === ret) throw INVALID_DIRECTION_ERROR
  return ret
}

export function toString(direction: Direction): string {
  const aliases: undefined | ReadonlyArray<string> = DIRECTION_ALIAS_MAP.get(direction)
  if(undefined === aliases) throw INVALID_DIRECTION_ERROR
  return aliases[0]
}
