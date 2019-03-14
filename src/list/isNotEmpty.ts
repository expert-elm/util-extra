export default function isNotEmpty(list: unknown): boolean {
  return Array.isArray(list) && list.length > 0
}
