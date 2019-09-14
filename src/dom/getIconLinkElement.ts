import getLastNode from './getLastNode'

export default function getIconLinkElement(): HTMLLinkElement | undefined {
  return ['shortcut icon', 'icon']
    .map(rel => getLastNode(`link[rel="${rel}"]`))
    .find((link): link is HTMLLinkElement => undefined !== link)
}
