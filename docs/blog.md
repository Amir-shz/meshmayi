# Blog

Local demo article: `node scripts/seed-demo-blog.cjs --local-image` creates one published article at `/blog/demo-zarsazan-car-guide` in the local `meshmayi` database. Existing demo content is preserved on subsequent runs. Without the flag, its photograph is uploaded to Liara. The local option uses the explicitly allowed bundled `/images/hero-mercedes.jpg`; arbitrary local image paths remain rejected.

- Public: `/blog`, `/blog/[slug]`. Admin: `/dashboard/blog`, `/dashboard/blog/comments`.
- Uses the existing MongoDB, admin session, `JWT_SECRET`, and Liara S3 credentials. Set `SITE_URL` to the public website origin; otherwise the origin of `NEXT_PUBLIC_BASE_URL` is used.
- No existing product or comment collections are migrated. New collections hold blog posts, blog comments, votes and expiring request counters. MongoDB must allow creating collections and indexes; unique indexes protect slugs and browser votes.
- Drafts and logically deleted posts are private. Slugs are generated from the title on the server and cannot be edited manually. A slug becomes immutable after first publication. Category is a plain text field. Deleted posts retain their records and uploaded images; there is no automatic storage deletion.
- Tiptap is loaded only by the admin editor. Public content is rendered on the server from validated JSON. Uploads accept JPEG/PNG/WebP up to 5 MiB, decode and re-encode to WebP, strip metadata and constrain output dimensions to 2000 × 2000 pixels.
- Image uploads distinguish invalid files (400), missing storage settings (500), storage permission errors (502), and Liara network failures (503). The S3 client has bounded connection/request timeouts and one retry. A TLS `ECONNRESET` even from an unauthenticated HTTPS request indicates a network/provider connection problem; upload code cannot restore that connection.
- Votes use a signed, HttpOnly, SameSite cookie. Cookies must be enabled. A browser can update its vote, but clearing its cookie or using another browser permits another vote. Votes are limited to 10 requests/minute per browser; comments to 5/minute. Both limits are stored in MongoDB.
- Changes are saved manually. Editing a published post updates its public version only on explicit save. Save failures preserve the editor contents. Unsaved changes warn on page unload and link navigation.

## Checks

```powershell
node scripts/test-blog.cjs
node scripts/test-blog-database.cjs
node scripts/test-comments.cjs
node scripts/test-product-detail.cjs
npx tsc --noEmit
```

The database integration script needs an installed `mongod`. It defaults to the Windows MongoDB 8.0 installation; set `MONGOD_BINARY` for another location. It chooses a free port and a new temporary directory and never uses the project's database. Temporary database files remain under the OS temp directory for inspection.

For browser QA against isolated fixtures, run `node scripts/test-blog-database.cjs --preview`. It starts Next.js on port 3100 with a temporary database and local test credentials `blog-preview-admin` / `blog-preview-local-only`. Use `http://localhost:3100` for dashboard sign-in (the existing admin session uses Secure cookies). It overrides the project's database and authentication settings only in its child process and uses `.next-blog-preview` for compilation to avoid interfering with an existing dev server. Stop with Ctrl+C. The fixtures are not shipped to the production database. Liara upload checks should be run with a test bucket; automated image tests do not contact storage.
