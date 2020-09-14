import { LoginApi } from "./login-api"

test("register", () => {
  const request = LoginApi.register()
  expect(request.method).toEqual("post")
  expect(request.endpoint).toEqual("/api/login/register")
})

test("connect", () => {
  const request = LoginApi.connect("google", "test_google_token")
  expect(request.method).toEqual("post")
  expect(request.endpoint).toEqual("/api/login/connect")
  expect(request.body).toEqual({ provider: "google", token: "test_google_token" })
  expect(request.authenticate).toBeTruthy()
  expect(request.validErrors).toEqual([404, 409])
})
