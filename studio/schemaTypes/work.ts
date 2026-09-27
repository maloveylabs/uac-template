import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const sides = [
  { id: 'mural', title: 'Murals', single: 'Mural' },
  { id: 'studio', title: 'Studio', single: 'Studio piece' },
]

const only = (side: string) => ({ parent }: { parent?: { side?: string } }) => parent?.side !== side

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon: ImageIcon,
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'images', title: 'Images' },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basics',
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Click Generate. This becomes the link to this piece.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'basics',
    }),
    defineField({
      name: 'side',
      title: 'Murals or Studio',
      type: 'string',
      options: { list: sides.map(({ id, title }) => ({ value: id, title })), layout: 'radio' },
      initialValue: 'mural',
      validation: (Rule) => Rule.required(),
      group: 'basics',
    }),
    defineField({
      name: 'featured',
      title: 'Feature in the scrolling gallery',
      type: 'boolean',
      description: 'The first ten featured pieces show on the Murals or Studio page. Everything else still appears on the Gallery page.',
      initialValue: false,
      group: 'basics',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'The first image is the one people see in your portfolio.',
      group: 'images',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Describe this image',
              type: 'string',
              description: 'Example: "A blue and ochre mural across a brick wall".',
              validation: (Rule) => Rule.required(),
            },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Example: 2024, or 2022–2024.',
      group: 'details',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'Example: Acrylic on canvas. Exterior latex on brick.',
      group: 'details',
    }),
    defineField({
      name: 'dimensions',
      title: 'Size',
      type: 'string',
      description: 'Example: 60 × 90 cm, or 12 m wide.',
      group: 'details',
    }),
    defineField({
      name: 'client',
      title: 'Commissioned by',
      type: 'string',
      hidden: only('mural'),
      group: 'details',
    }),
    defineField({
      name: 'place',
      title: 'Place name',
      type: 'string',
      description: 'Example: Bank Street, Ottawa.',
      hidden: only('mural'),
      group: 'details',
    }),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      options: { list: ['Available', 'Sold', 'Not for sale'], layout: 'radio' },
      hidden: only('studio'),
      group: 'details',
    }),
    defineField({
      name: 'description',
      title: 'About this piece',
      type: 'blockContent',
      group: 'details',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Search engine description',
      type: 'text',
      rows: 2,
      description: 'The sentence Google shows under this piece. Keep it under 160 characters. Leave empty to use the site description.',
      validation: (Rule) => Rule.max(160),
      group: 'details',
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers come first. Leave empty to sort by year.',
      group: 'details',
    }),
  ],
  orderings: [
    { title: 'Position', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Year (newest)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', year: 'year', media: 'images.0' },
    prepare: ({ title, year, media }) => ({ title, subtitle: year, media }),
  },
})
