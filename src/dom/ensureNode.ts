/** default node tag */
export const DEFAULT_NODE_TAG: string = `div`

/** create new node by given id */
interface MakeNode {
  (id: string): HTMLElement
}

/**
 * ensure node exists or create new one
 * 
 * @param id node.id attr
 * @param parent parent node, default to `document.body`
 * @param tag node tags, default to `div`
 */
export default function ensureNode(id: string, 
                                   parent: HTMLElement | string = document.body, 
                                   tag: string | MakeNode = DEFAULT_NODE_TAG): HTMLElement {
  const node: HTMLElement | null = document.getElementById(id)
  if(null !== node) return node

  const mount: HTMLElement = 'function' === typeof tag 
    ? tag(id) 
    : document.createElement(tag)
  if(id !== mount.id) mount.id = id

  const p: HTMLElement | null = 'string' === typeof parent
    ? document.querySelector(parent)
    : parent

  if(null === p) {
    throw new Error(
      `Mount node not found, "${String(p)}"`
    )
  }

  p.appendChild(mount)
  return mount
}
