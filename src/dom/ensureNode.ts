/** default node tag */
export const DEFAULT_NODE_TAG: string = `div`

/** create new node by given id */
interface MakeNode {
  (id: string): Element
}

/**
 * ensure node exists or create new one
 * 
 * @param id node.id attr
 * @param parent parent node, default to `document.body`
 * @param tag node tags, default to `div`
 */
export default function ensureNode(id: string, 
                                   parent: ParentNode = document.body, 
                                   tag: string | MakeNode = DEFAULT_NODE_TAG): Element {
  const node: Element | null = document.getElementById(id)
  if(null !== node) return node

  const mount: Element = 'function' === typeof tag 
    ? tag(id) 
    : document.createElement(tag)
  if(id !== mount.id) mount.id = id

  parent.append(mount)
  return mount
}
