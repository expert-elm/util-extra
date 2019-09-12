import getLastNode from './getLastNode'

export default function getIconLinkTag(): HTMLLinkElement | undefined {
  return ['shortcut icon', 'icon']
    .map(rel => getLastNode(`link[rel="${rel}"]`))
    .find((link): link is HTMLLinkElement => undefined !== link)
}
