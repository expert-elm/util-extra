import { walkTypes } from 'ts-baseline'
import * as path from 'path'
import * as fs from 'fs'

test(`should omit object keys`, () => {
  const out: string = walkTypes(`
    type Pick<T, K extends keyof T> = {
      [P in K]: T[P]
    }

    ${fs.readFileSync(path.resolve(__dirname, `./Omit.ts`), 'utf8')}
    
    type O = { a: string, b: number, c: boolean }
    type T = Omit<O, 'a'>
  `)

  console.log(out)
  expect(out).toMatch(/>T : { b: number, c: boolean }/)  
})
