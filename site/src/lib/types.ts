import type { PortableTextBlock } from '@portabletext/to-html'

export type Side = 'mural' | 'studio'

export const SIDE_LABELS: Record<Side, string> = { mural: 'Mural', studio: 'Studio' }

export type SanityImage = {
  asset: { _ref: string }
  alt?: string
  caption?: string
}

export type SiteSettings = {
  siteName: string
  artistName?: string
  seoDescription?: string
  socialImage?: SanityImage
  tagline?: string
  intro?: string
  availableFor?: string
  email?: string
  socials?: { label: string; url: string }[]
}

export type Work = {
  _id: string
  title: string
  slug: { current: string }
  side: Side
  featured?: boolean
  images?: SanityImage[]
  year?: string
  medium?: string
  dimensions?: string
  description?: PortableTextBlock[]
  client?: string
  place?: string
  seoDescription?: string
  status?: string
}

export type PressItem = {
  _id: string
  title: string
  publication: string
  date?: string
  url?: string
  excerpt?: string
}

export type Page = {
  _id: string
  title: string
  slug: { current: string }
  showInMenu?: boolean
  order?: number
  heading?: string
  intro?: string
  details?: { label: string; value: string }[]
  image?: SanityImage
  seoDescription?: string
  body?: PortableTextBlock[]
}
