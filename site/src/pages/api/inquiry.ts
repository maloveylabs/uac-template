import type { APIRoute } from 'astro'
import { createClient } from '@sanity/client'

export const prerender = false

const writeClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: import.meta.env.SANITY_WRITE_TOKEN,
})

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData()
  const name = String(form.get('name') ?? '').trim()
  const email = String(form.get('email') ?? '').trim()
  const message = String(form.get('message') ?? '').trim()

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response('Invalid submission', { status: 400 })
  }

  try {
    await writeClient.create({
      _type: 'inquiry',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })
    return new Response('OK', { status: 200 })
  } catch {
    return new Response('Could not save message', { status: 500 })
  }
}
