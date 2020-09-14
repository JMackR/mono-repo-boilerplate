import { useEffect } from "react"
import { getAppSandboxBaseFileUri } from "../../widgets"

const _appSandboxFilePathHolder = {
  uri: "",
}
export const useAppSandboxFilePathFetchOnce = () => {
  useEffect(() => {
    getAppSandboxBaseFileUri().then(baseUri => {
      _appSandboxFilePathHolder.uri = baseUri
    })
  }, [])
}

export const appSandboxFilePathHolder = _appSandboxFilePathHolder
