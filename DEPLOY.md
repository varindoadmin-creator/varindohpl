# Deploying to Cloud Run

The site is a Next.js server (App Router, API routes, ISR), so it runs as a
container rather than as static files. `next.config.mjs` emits a standalone
build; the `Dockerfile` packages it.

It runs in the same project as `varindo.co.id` (the `varindo-catalog`
service), set up the same way.

```bash
PROJECT=via-production-504006
REGION=asia-southeast1          # Cloud Run domain mappings don't exist in asia-southeast2
SERVICE=varindohpl
```

## Deploying a change

```bash
gcloud run deploy $SERVICE --source . --region $REGION --project $PROJECT
```

`--source .` hands the repo to Cloud Build, which uses the `Dockerfile`.
Environment variables and secrets persist across deploys; they only need the
flags below on a fresh service.

## Service configuration

```bash
gcloud run deploy $SERVICE \
  --source . --region $REGION --project $PROJECT \
  --allow-unauthenticated \
  --memory 1Gi --cpu 1 --min-instances 0 --max-instances 5 \
  --set-env-vars "SMTP_HOST=smtp.gmail.com,SMTP_PORT=587,SMTP_USER=contact@varindo.co.id,VIABOOKS_API_URL=https://viabooks-601025884976.asia-southeast2.run.app,VIABOOKS_ORGANIZATION_ID=cmtn75jst0001w12y30bcrr6h" \
  --set-secrets "ANTHROPIC_API_KEY=ANTHROPIC_API_KEY:latest,SMTP_PASS=SMTP_PASS:latest"
```

- **`--min-instances 0`** — scales to zero when idle, so an idle site costs
  almost nothing. The first request after a quiet spell waits a second or two
  for a cold start.
- **`--memory 1Gi`** — `next/image` runs through sharp, and Cloud Run's
  filesystem is in-memory, so the ISR cache counts against this too.

Both secrets already exist in the project and are shared with the other
services.

**Price List requests** still write to Supabase (`src/app/api/submit-request`).
Until `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set, that form
returns "Submission service is not configured"; Sample and Catalogue requests
go to VIABooks and are unaffected. Once the Supabase project is confirmed:

```bash
gcloud run services update $SERVICE --region $REGION --project $PROJECT \
  --update-secrets "SUPABASE_URL=SUPABASE_URL:latest,SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY:latest"
```

## Verifying a deploy

```bash
URL=$(gcloud run services describe $SERVICE --region $REGION --project $PROJECT --format='value(status.url)')
for p in / /products /contact /price-list /sitemap.xml /robots.txt /.well-known/assetlinks.json; do
  curl -s -o /dev/null -w "$p %{http_code}\n" $URL$p
done
```

- [ ] Product pages and images load (`/_next/image` exercises sharp).
- [ ] AI chat replies (`/api/chat` → Anthropic).
- [ ] Sample and Catalogue requests reach VIABooks; the notification email arrives.
- [ ] Price List request is stored (once Supabase is configured).

## Domain

`varindohpl.com` is registered at Hostinger. The domain has no MX records,
so moving its DNS cannot affect email.

Point it at the service with a domain mapping for the apex and `www`, then
serve the records the mapping asks for — from a Cloud DNS zone, delegated
by changing the nameservers at Hostinger:

```bash
gcloud beta run domain-mappings create --service $SERVICE --domain varindohpl.com --region $REGION --project $PROJECT
gcloud beta run domain-mappings create --service $SERVICE --domain www.varindohpl.com --region $REGION --project $PROJECT
gcloud beta run domain-mappings describe --domain varindohpl.com --region $REGION --project $PROJECT \
    --format="yaml(status.resourceRecords)"
```

**Certificate trap** (hit during the `varindo.co.id` move): Google's first
certificate challenge fires within minutes of the mapping being created. If
DNS hasn't propagated by then, the retry can take over an hour. Once DNS is
confirmed propagated, delete and recreate the mapping to force a fresh
challenge.
