/**
 * Creates a user Id for stories
 * @param i the index of the user (id = `user-${i}`
 * @param local whether this is the local user (id = 'local')
 */
export const storyUserId = (i: number, local = false): string => (local ? "local" : `user-${i}`)
