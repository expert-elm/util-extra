/**
 * simple wrap for QSA
 * 
 * @param selector selector string
 * @param parent parent node, default to `document`
 */
export default function getNodes(selector: string, parent: ParentNode = document): Element[] {
  return Array.from(parent['querySelectorAll'](selector))
}
