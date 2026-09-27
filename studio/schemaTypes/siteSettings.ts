import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      description: 'Shown in the header, the homepage headline and browser tabs.',
      validation: (Rule) => Rule.required(),
      group: 'basics',
    }),
    defineField({
      name: 'artistName',
      title: 'Artist name',
      type: 'string',
      description: 'Shown as "By …" under the site name.',
      group: 'basics',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Search engine description',
      type: 'text',
      rows: 2,
      description: 'The sentence people see under your site name in Google. Keep it under 160 characters.',
      validation: (Rule) => Rule.max(160),
      group: 'basics',
    }),
    defineField({
      name: 'tagline',
      title: 'Small line above the headline',
      type: 'string',
      group: 'basics',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 2,
      description: 'One or two sentences under the headline.',
      group: 'basics',
    }),
    defineField({
      name: 'socialImage',
      title: 'Sharing image',
      type: 'image',
      description: 'Shown when a link to the site is posted on social media. A strong mural works well.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Describe this image',
          type: 'string',
          description: 'Read aloud by screen readers and used by search engines.',
        },
      ],
      group: 'basics',
    }),
    defineField({
      name: 'availableFor',
      title: 'What you are open to',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      validation: (Rule) => Rule.email(),
      group: 'contact',
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Name', type: 'string', description: 'Example: Instagram' },
            { name: 'url', title: 'Link', type: 'url' },
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
