import validateNaN from './validateNaN'

/**
 * increased a number value
 * 
 * @param number number
 */
export default function inc(number: number): number {
  validateNaN(number)
  return number + 1
}
