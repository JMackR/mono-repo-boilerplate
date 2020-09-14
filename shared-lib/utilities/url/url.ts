export interface QueryParamObject {
  [key: string]: string | number | undefined
}

/*
 * Reverse url
 * Return String
 * e.g.
 * Url.reverse('/p/:id/', {id: 1}) => /p/1/
 */
const reverse = (path: string, params: QueryParamObject): string => {
  Object.keys(params).forEach(key => {
    const value = params[key] as string
    path = path.replace(new RegExp(":" + key, "gi"), encodeURIComponent(value))
  })
  return path
}

/*
 * Create url with new query params
 * Return String
 */
const create = (
  path: string,
  queryParams: QueryParamObject,
  newQueryParams?: QueryParamObject,
  excludedParams?: string[],
) => {
  const updatedQueryParams: QueryParamObject = {
    ...queryParams,
    ...newQueryParams,
  }
  let queryString = ""
  Object.keys(updatedQueryParams)
    .filter(key => updatedQueryParams[key] && (!excludedParams || !excludedParams.includes(key)))
    .forEach(key => {
      queryString += `&${key}=${encodeURIComponent(updatedQueryParams[key] as string)}`
    })
  if (queryString) {
    queryString = `?${queryString.substring(1, queryString.length)}`
  }
  return `${path}${queryString}`
}

export const Url = {
  reverse,
  create,
}
