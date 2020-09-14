import { MultifactorHeaderInfo, AuthScreenContext } from "shared-lib"

export interface AccountMultifactorProps {
  mfaRequiredTask: (multifactorHeaderInfo: MultifactorHeaderInfo) => Promise<void>
  onCompleted: () => void
  context: AuthScreenContext
}
