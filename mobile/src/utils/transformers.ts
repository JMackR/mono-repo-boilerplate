import R from "ramda"

const camelCase = (str: string) => str.replace(/[-_]([a-z])/g, m => m[1].toUpperCase())

export const Transformers = {
  /**
   * Converts a camelCased string to a snakeCased string
   * @param str
   */
  snakeCase(str: string): string {
    return str.replace(/[A-Z]/g, m => `_${m[0].toLowerCase()}`)
  },
  /**
   * Transforms the keys of an object from snake (underscores) to camel case
   * @param input
   */
  snakeToCamel<T>(input: any): T {
    if (Array.isArray(input)) {
      return (R.map(Transformers.snakeToCamel, input) as unknown) as T
    } else if (input instanceof Object) {
      return (R.fromPairs(
        R.map(([k, v]) => {
          return [camelCase(k), Transformers.snakeToCamel(v)]
        }, R.toPairs(input)),
      ) as unknown) as T
    }
    return (input as unknown) as T
  },
  /**
   * Transforms the keys of an object from camel to snake
   * @param input
   */
  camelToSnake<T>(input: any): T {
    if (Array.isArray(input)) {
      return (R.map(Transformers.camelToSnake, input) as unknown) as T
    } else if (input instanceof Object) {
      return (R.fromPairs(
        R.map(([k, v]) => {
          return [Transformers.snakeCase(k), Transformers.camelToSnake(v)]
        }, R.toPairs(input)),
      ) as unknown) as T
    }
    return (input as unknown) as T
  },
}
