import validateNaN from './validateNaN'

/**
 * decreased a number value
 * 
 * @param number number
 */
export default function dec(number: number): number {
  validateNaN(number)
  return number - 1
}
