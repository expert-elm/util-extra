import isInvalidDate from './isInvalidDate'

export default function assertInvalidDate(date: Date, error?: Error): void {
  if(isInvalidDate(date)) throw !error ? date : error
}
