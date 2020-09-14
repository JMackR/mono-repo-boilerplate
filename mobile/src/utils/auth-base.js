import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
//import { graphql, compose, withApollo } from "react-apollo"
import { useQuery, useApolloClient } from "@apollo/react-hooks"
import { has } from "lodash"
import CURRENT_USER_DETAILS_QUERY from "../graphql/GetCurrentUserData.graphql"
import CURRENT_AUTH_USER from "../graphql/client/CurrentAuthUser.graphql"

/**
    TODO :: OVER HAUL THIS ENTIRE FILE TO USE THE AUTHUSER RESOVLER
    // THIS WILL GUARANTEE WE ARE ALWAYS AUTHENTICATED
    // ALL MAIN AUTHENTICATED COMPONENTS SHLD BE WRAPPED IN
    withLoadedUser not profileHoc.

**/

function withUser(Component, fetchPolicy = "no-cache") {
  const WithUser = ({ ...props }) => {
    const client = useApolloClient()
    const { loading: currentUserLoading, error, data, refetch } = useQuery(CURRENT_AUTH_USER, {
      fetchPolicy: "no-cache",
    })
    const { loading: loadingCurrentUserData, error: currentUserDataError, data: _data } = useQuery(
      CURRENT_USER_DETAILS_QUERY,
      {
        skip: !(has(data, "authUser") && data?.authUser?.email),
        variables: { email: data?.authUser?.email },
      },
    )
    // console.log("WHAT IS THE AUTH USER HERE::", data)
    // console.log("WHAT IS THE Current user DATA  HERE::", _data)

    //TODO: add a full page loading screen here
    return currentUserLoading || loadingCurrentUserData ? (
      <View style={{ flex: 1 }} />
    ) : (
      <Component
        client={client}
        currentUserLoading={currentUserLoading}
        currentUser={data?.authUser}
        refetchCurrentUser={refetch}
        loadingCurrentUserData={loadingCurrentUserData}
        currentUserData={_data?.getCurrentUserData}
        currentUserDataError={currentUserDataError}
        {...props}
      />
    )
  }
  return WithUser
}

const withLoadedUser = (Component, fetchPolicy = "no-cache") => {
  const WithLoadedUser = ({ currentUserLoading, ...props }) => {
    if (currentUserLoading) {
      return null
    }
    return <Component currentUserLoading={currentUserLoading} {...props} />
  }
  WithLoadedUser.propTypes = {
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool.isRequired,
  }
  return withUser(WithLoadedUser, fetchPolicy)
}

export { withUser, withLoadedUser }
