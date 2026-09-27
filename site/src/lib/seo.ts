import { urlFor } from './sanity'
import { SIDE_LABELS, type SanityImage, type SiteSettings, type Work } from './types'

export const shareImage = (image?: SanityImage) =>
  image ? urlFor(image).width(1200).height(630).fit('crop').url() : undefined

export const personSchema = (settings: SiteSettings, origin: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: settings.artistName ?? settings.siteName,
  alternateName: settings.siteName,
  jobTitle: 'Muralist and painter',
  description: settings.seoDescription ?? settings.tagline,
  url: origin,
  email: settings.email,
  sameAs: settings.socials?.map((social) => social.url),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ottawa',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
})

export const artworkSchema = (work: Work, settings: SiteSettings, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'VisualArtwork',
  name: work.title,
  url,
  artform: SIDE_LABELS[work.side],
  artMedium: work.medium,
  dateCreated: work.year,
  locationCreated: work.place,
  description: work.seoDescription,
  image: work.images?.map((image) => urlFor(image).width(1600).url()),
  creator: {
    '@type': 'Person',
    name: settings.artistName ?? settings.siteName,
  },
})
