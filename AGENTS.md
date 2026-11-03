# nodebox.net

- Eleventy 3 site; Node version in `.nvmrc`. Verify: `npm ci && npm run build`, then `npm run dev` and look at `/`, a blog post and a documentation page at phone and desktop width.
- Branch policy: commit straight to `master`. Deploy: none here; Cloudflare Pages builds and publishes every push to `master`. Check https://www.nodebox.net/ afterwards.
- Posts: one stream. `_posts/YYYY-MM-DD-<slug>.md` with `categories: blog`, `layout: blog`, `title`, `thumb` (a 420×210 image in `media/gallery/`). URL: `/<category>/YYYY/MM/DD/<slug>`. Post media go in `media/blog/<slug>/`.
- Front matter dates must be ISO 8601 (`2026-11-03T10:00:00+01:00`); Eleventy rejects Jekyll's `2026-11-03 10:00:00 +0100`.
- Markdown is markdown-it with indented code blocks disabled: use fenced code blocks.
- `code/` is the static NodeBox 1 wiki archive with its own fixed-width layout; heavy `code/data` files live on S3 (bucket `nodebox`).
- Old URLs stay alive through `_redirects`: `/gallery/*` (the former gallery) and the pre-2016 month-only permalinks `/<category>/YYYY/MM/<slug>/` point to `/blog/YYYY/MM/DD/<slug>`. Add a rule there when a URL moves.
