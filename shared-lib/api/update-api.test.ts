import { UpdateApi } from "./update-api"

const platform = "test-platform"
const bundle = "test-bundle"

test("getVersionRequirements", () => {
  const request = UpdateApi.getVersionRequirements(platform, bundle)
  expect(request.method).toEqual("get")
  expect(request.endpoint).toEqual("/api/update/test-platform/test-bundle")
})
