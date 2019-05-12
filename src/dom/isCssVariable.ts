/** css variable flag */
export const CSS_VARIABLE_PREFIX: string = `--`

/** regexp to match style property */
const REGEXP_CSS_VARIABLE_MATCH: RegExp = new RegExp(`^${CSS_VARIABLE_PREFIX}`)

export default function isCSSVariable(property: string): boolean {
  return REGEXP_CSS_VARIABLE_MATCH.test(property)
}
