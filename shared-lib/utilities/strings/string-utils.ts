export const removeNonNumericCharacters = (input: string | undefined | null) => {
  return input ? input.replace(/\D/g, "") : input
}

export const formatPhoneNumber = (phoneNumberString: string | null | undefined) => {
  const prefix = phoneNumberString?.startsWith("+1") ? "+1 " : ""
  phoneNumberString = phoneNumberString?.replace("+1", "")
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "")
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    // tslint:disable-next-line: no-magic-numbers
    return `${prefix}(${match[1]}) ${match[2]} - ${match[3]}`
  }
  return null
}

export const formatPhoneNumberFromRawText = (content: string) => {
  const pattern = /([^\d]*)\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})*/g
  const replacementPattern = "$1($2)-$3-$4"
  return content.replace(pattern, replacementPattern)
}

export const isValidURL = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ) // fragment locator
  return !!pattern.test(url)
}
