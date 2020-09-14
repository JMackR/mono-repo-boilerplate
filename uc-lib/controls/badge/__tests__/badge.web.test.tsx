import React from "react"
import { Badge } from "uc-lib"
import * as renderer from "react-test-renderer"
import { StyleSheetTestUtils } from "aphrodite/no-important"

import { createSerializer } from "jest-aphrodite-react/no-important"
expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe("Badge Snapshot Tests", () => {
  test("Badge with non-displayable amount renders properly", () => {
    const tree = renderer.create(<Badge amount={0} />)

    expect(tree).toMatchSnapshot()
  })

  test("Badge with one digit amount renders properly", () => {
    const tree = renderer.create(<Badge amount={9} />)

    expect(tree).toMatchSnapshot()
  })

  test("Badge with two digit amount renders properly", () => {
    const tree = renderer.create(<Badge amount={99} />)

    expect(tree).toMatchSnapshot()
  })

  test("Badge with 3 digit amount truncates and renders properly", () => {
    const tree = renderer.create(<Badge amount={999} />)

    expect(tree).toMatchSnapshot()
  })
})
