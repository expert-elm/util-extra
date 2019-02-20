import { walkTypes } from 'ts-baseline'
import * as path from 'path'
import * as fs from 'fs'

test(`should omit object keys`, () => {
  const out: string = walkTypes(`
    ${fs.readFileSync(path.resolve(__dirname, `./ParameterType.ts`), 'utf8')}
    type O = { a: string, b: number }
    type T = Omit<T, 'a'>
    var foo: number
  `)

  expect(out).toMatch(/>foo : number/)  
})
