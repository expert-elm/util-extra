import toCalendar, { Type } from './toCalendar'
import toPadZero from '../number/toPadZero'

test(`toCalendar`, () => {
  const ret =(toCalendar(new Date(`2018-05-19`), Type.Year))
  console.log(ret, ret.length)
  const str: string[] = []
  // str.push(`Su Mo Tu We Th Fr Sa \n`)
  // str.push(`-- -- -- -- -- -- -- \n`)
  ret.forEach(({ date }, i) => {
    str.push(toPadZero(date.getFullYear(), 4) + ' ')
    if(i % 4 === 3) str.push(`\n`)
  })
  console.log(str.join(''))
  expect(
    toCalendar(new Date(), Type.Day)
  )
})
