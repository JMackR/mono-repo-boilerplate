import React from "react"
import { validate } from "./validate-media"
import moment from "moment"
import { Transform } from "../../screens/media-creation-screen/graphql-transform"
import { Alert } from "react-native"
import saveMutation from "./save-media-mutation"

const SaveMedia = async ({ status, currentUserData, media, media_sub_type }) => {
  const {
    first_name,
    last_name,
    id,
    tribeInfo: { id: entity_id },
  } = currentUserData
  const { title, content, picture, thumbnail, sub_topics, scheduled_date } = media
  const mediaObj = {
    title,
    content,
    picture,
    thumbnail,
    sub_topics,
    author: `${first_name} ${last_name}`,
    status: status.toLowerCase(),
    user_id: id,
    company_id: entity_id,
    story_type: media_sub_type,
  }
  if (status === "PUBLISHED") {
    mediaObj.published_date = moment(scheduled_date, "MM/DD/YYYY h:mm A")
      .utc()
      .format()
  } else if (status === "SCHEDULED") {
    mediaObj.scheduled_date = moment(scheduled_date, "MM/DD/YYYY h:mm A")
      .utc()
      .format()
  }
  //console.log("STORY:::", Transform(story, "story"))
  // const offlineSuccess = await this.OfflineManager.saveContentOffline(
  //   "stories",
  //   story
  // );
  // console.log("OFFLINE SUCCES", offlineSuccess);
  // if (offlineSuccess)
  //   if (this.props.connection.type === "wifi") {
  //     this.props.navigation.navigate("ConfirmationMessage", {
  //       message: "YOUR STORY HAS BEEN SAVED AS A DRAFT",
  //       image: "create-drafts-16.png"
  //     });

  //     return;
  //   }
  try {
    const success = await createMedia(Transform(story, "story"))
    const {
      data: { createMedia },
    } = success
    Alert.alert(
      `Your ${createMedia.media.media_type} was successfully ${createMedia.media.publication_status}`,
      ``,
      [
        {
          text: "Ok",
          onPress: () => {
            this.props.navigation.navigate("Home")
          },
        },
      ],
      { cancelable: false },
    )
  } catch (e) {
    Alert.alert(
      "Oops",
      `\n Oops something went wrong,
         \n\n try again
         \n\n ${e}`,
      [
        {
          text: "Ok",
          onPress: () => {
            console.log("CLOSE")
          },
        },
      ],
      { cancelable: false },
    )
    console.log("WE HAVE AN ERROR POSTING", e)
    throw e
  }
}
export default saveMutation(SaveMedia)
