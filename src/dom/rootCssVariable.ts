import isCSSVariable, { CSS_VARIABLE_PREFIX } from './isCssVariable'

/** css variable root selector  */
export const ROOT_SELECTOR: string = `:root`

export function normalizeCSSVariableProperty(name: string): string {
  if(isCSSVariable(name)) return name
  return CSS_VARIABLE_PREFIX + name
}

export function getRootCSSVariable(property: string): string {
  const prop: string = normalizeCSSVariableProperty(property)
  return getComputedStyle(document.documentElement).getPropertyValue(prop)
}

export function setRootCSSVariable(property: string, value: string): string {
  const prop: string = normalizeCSSVariableProperty(property)
  document.documentElement.style.setProperty(prop, value)
  return value
}

export interface CSSVariableDecls {
  [property: string]: string
}

function getRootCSSVariablesDecl(): CSSStyleDeclaration | null {
  for(const sheet of document.styleSheets) {
    for (const rule of (<CSSStyleSheet>sheet).cssRules) {
      const { selectorText, style } = <CSSStyleRule>rule
      if(ROOT_SELECTOR === selectorText) return style
    }
  }

  return null
}

export function getRootCSSVariables(): CSSVariableDecls {  
  const root: null | CSSStyleDeclaration = getRootCSSVariablesDecl()
  const out = Object.create(null)
  if(null === root) return out

  for(let property of root) {
    if(isCSSVariable(property)) {
      const value: string = getRootCSSVariable(property)
      out[property] = value
    }
  }

  return out
}

export function setRootCSSVariables(properties: CSSVariableDecls): void {
  for(let property in properties) {
    if(!properties.hasOwnProperty(property)) {
      setRootCSSVariable(property, properties[property])
    }
  }
}
