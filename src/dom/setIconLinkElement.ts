import getIconLinkTag from './getIconLinkElement'

type Attributes = { 
  [K in keyof Omit<HTMLLinkElement, 'href'> ]: HTMLLinkElement[K] 
}

export default function setIconLinkElement(source: string, attributes: Partial<Readonly<Attributes>> = {}): HTMLLinkElement {
  const link = document.createElement('link')
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      const value = attributes[key as keyof Omit<HTMLLinkElement, 'href'>]
      link.setAttribute(key, value as string)
    }
  }

  attributes.rel && link.setAttribute('rel', 'shortcut icon')
  link.setAttribute('href', source)

  const oldLink = getIconLinkTag()
  if(undefined === oldLink) {
    document.head.appendChild(link)
  } else {
    document.head.replaceChild(link, oldLink)
  }

  return link
}
