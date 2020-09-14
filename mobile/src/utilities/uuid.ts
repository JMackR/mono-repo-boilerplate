// tslint:disable: no-bitwise
// tslint:disable: no-magic-numbers

// Note that Math.random is not great at guaranteeing unique values!
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const UUID = {
  uuid() {
    const result = uuidv4()
    return result
  },
}
