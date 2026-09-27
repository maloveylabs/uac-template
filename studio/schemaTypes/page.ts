import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: DocumentIcon,
  description: 'Extra pages like a CV, services, or anything else you want.',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      description: 'Example: CV, Services, Studio Visits.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Click Generate. A page called CV becomes yoursite.com/cv.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showInMenu',
      title: 'Show in the menu',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Menu position',
      type: 'number',
      description: 'Lower numbers come first.',
    }),
    defineField({
      name: 'heading',
      title: 'Big heading',
      type: 'string',
      description: 'The large line on the page. Leave empty to use the page title.',
    }),
    defineField({
      name: 'intro',
      title: 'Line under the heading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      description: 'The small labelled list down the side. Example: Based in — Ottawa, Ontario.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Optional. Shown beside the text.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Describe this image',
          type: 'string',
          description: 'Read aloud by screen readers and used by search engines. Example: "Manuel painting a mural on a brick wall".',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'Search engine description',
      type: 'text',
      rows: 2,
      description: 'The sentence Google shows under this page. Keep it under 160 characters.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({ name: 'body', title: 'Page content', type: 'blockContent' }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title, subtitle: `/${slug ?? ''}` }),
  },
})
