import AnyFunction from '../type/AnyFunction'

export default function timeout<F extends AnyFunction>(timeout: number, fn: F): Promise<ReturnType<F>> {
  return new Promise(async (res, rej) => {
    const timer = setTimeout(cleanup, timeout)
    res(await fn())

    function cleanup(): void {
      clearTimeout(timer)
      rej(makeTimeoutError())
    }
  })
}

/**
 * @noexport
 */
export function makeTimeoutError(): Error {
  return new Error(`Timeout`)
}
