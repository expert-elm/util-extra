export const enum AllDirection {
  Top,
  TopRight,
  Right,
  BottomRight,
  Bottom,
  BottomLeft,
  Left,
  TopLeft,
}

export const ALLDIRECTIONS: ReadonlyArray<AllDirection> = [
  AllDirection.Top,
  AllDirection.TopRight,
  AllDirection.Right,
  AllDirection.BottomRight,
  AllDirection.Bottom,
  AllDirection.BottomLeft,
  AllDirection.Left,
  AllDirection.TopLeft,
]


/// PREDICATE ///

export function isTop(direction: any): direction is AllDirection.Top {
  return direction === AllDirection.Top
}

export function isRight(direction: any): direction is AllDirection.Right {
  return direction === AllDirection.Right
}

export function isBottom(direction: any): direction is AllDirection.Bottom {
  return direction === AllDirection.Bottom
}

export function isLeft(direction: any): direction is AllDirection.Left {
  return direction === AllDirection.Left
}

export function isTopLeft(direction: any): direction is AllDirection.TopLeft {
  return direction === AllDirection.TopLeft
}

export function isTopRight(direction: any): direction is AllDirection.TopRight {
  return direction === AllDirection.TopRight
}

export function isBottomLeft(direction: any): direction is AllDirection.BottomLeft {
  return direction === AllDirection.BottomLeft
}

export function isBottomRight(direction: any): direction is AllDirection.BottomRight {
  return direction === AllDirection.BottomRight
}

export function isDirection(direction: any): direction is AllDirection {
  return isTop(direction) 
    || isBottom(direction)
    || isBottom(direction)
    || isLeft(direction)
    || isTopLeft(direction)
    || isTopRight(direction)
    || isBottomLeft(direction)
    || isBottomRight(direction)
}


/// TRANSFORM ///

export const INVALID_DIRECTION_ERROR: TypeError = new TypeError(`Invalid direction`)

export const ALLDIRECTION_ALIAS_MAP: Readonly<Map<AllDirection, ReadonlyArray<string>>> = new Map([
  [AllDirection.Top, [`top`, `tt`, `t`]],
  [AllDirection.TopRight, [`top-right`, `tr`, `rt`]],
  [AllDirection.Right, [`right`, `rr`, `r`]],
  [AllDirection.BottomRight, [`bottom-right`, `br`, `rb`]],
  [AllDirection.Bottom, [`bottom`, `bb`, `b`]],
  [AllDirection.BottomLeft, [`bottom-left`, `bl`, `lb`]],
  [AllDirection.Left, [`left`, `ll`, `l`]],
  [AllDirection.TopLeft, [`top-left`, `tl`, `lt`]],
])

export function parse(alias: string, allowShort: boolean = true): AllDirection {
  let ret: null | AllDirection = null
  ALLDIRECTION_ALIAS_MAP.forEach((aliases, direction) => {
    const as: ReadonlyArray<string> = allowShort ? aliases : aliases.slice(0, 1)
    if(!as.includes(alias)) return
    ret = direction
  })

  if(null === ret) throw INVALID_DIRECTION_ERROR
  return ret
}

export function transform(direction: AllDirection): string {
  const aliases: undefined | ReadonlyArray<string> = ALLDIRECTION_ALIAS_MAP.get(direction)
  if(undefined === aliases) throw INVALID_DIRECTION_ERROR
  return aliases[0]
}
