import { client, isConfigured } from './sanity'
import type { SiteSettings, Work, PressItem, Page } from './types'

async function load<T>(fallback: T, query: string) {
  if (!isConfigured) return fallback
  try {
    return await client.fetch<T>(query)
  } catch (error) {
    console.warn('Could not reach Sanity:', (error as Error).message)
    return fallback
  }
}

export const getSettings = () =>
  load<SiteSettings | null>(null, `*[_type == "siteSettings"][0]`)

export const getWorks = () =>
  load<Work[]>(
    [],
    `*[_type == "work" && defined(slug.current)]
     | order(coalesce(order, 9999) asc, year desc) {
       _id, title, slug, "side": coalesce(side, "mural"), featured, images, year, medium,
       dimensions, description, client, place, status, seoDescription
     }`,
  )

export const getPress = () =>
  load<PressItem[]>([], `*[_type == "pressItem"] | order(date desc)`)

export const getPages = () =>
  load<Page[]>(
    [],
    `*[_type == "page" && defined(slug.current)] | order(coalesce(order, 9999) asc)`,
  )
