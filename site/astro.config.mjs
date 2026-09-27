import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  // Change this to the real domain once it is connected.
  site: 'https://yoursite.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
})
