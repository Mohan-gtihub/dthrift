# Production Deployment Guide — dthrift

This project has two deployable apps:

| App | Stack | Hosted on |
|-----|-------|-----------|
| `backend/` | Rails + Spree (admin + Store API) | **Render** (native Ruby via `backend/render.yaml`) |
| `apps/storefront/` | Next.js 16 | **Vercel** |

> **Docker is for local dev only.** Production does not use Docker — Render builds the Rails app natively, Vercel builds the Next.js app natively.

---

## Order of operations

1. Push repo to GitHub
2. Deploy backend to Render → get backend URL
3. Seed DB + create admin + create a publishable API key (Render shell)
4. Deploy storefront to Vercel with the backend URL + publishable key

---

## 1. GitHub

The repo root is `dthrift/` (its own git repo). Push it to a new GitHub repo, e.g. `dthrift`.

```bash
gh repo create dthrift --private --source=. --remote=origin --push
# or, if you created the repo manually:
git remote add origin https://github.com/<you>/dthrift.git
git push -u origin main
```

---

## 2. Backend → Render (Blueprint)

`backend/render.yaml` defines: web service (Ruby), Postgres, Redis.

1. Render Dashboard → **New → Blueprint**
2. Connect the GitHub repo
3. **Set the Blueprint root to `backend/`** (the render.yaml lives there, not at repo root)
4. Render reads `render.yaml` and provisions:
   - `spree` web service — `bundle install && rails assets:precompile && rails db:prepare`, started with Puma
   - `spree-db` Postgres
   - `spree-redis` Redis
   - `SECRET_KEY_BASE` is auto-generated
5. Deploy. Health check is `/up`.

### Required env vars (auto-wired by render.yaml)
`DATABASE_URL`, `REDIS_URL`, `SECRET_KEY_BASE`, `RAILS_LOG_LEVEL` — all set automatically.

### Optional env vars to add in Render dashboard
- `RAILS_HOST` = your backend domain (for correct URL/email links)
- SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM_ADDRESS`) — otherwise emails are only logged
- S3 / Cloudflare R2 vars — **strongly recommended** (see "Free-tier caveats")

### Free-tier caveats (current `plan: free`)
- **No background worker.** Sidekiq is commented out in render.yaml, so async jobs (emails, webhooks) won't process. To enable: uncomment the `worker` block in render.yaml (requires a paid plan).
- **Service sleeps when idle** and cold-starts on next request.
- **Disk is ephemeral.** Uploaded product images on local disk are LOST on every redeploy/restart. → Configure S3 or Cloudflare R2 (`AWS_*` or `CLOUDFLARE_*` env vars) for persistent image storage before real use.

---

## 3. First-run data (Render Shell)

After the first successful deploy, open the `spree` service → **Shell**:

```bash
# Seed core data (countries, zones, store, default config)
bundle exec rails db:seed

# Create an admin user
bundle exec rails runner "Spree::User.create!(email: 'you@example.com', password: 'CHANGE_ME', password_confirmation: 'CHANGE_ME').tap{|u| u.spree_roles << Spree::Role.find_or_create_by(name: 'admin')}"

# (Optional) load sample products
bundle exec rake spree_sample:load

# Create a publishable API key for the storefront — COPY THIS for Vercel
bundle exec rails runner "puts Spree::OauthAccessToken rescue nil" # see Spree docs for your version's key cmd
```

> Admin login: `https://<backend>.onrender.com/admin`
> The publishable key is created in Admin → Settings → Developers → API keys if the CLI command differs by version.

---

## 4. Storefront → Vercel

1. Vercel → **Add New → Project** → import the same GitHub repo
2. **Root Directory: `apps/storefront`**
3. Framework preset: Next.js (auto-detected). Build: `next build`, output: standalone.
4. Set **Environment Variables**:

| Var | Value |
|-----|-------|
| `SPREE_API_URL` | `https://<backend>.onrender.com` |
| `SPREE_PUBLISHABLE_KEY` | the publishable key from step 3 |
| `NEXT_PUBLIC_SITE_URL` | your storefront URL |
| `NEXT_PUBLIC_STORE_NAME` | dthrift |
| `NEXT_PUBLIC_DEFAULT_COUNTRY` | `us` (match Spree store default) |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `en` |

Optional: `RESEND_API_KEY` + `EMAIL_FROM` (emails), `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (Stripe), `SENTRY_DSN` (errors), `NEXT_PUBLIC_BACKEND_IMAGE_HOST` (if you use a custom backend domain instead of `*.onrender.com`).

> **Build-time dependency:** the storefront prerenders pages by calling the Spree API, so the **backend must be live and reachable** when Vercel builds. Deploy backend first.

> **Images:** `next.config.ts` allows `*.onrender.com` image hosts. For a custom backend domain, set `NEXT_PUBLIC_BACKEND_IMAGE_HOST=api.your-store.com`.

---

## Production hardening checklist (before real traffic)
- [ ] Object storage (S3/R2) configured — local disk is ephemeral on Render
- [ ] Upgrade backend off free plan (no sleep) + enable Sidekiq worker
- [ ] SMTP configured (real emails)
- [ ] Custom domains + HTTPS (Render & Vercel both auto-issue certs)
- [ ] `RAILS_HOST` set so links/emails use the real domain
- [ ] Rotate the `SECRET_KEY_BASE` that was committed in local `.env` (it's gitignored, but it was on disk — generate a fresh one for prod; Render does this automatically)
- [ ] Strong admin password; remove the default `spree@example.com` user
- [ ] Stripe live keys (not `pk_test_`)
