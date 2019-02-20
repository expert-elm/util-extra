import { walkTypes } from 'ts-baseline'
import * as path from 'path'
import * as fs from 'fs'

test(`should omit object keys`, () => {
  const out: string = walkTypes(`
    ${fs.readFileSync(path.resolve(__dirname, `./Omit.ts`), 'utf8')}
    type O = { a: string, b: number }
    type T = Omit<O, 'a'>
  `)

  expect(out).toMatch(/>T : { b: number }/)  
})
