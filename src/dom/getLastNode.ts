import getNodes from './getNodes'

export default function getLastNode(selector: string, parent: ParentNode = document): Element | undefined {
  const res = getNodes(selector, parent)
  return res[res.length - 1]
}
