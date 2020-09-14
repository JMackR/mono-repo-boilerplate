import { LoremIpsum } from "lorem-ipsum"
import seedrandom from "seedrandom"

const randomLorem = new LoremIpsum()
const predictableLorem = (count: any) =>
  new LoremIpsum({ seed: "predictable", random: seedrandom(`predictable-${count}`) })

/**
 * Generates words
 * @param count the number of words
 * @param random whether this is randomized (defaults to predictable)
 */
export const loremWords = (count?: number, random?: boolean): string =>
  (!random ? predictableLorem(count) : randomLorem).generateWords(count)

/**
 * Generates sentences
 * @param count the number of words
 * @param random whether this is randomized (defaults to predictable)
 */
export const loremSentences = (count?: number, random?: boolean): string =>
  (!random ? predictableLorem(count) : randomLorem).generateSentences(count)

/**
 * Generates paragraphs
 * @param count the number of words
 * @param random whether this is randomized (defaults to predictable)
 */
export const loremParagraphs = (count?: number, random?: boolean): string =>
  (!random ? predictableLorem(count) : randomLorem).generateParagraphs(count || 1)
