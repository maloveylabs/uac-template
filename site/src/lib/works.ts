import type { Side, Work } from './types'

// How many pieces the Murals and Studio pages show before sending people to the Gallery.
export const REEL_LIMIT = 10

export const withImages = (works: Work[]) => works.filter((work) => work.images?.length)

// Featured pieces lead; if none are ticked in Sanity, show the first few anyway.
export function forSide(works: Work[], side: Side) {
  const pieces = withImages(works).filter((work) => work.side === side)
  const featured = pieces.filter((work) => work.featured)
  const shown = (featured.length ? featured : pieces).slice(0, REEL_LIMIT)
  return { shown, hasMore: pieces.length > shown.length }
}
