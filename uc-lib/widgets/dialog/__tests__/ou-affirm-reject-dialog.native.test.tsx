import React from "react"
import { AffirmRejectDialog } from "uc-lib"
import { render } from "react-native-testing-library"

describe("AffirmRejectDialog tests", () => {
  let onAffirm: () => void
  let onReject: () => void
  let dismiss: () => void

  const affirmText = "Yes"
  const rejectText = "No"
  beforeEach(() => {
    onAffirm = jest.fn()
    onReject = jest.fn()
    dismiss = jest.fn()
  })

  test("Render content", () => {
    const tree = render(
      <AffirmRejectDialog
        onAffirm={onAffirm}
        onReject={onReject}
        affirmText={affirmText}
        rejectText={rejectText}
        dismiss={dismiss}
        title="Test Title"
        dismissOnReject={true}
        body="Test Body"
      />,
    )
    expect(tree).toMatchSnapshot()
  })
  test("Affirm button tapped", () => {
    const tree = render(
      <AffirmRejectDialog
        onAffirm={onAffirm}
        onReject={onReject}
        affirmText={affirmText}
        rejectText={rejectText}
        dismiss={dismiss}
        title="Test Title"
        dismissOnReject={true}
        body="Test Body"
      />,
    )
    const affirmButton = tree.getByTestId("uc-lib.affirm-reject-dialog.affirm-button")
    affirmButton.props.onClick()
    expect(onAffirm).toBeCalledTimes(1)
    expect(dismiss).toBeCalledTimes(1)
    expect(onReject).toHaveBeenCalledTimes(0)
  })
  test("Reject button tapped", () => {
    const tree = render(
      <AffirmRejectDialog
        onAffirm={onAffirm}
        onReject={onReject}
        affirmText={affirmText}
        rejectText={rejectText}
        dismiss={dismiss}
        title="Test Title"
        dismissOnReject={true}
        body="Test Body"
      />,
    )
    const rejectButton = tree.getByTestId("uc-lib.affirm-reject-dialog.reject-button")
    rejectButton.props.onClick()
    expect(onReject).toBeCalledTimes(1)
    expect(dismiss).toBeCalledTimes(1)
    expect(onAffirm).toHaveBeenCalledTimes(0)
  })
})
