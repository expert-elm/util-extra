/** 
 * gender type 
 * 
 * @title normal gender types
 * @description normal gender types
 */
export const enum Gender { 
  /** male */
  Male, 
  /** female */
  Female
}

/** genders */
export const GENDERS: Gender[] = [
  Gender.Male,
  Gender.Female
]

/// PREDICATION /// 

export function isMale(gender: Gender): gender is Gender.Male {
  return gender === Gender.Male
}

export function isFemale(gender: Gender): gender is Gender.Female {
  return gender === Gender.Female
}

export function isGender(gender: Gender): gender is Gender {
  return isMale(gender) || isFemale(gender)
}


/// TRANSFORM ///

export const INVALID_GENDER_ERROR: TypeError = new TypeError(`Invalid gender`)

export const DIRECTION_ALIAS_MAP: Readonly<Map<Gender, Readonly<string>>> = new Map([
  [Gender.Male, `male`],
  [Gender.Female, `female`]
])

export function transform(gender: Gender): string {
  const genders: undefined | Readonly<string> = DIRECTION_ALIAS_MAP.get(gender)
  if(undefined === genders) throw INVALID_GENDER_ERROR
  return genders
}

export function parse(string: string): Gender {
  let ret: null | Gender = null
  DIRECTION_ALIAS_MAP.forEach((value, gender) => {
    if(value !== string) return
    ret = gender
  })

  if(null === ret) throw INVALID_GENDER_ERROR
  return ret
}
