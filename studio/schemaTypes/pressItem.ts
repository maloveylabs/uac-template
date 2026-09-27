import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'pressItem',
  title: 'Press',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publication',
      title: 'Where it appeared',
      type: 'string',
      description: 'Example: CBC Ottawa, Apartamento, a friend’s newsletter.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'url', title: 'Link', type: 'url' }),
    defineField({
      name: 'excerpt',
      title: 'Quote or summary',
      type: 'text',
      rows: 3,
      description: 'Optional. A line worth pulling out.',
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', publication: 'publication', date: 'date' },
    prepare: ({ title, publication, date }) => ({
      title,
      subtitle: [publication, date?.slice(0, 4)].filter(Boolean).join(' · '),
    }),
  },
})
