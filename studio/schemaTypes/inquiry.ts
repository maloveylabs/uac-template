import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export default defineType({
  name: 'inquiry',
  title: 'Inbox',
  type: 'document',
  icon: EnvelopeIcon,
  description: 'Messages sent through your contact form.',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Message', type: 'text', readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Received', type: 'datetime', readOnly: true }),
    defineField({
      name: 'handled',
      title: 'Replied to',
      type: 'boolean',
      description: 'Tick this once you have answered.',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'newest', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email', handled: 'handled' },
    prepare: ({ title, subtitle, handled }) => ({
      title: `${handled ? '✓ ' : ''}${title ?? 'Unknown'}`,
      subtitle,
    }),
  },
})
