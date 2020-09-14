// tslint:disable: no-magic-numbers
// tslint:disable: no-bitwise
export const ensureHex = (input: string): string => {
  if (input.startsWith("rgba")) {
    return rgba2hex(input, input.length === 9).toUpperCase()
  } else if (!input.startsWith("#")) {
    // tslint:disable-next-line: no-console
    console.warn("unable to ensure hex", input)
  }
  return input.toUpperCase()
}

/**
 * Adapted from https://stackoverflow.com/questions/49974145/how-to-convert-rgba-to-hex-color-code-using-javascript#49974627
 * @param orig
 * @param forceAlpha
 */
function rgba2hex(orig: string, forceAlpha?: boolean) {
  let a
  const rgb = orig.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i)
  const alpha = ((rgb && rgb[4]) || "").trim()
  let hex = rgb
    ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
      (rgb[2] | (1 << 8)).toString(16).slice(1) +
      (rgb[3] | (1 << 8)).toString(16).slice(1)
    : orig

  if (alpha !== "") {
    a = alpha
  } else {
    a = 1
  }
  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1)
  hex = hex

  if (a !== "ff" || forceAlpha === true) {
    return "#" + a + hex
  } else if (a === "ff") {
    return "#" + hex
  }
  throw Error("unexpected rgba2hex() conversion!")
}
