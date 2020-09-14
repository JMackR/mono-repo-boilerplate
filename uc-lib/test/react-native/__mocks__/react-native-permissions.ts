import * as RNPermission from "../../../../node_modules/react-native-permissions/lib/typescript"
const { PERMISSIONS, RESULTS } = require("../../../../node_modules/react-native-permissions/lib/commonjs/constants.js")

export { PERMISSIONS, RESULTS }
// mock out any functions you want in this style...
export async function check(permission: RNPermission.Permission) {
  jest.fn()
}
