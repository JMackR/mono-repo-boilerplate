import React from "react"
import Analytics from "../../Analytics"
import { Alert } from "react-native"

// export function edit(props) {
//   // const { selectedMedia, lastRoute, media_sub_type, navigation } = props
//   // this.props.navigation.navigate(`Edit-${story_type}`, {
//   //   selectedMedia,
//   //   lastRoute: "user-story-view-bak",
//   // })
// }

// export const SheetOptions = (media, currentUserData, scope) => {
//   /* eslint-disable no-extend-native */
//   if (typeof Array.prototype.reIndexOf === "undefined") {
//     Array.prototype.reIndexOf = function(rx) {
//       for (const i in this) {
//         if (this[i].toString().match(rx)) {
//           return i
//         }
//       }
//       return -1
//     }
//   }
//   const displayOptionList = (media, user, scope) => {
//
//     const displayUserOptions = scope => {
//       const options = {
//         self: ["Bookmark", "Report", "Delete", "Edit", "Cancel"],
//         user: ["Bookmark", "Report", "Cancel"],
//       }
//       const toggleOptionState = () => {
//         if (media.is_bookmarked) {
//           const bookmarkIdx = options[scope].reIndexOf(/Bookmark/g)
//           options[scope].splice(bookmarkIdx, 1, "Remove Bookmark")
//         }
//         return options[scope]
//       }
//       return toggleOptionState()
//     }
//
//     const displayAdminOptions = scope => {
//       const options = {
//         self: ["Bookmark", "Report", "Feature", "Edit", "Delete", "Cancel"],
//         user: ["Bookmark", "Report", "Feature", "Cancel"],
//       }
//       const toggleOptionState = () => {
//         const featuredIdx = options[scope].reIndexOf(/Feature/g)
//         if (media.is_bookmarked) {
//           const bookmarkIdx = options[scope].reIndexOf(/Bookmark/g)
//           options[scope].splice(bookmarkIdx, 1, "Remove Bookmark")
//         }
//         if (media.is_featured) {
//           options[scope].splice(featuredIdx, 1, "Remove Feature")
//         }
//         return options[scope]
//       }
//       return toggleOptionState()
//     }
//
//     const determineRoleOptions = role => {
//       if (role === "tribe_user") {
//         return displayUserOptions(scope)
//         // return []
//       }
//       return displayAdminOptions(scope)
//     }
//
//     return determineRoleOptions(currentUserData.role)
//   }
//   return displayOptionList(media, currentUserData, scope)
// }
//
const triggerAlert = (pressedYes, title) => {
  Alert.alert(
    title || "Are you sure?",
    "This action cannot be undone.",
    [
      {
        text: "No",
        onPress: () => console.log("Pressed No"),
        style: "cancel",
      },
      { text: "Yes", onPress: pressedYes },
    ],
    { cancelable: false },
  )
}

export const MediaActions = sheetOptions => {
  const that = {}
  const options = sheetOptions
  const editMedia = (navigation, media, user_id) => {
    if (media.media_type === "story" && media.media_sub_type === "default_template") {
      console.log("what is the navigate story", media.media_sub_type)
      navigation.navigate("Edit-story", {
        id: media.id,
        uuid: media.uuid,
      })
    } else if (media.media_type === "story" && media.media_sub_type === "title_image") {
      console.log("what is the navigate MEME", media.media_sub_type)
      navigation.navigate("Edit-meme", {
        id: media.id,
        uuid: media.uuid,
      })
    } else {
      navigation.navigate(`Edit-${media.media_type}`, {
        id: media.id,
        uuid: media.uuid,
      })
    }
  }

  const deleteMedia = async (mutation, media, user_id, client) => {
    triggerAlert(async () => {
      try {
        const { id, uuid, entity_type, entity_id } = media
        const data = await client.mutate({
          mutation: mutation,
          variables: { id, uuid },
          refetchQueries: ["allMedia"],
        })
        // console.log("DATA RETURN DELETE MEDIA::", data)
      } catch (err) {
        console.log("error deleting media", err)
      }
    }, "Are you sure you want to delete this content?")
  }

  const reportMedia = async (mutation, media, user_id, client) => {
    triggerAlert(async () => {
      const { id: media_id, uuid: media_uuid, entity_type, entity_id } = media
      const input = { media_id, media_uuid, entity_type, entity_id, reporter_id: user_id }
      try {
        const data = await client.mutate({
          mutation: mutation,
          variables: { input },
          // refetchQueries: ["allMedia"],
        })
        // console.log("DATA FOR REPORTED::", data)
      } catch (error) {
        console.log("error reorting media", error)
      }
    }, "Are you sure you want to report this content?")
  }

  const featureMedia = async (mutation, media, user_id, client) => {
    try {
      const { id: media_id, uuid: media_uuid, entity_id, entity_type } = media
      const input = { media_id, media_uuid, entity_id, entity_type }
      const data = await client.mutate({
        mutation: mutation,
        variables: { input },
        refetchQueries: ["allMedia"],
      })
      // console.log("DATA::::", data)
    } catch (error) {
      console.log("ERROR FEATURING:::", error)
    }
  }
  const unFeatureMedia = async (mutation, media, user_id, client) => {
    try {
      const data = await client.mutate({
        mutation: mutation,
        variables: { media_uuid: media.uuid },
        refetchQueries: ["allMedia"],
      })
    } catch (e) {
      console.log("ERROR UN FEATURING MEDIA::", e)
    }
  }
  const createBookmark = async (mutation, media, user_id, client) => {
    try {
      const { id, uuid, entity_id, entity_type } = media
      // TODO will need to update usersbook marks in cache of apollo
      const data = await client.mutate({
        mutation: mutation,
        variables: { input: { user_id, media_id: id, media_uuid: uuid, entity_id, entity_type } },
        refetchQueries: ["allMedia"],
      })
    } catch (e) {
      console.log("ERR::", e)
    }
  }

  const deleteBookmark = async (mutation, media, user_id, client) => {
    try {
      const data = await client.mutate({
        mutation: mutation,
        variables: { media_uuid: media.uuid, user_id },
        refetchQueries: ["allMedia"],
      })
      // console.log("data return from delete bookmark")
    } catch (e) {
      console.log("ERROR DELETING BOOKMARK", e)
    }
  }

  const handleActions = (actions, media, { id: user_id, tribeInfo: { slug } }, client, navigation) => idx => {
    switch (options[idx]) {
      case "Bookmark":
        return createBookmark(actions.createBookmark, media, user_id, client)
      case "Report":
        return reportMedia(actions.reportMedia, media, user_id, client)
      case "Delete":
        return deleteMedia(actions.deleteMedia, media, user_id, client)
      case "Edit":
        return editMedia(navigation, media, user_id)
      case "Cancel":
        return null
      case "Feature":
        return featureMedia(actions.featureMedia, media, user_id, client)
      case "Remove Bookmark":
        return deleteBookmark(actions.deleteBookmark, media, user_id, client)
      case "Remove Feature":
        return unFeatureMedia(actions.unFeatureMedia, media, user_id, client)
      default:
        return null
    }
  }

  that.handleActions = handleActions
  return that
}
export default MediaActions
