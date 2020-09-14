import { SnapshotIn } from "mobx-state-tree"
import { ActivePartyModel } from "../../app/models/active-party"
import { defaultStoryStore, storyStore } from "../storybook"
import * as R from "ramda"
import { storyUserId } from "./users"
import { AudienceUser } from "../../app/models/audience-user"
import { loremWords } from "../lorem"
import { StickerSnapshotIn } from "../../app/models/sticker"

const id = "test-party-id"

const defaultParty = {
  id,
  userId: "user-1",
  media: { uri: "youtube://L_LUpnjgPso_XXX" },
  features: { songQueue: true },
}

/**
 * Creates a Party snapshot
 * @param userId the user Id
 */
export const storyParty = (userId: string) => ({
  id: `party-${userId}`,
  userId,
  media: { uri: "youtube://L_LUpnjgPso_XXX" },
})

/**
 * Creates a User snapshot for a story user
 * @param i the index of the user
 * @param message
 * @param local
 */
export const storyAudienceUser = (
  i: number,
  message?: string,
  local = false,
): SnapshotIn<AudienceUser> => ({
  userId: storyUserId(i, local),
  mojiId: `test${1 + (i % 10)}`,
  name: local ? "Local User" : `User ${i}`,
  message,
})

/**
 * Creates a map of audience users for a story
 * @param count the number of users
 * @param message the message for the users
 * @param local whether all users are local
 */
const storyAudienceUsers = (count: number, message = undefined, local = false) =>
  R.fromPairs(R.map(i => [storyUserId(i), storyAudienceUser(i, message, local)], R.range(1, count)))

export const storyGift = (id: number, tier: number, name = "Helicopter") => ({
  id: `gift-${id}`,
  sticker: {
    id: "sticker-id",
    url: `https://api.adorable.io/avatars/144/tier-${tier}.png`,
    name,
    cost: { amount: 9999 },
    tier: tier,
  },
  user: `user-${2 + tier}`,
})

/**
 * Creates a song request
 * @param index the index
 */
export const storySongRequest = (index: number) => ({
  id: `song-request-${index}`,
  artist: loremWords(1 + (index % 2)),
  track: loremWords(2 + (index % 3)),
  donated: 6372,
  requests: 14,
})

/**
 * Creates data for a sticker
 * @param index the index
 */
export const storySticker = (index: number): StickerSnapshotIn => ({
  id: `sticker-${index}`,
  url: `https://api.adorable.io/avatars/144/index-${index}.png`,
  name: "Sticker Name",
  cost: { amount: (index + 1) * 25 },
  tier: index % 3,
})

/**
 * Creates a story that contains an ActiveParty, with some users
 * @param activeParty additional ActiveParty data to merge in
 */
export const storyActivePartyStore = (activeParty?: Partial<SnapshotIn<typeof ActivePartyModel>>) =>
  storyStore({
    ...defaultStoryStore,
    presenceStore: {
      concurrency: {
        "host.user-1": 14382726,
      },
    },
    partyStore: {
      active: {
        party: {
          ...defaultParty,
        },
        audience: {
          partyId: "test-party-id",
          users: storyAudienceUsers(25),
        },
        queue: { songs: R.map(storySongRequest, R.range(0, 4)) },
        gifts: {
          stickers: R.mergeAll(
            R.map(
              (sticker: StickerSnapshotIn) => ({ [sticker.id]: sticker }),
              R.map(storySticker, R.range(1, 15)),
            ),
          ),
        },
        ...activeParty,
      },
      browser: {
        top: {
          sort: "views",
          parties: R.map(i => storyParty(`user-${i}`), R.range(1, 8)),
        },
      },
    },
  })
