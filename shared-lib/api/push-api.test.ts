import { PushApi } from "./push-api"

test("registerToken", () => {
  const request = PushApi.registerToken("test-token")
  expect(request.method).toEqual("post")
  expect(request.endpoint).toEqual("/api/push/token/register")
  expect(request.authenticate).toBeTruthy()
  expect(request.body).toEqual({ token: "test-token" })
})
