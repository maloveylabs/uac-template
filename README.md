# UAC-Template

A template website for artists taking the Urban Art Collective course hosted by Malovey. 

This site is for your independent use and as a guide to follow along during the course. 

Built with [Astro](https://astro.build) (the website), [Sanity](https://sanity.io)
(where the work is added) and [Vercel](https://vercel.com) (what puts it online).

---

## What's in here

```
site/      The website (Astro)
studio/    The editor (Sanity)
```

---

## Setup

### 1. Start the editor

```bash
cd studio
npm install
npm run dev
```

Open http://localhost:3333.

### 2. Start the website

```bash
cd ../site
npm install
npm run dev
```

Open http://localhost:4321.

Both folders need a `.env` with the Sanity project id — see `site/.env.example`.

### 3. Put it online

Push your changes to GitHub, then go to [vercel.com](https://vercel.com) and
import the repository. Set the **root directory** to `site`, and add the same
two variables from your `.env` file. Click deploy.

### 4. Put the editor online

So you can add work from anywhere, without a terminal:

```bash
cd studio
npm run deploy
```

Pick a name and the editor lives at `thatname.sanity.studio`. It is private, so
only invited people can open it.

---

## Make it yours

The template ships with placeholder names. Swap them for your own before you
put it online:

| File | Change | To |
| --- | --- | --- |
| `site/astro.config.mjs` | `https://yoursite.com` | your real address |
| `site/public/robots.txt` | `https://yoursite.com` | your real address |
| `site/src/layouts/Base.astro` | `YOUR SITE NAME` | your site name |
| `studio/sanity.config.ts` | `UAC-Template` (twice) | your site name |
| `site/package.json`, `studio/package.json` | `uac-template` | anything, e.g. `jane-doe-site` |

Then open the editor, go to **Site Settings** and fill in your site name, your
name and the description. Those are what visitors and Google actually see; the
name in `Base.astro` only shows if Site Settings is empty.

Search the project for `yoursite`, `YOUR SITE` and `uac-template` to check
you got them all.

---

## What's on the site

| Page | What it is |
| --- | --- |
| `/` | Murals — featured murals, one photo at a time, with the list on the left |
| `/studio` | Studio — the same, for canvas and studio work |
| `/gallery` | Everything, as thumbnails grouped by year |
| `/work/…` | A single piece: details on the left, photos on the right |
| `/about` | Your story, with press at the bottom |
| `/contact` | Message form, email and Instagram |

---

## Changing how it looks

Everything is in one file: **`site/src/styles/theme.css`**. The variables at the
top control the whole site:

- `--color-bg`, `--color-ink`, `--color-accent` — taupe, near-black and tomato
- `--font-body` (Manrope) and `--font-serif` (Instrument Serif)
- `--gap`, `--gap-lg`, `--pad` — spacing; `--measure` — how wide the page gets

Change a value, save, and the site updates while `npm run dev` is running.

---

## Adding your work

In the editor:

- **Murals** and **Studio** — a piece belongs to one or the other. Add images
  (the first is the cover), a year, medium, size, who commissioned it, where it
  is, and whether it is available.
- Tick **Feature in the scrolling gallery** to put a piece on the Murals or
  Studio page. The first ten show there; everything else still appears under
  Gallery.
- **Press** — anywhere you have been written about. Shows at the end of About.
- **Pages** — the words on **About** and **Say hello** live here, so both can be
  rewritten any time: the big heading, the line under it, the small labelled
  details down the side, and the main text. Add a new page (a CV, services,
  studio visits) and it appears in the menu automatically.
- **Inbox** — messages sent through the contact form.

Hit **Publish** and it goes live.

---

## Making publishing automatic

The site is built ahead of time, so the words and images you see are baked in
when it deploys. Publishing in the editor does nothing on its own until the
site rebuilds. Set this up once and it rebuilds itself.

**1. Create the deploy hook in Vercel**

Settings → Git → Deploy Hooks. Name it `Sanity publish`, branch `main`, create
it, and copy the URL it gives you.

**2. Point Sanity at it**

[sanity.io/manage](https://sanity.io/manage) → your project → API → Webhooks →
Create webhook:

| Field | Value |
| --- | --- |
| Name | `Rebuild site` |
| URL | the deploy hook URL from step 1 |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["work", "siteSettings", "page", "pressItem"]` |
| HTTP method | `POST` |

The filter matters: without it, every image upload and draft keystroke queues a
build. With it, only publishing real content does.

**3. Try it**

Publish any change in the editor. Vercel shows a new deployment within seconds
and the live site updates in a minute or two.

Nothing else is needed — the site always reads live content at build time, so a
rebuild can never publish stale text.

---

## The contact form

Messages are saved to your **Inbox** in the editor. To turn it on, create a
token at [sanity.io/manage](https://sanity.io/manage) under **API → Tokens**
with **Editor** permissions, and add it to Vercel as `SANITY_WRITE_TOKEN`.

Without the token the rest of the site works fine — only the form is inactive.

---

## Your own domain

In Vercel, go to **Settings → Domains** and add it. Then open
`site/astro.config.mjs` and `site/public/robots.txt` and change the address to
match.

---

## Licence

MIT, plus a few plain-language terms (see [LICENSE](LICENSE)).

In short: free to use, copy and change, forever, for anything including
commercial work. It comes **as is**, with no warranty and no support. Your site,
your hosting, your content, your responsibility. Artwork and writing published
through it belong to whoever made them and are not covered by this licence.

---

Created by [Malovey](https://malovey.com?source=uac-template). If you need help, have questions, or want to chat contact me at hello@malovey.com.
