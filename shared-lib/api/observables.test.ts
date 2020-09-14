import { connectResponseResult, resultObservable } from "./observables"
import { mockResponse } from "../../../test/__mocks__/api"

xtest("todo refactored", () => {})

// describe("resultObservable", () => {
//   it("creates an observable with defaults", () => {
//     expect(resultObservable().get()).toEqual({ ok: undefined, error: undefined })
//   })
//   it("can be set to successful", () => {
//     const u = resultObservable()
//     u.set({ ok: true })
//     expect(u.get()).toEqual({ ok: true, error: undefined })
//   })
//   it("can be set to failed", () => {
//     const u = resultObservable()
//     u.set({ ok: false, error: "Error!" })
//     expect(u.get()).toEqual({ ok: false, error: "Error!" })
//   })
// })
//
// describe("useResponseObservable", () => {
//   xit("does some stuff!", () => {
//     // TODO
//   })
// })
//
// describe("connectResponseResult", () => {
//   const responseOk = mockResponse({})
//   const responseFail = mockResponse({}, { ok: false })
//   const successCallback = jest.fn()
//   const failedCallback = jest.fn()
//   describe("response OK", () => {
//     it("sets the response to OK, no error", () => {
//       const result = resultObservable()
//       connectResponseResult(result)(responseOk)
//       expect(result.get().ok).toBeTruthy()
//     })
//     it("calls a successCallback", () => {
//       const result = resultObservable()
//       connectResponseResult(result, successCallback, failedCallback)(responseOk)
//       expect(result.get().ok).toBeTruthy()
//       expect(successCallback).toHaveBeenCalledWith(responseOk)
//       expect(failedCallback).not.toHaveBeenCalledWith(responseOk)
//     })
//   })
//   describe("response not OK", () => {
//     it("sets the response to OK, no error", () => {
//       const result = resultObservable()
//       connectResponseResult(result)(responseFail)
//       expect(result.get().ok).toBeFalsy()
//     })
//     it("calls a failedCallback", () => {
//       const result = resultObservable()
//       connectResponseResult(result, successCallback, failedCallback)(responseFail)
//       expect(result.get().ok).toBeFalsy()
//       expect(successCallback).not.toHaveBeenCalledWith(responseFail)
//       expect(failedCallback).toHaveBeenCalledWith(responseFail)
//     })
//   })
// })
