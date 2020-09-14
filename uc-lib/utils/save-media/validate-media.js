import { Alert } from "react-native"

function validate(key, data) {
  if (data) {
    const validation = {
      picture: data.length > 0,
      title: data.length > 0,
      sub_topics: data.length > 0,
    }
    return validation[key]
  }
  return null
}

export const checkStatus = ({ key, keys, media }) => {
  const publishMethods = {
    publish: async () => {
      await this.saveMedia("PUBLISHED")
    },
    schedule: async () => {
      await this.saveMedia("SCHEDULED")
    },
  }

  const mediaCheck = {
    ...media,
  }
  // const keys = ["title", "picture", "sub_topics"]
  let dataIsValid = false
  for (let i = 0; i < keys.length; i++) {
    const data = mediaCheck[keys[i]]
    const validated = validate(keys[i], data)
    if (validated) {
      dataIsValid = true
    } else {
      Alert.alert(
        "Oops",
        `\n Your Story is missing ${keys[i]}? \n\n Would you like to fix this?`,
        [
          {
            text: "Ok",
            onPress: () => {
              // this.props.navigation.navigate("MemeMetaTags")
            },
          },
        ],
        { cancelable: false },
      )
      // TODO: let dumbass know what they didn't do
      return
      // throw some error
    }
  }
  if (dataIsValid) {
    return publishMethods[key]()
  }
}
