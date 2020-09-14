import { graphql } from "react-apollo"
import { compose } from "recompose"
import CREATE_MEDIA_MUTATION from "../../graphql/create-media-mutation.graphql"

export default args => {
  return compose(
    graphql(CREATE_MEDIA_MUTATION, {
      props: ({ navigation, mutate }) => ({
        createMedia: async media => {
          const tag = { tag_id: 2, tag_name: "Creativity" }
          const merged = Object.assign({}, media, { media_tags: [tag] })
          try {
            const mediaResult = await mutate({
              variables: { input: { media: merged } },
              // update: (cache, { data }) => {
              //   const { createMedia } = data
              //   const variables = {
              //     filter: ["latest"],
              //     first: 10,
              //     offset: 0,
              //     condition: {
              //       publication_status: "published",
              //       date_range: [moment.utc().format()],
              //     },
              //     orderBy: ["published_date"],
              //     sortOrder: "desc",
              //   }
              //   const latest = cache.readQuery({ query: ALL_MEDIA_QUERY, variables })
              //
              //   console.log("LATEST CACHE &&&", latest)
              //
              //   // const merged = []
              // },
            })
            return mediaResult
          } catch (e) {
            console.log("STORY POSTING ERRIR", e)
          }
        },
      }),
    }),
  )
}
