import { StyleSheetTestUtils } from "aphrodite"
import { StyleSheetTestUtils as StyleSheetTestUtilsNoImportant } from "aphrodite/no-important"
import { createSerializer } from "jest-aphrodite-react/no-important"
expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))
StyleSheetTestUtils.suppressStyleInjection()
StyleSheetTestUtilsNoImportant.suppressStyleInjection()
