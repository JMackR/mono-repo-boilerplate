import { useApolloClient, useMutation } from "@apollo/react-hooks"
import { getClientType } from "../../utilities/platform"
import { login } from "./facebook-controller"
export const ACCNT_FLEX_ROW_HEIGHT = 42

export const useFacebookConnect = (onError: (error: any) => void) => {
  const apolloClient = useApolloClient()
  const [connectFacebookAccount] = useMutation(CONNECT_FACEBOOK_ACCNT)
  const onConnectFacebook = async () => {
    try {
      const {
        data: {
          federatedLoginInfo: { scope },
        },
      } = await apolloClient.query({
        query: GET_FEDERATED_LOGIN_INFO,
        variables: {
          clientType: getClientType,
          provider: "Facebook",
        },
      })
      const accessToken = await login({ scope })
      await connectFacebookAccount({
        variables: {
          accessToken,
        },
      })
    } catch (error) {
      onError(error)
    }
  }
  return { onConnectFacebook }
}
