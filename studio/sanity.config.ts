import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { CogIcon, ImageIcon, BookIcon, DocumentIcon, EnvelopeIcon } from '@sanity/icons'
import { schemaTypes } from './schemaTypes'
import { sides } from './schemaTypes/work'

export default defineConfig({
  name: 'default',
  title: 'Murillo',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Murillo')
          .items([
            S.listItem()
              .title('Site Settings')
              .icon(CogIcon)
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            ...sides.map(({ id, title }) =>
              S.listItem()
                .id(id)
                .title(title)
                .icon(ImageIcon)
                .child(
                  S.documentTypeList('work')
                    .title(title)
                    .filter('_type == "work" && side == $side')
                    .params({ side: id })
                    .initialValueTemplates([S.initialValueTemplateItem(`work-${id}`)]),
                ),
            ),
            S.documentTypeListItem('pressItem').title('Press').icon(BookIcon),
            S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),
            S.divider(),
            S.documentTypeListItem('inquiry').title('Inbox').icon(EnvelopeIcon),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter((t) => !['siteSettings', 'work'].includes(t.id)),
      ...sides.map(({ id, single }) => ({
        id: `work-${id}`,
        title: single,
        schemaType: 'work',
        value: { side: id },
      })),
    ],
  },

  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'inquiry'),
  },
})
