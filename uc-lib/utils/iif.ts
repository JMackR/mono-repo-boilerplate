type IIFValue = any
type IIFLazyValue = () => IIFValue

/**
 * If the condition parameter is truthy, this returns the value parameter
 * If falsy, this returns undefined
 * Expected usage is within components, props/styles based on conditions, TypeScript wants undefined
 *
 * @code condition ? value : undefined
 *
 * @param condition some truth-able object
 * @param value the value to return
 */
export function iif(condition: any, value: IIFValue | IIFLazyValue) {
  return condition ? (value instanceof Function ? value() : value) : undefined
}
