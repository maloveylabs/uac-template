import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { SanityImage } from './types'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID

export const isConfigured = Boolean(projectId)

export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}

// Sanity keeps the pixel size in the asset id, so the browser can reserve the
// right space before the photo arrives.
export function sizeOf(source: SanityImage) {
  const match = String(source?.asset?._ref ?? '').match(/-(\d+)x(\d+)-/)
  if (!match) return null
  return { width: Number(match[1]), height: Number(match[2]) }
}
