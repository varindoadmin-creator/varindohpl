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

## Paused (since 13 Sep 2026)

Every URL on `varindohpl.com` and `www.varindohpl.com` redirects to
`https://varindo.co.id` with a temporary 307, set by the first rule in
`redirects()` in `next.config.mjs`. The service, domain mappings,
certificates, DNS records and Search Console verification all stay in place,
so resuming avoids the certificate wait described under Domain.

To resume: delete that rule, build, and deploy.

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
services. The site has no database of its own: Sample and Catalogue requests
go to VIABooks, whose organization ID is `VIABOOKS_ORGANIZATION_ID`.

## Verifying a deploy

```bash
URL=$(gcloud run services describe $SERVICE --region $REGION --project $PROJECT --format='value(status.url)')
for p in / /products /contact /request-sample /sitemap.xml /robots.txt /.well-known/assetlinks.json; do
  curl -s -o /dev/null -w "$p %{http_code}\n" $URL$p
done
```

- [ ] Product pages and images load (`/_next/image` exercises sharp).
- [ ] AI chat replies (`/api/chat` → Anthropic).
- [ ] Sample and Catalogue requests reach VIABooks; the notification email arrives.

## Domain

Live on Cloud Run since 13 Sep 2026. `varindohpl.com` is registered at
Hostinger, and Hostinger still serves its DNS (nameservers
`artemis.dns-parking.com` and `hermes.dns-parking.com`). The domain has no MX
records, so DNS changes cannot affect email.

Records at Hostinger (Domains → varindohpl.com → DNS / Nameservers):

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | `216.239.32.21`, `216.239.34.21`, `216.239.36.21`, `216.239.38.21` |
| CNAME | www  | `ghs.googlehosted.com` |
| TXT   | @    | `google-site-verification=…` |
| A     | ftp  | `46.202.138.17` (Hostinger's; the site doesn't use it) |

- **Keep the TXT record.** It keeps `varindohpl.com` verified in Search
  Console for contact@varindo.co.id, and Cloud Run domain mappings require
  the domain to stay verified for the account that manages them.
- **No AAAA records.** Cloud Run also lists
  `2001:4860:4802:{32,34,36,38}::15`; without them the site is IPv4-only,
  which every client can reach.
- **Hostinger quirks.** It rejects an A record on `@` while an ALIAS exists
  there, so the ALIAS has to be deleted first, and each additional A record
  on the same name asks for confirmation.

Both hosts are mapped to the service:

```bash
gcloud beta run domain-mappings describe --domain varindohpl.com --region $REGION --project $PROJECT \
    --format="yaml(status.conditions)"
```

**Certificate trap** (hit on both moves): Google's first certificate
challenge fires within minutes of a mapping being created. If DNS doesn't
point at Google by then, the retry can be an hour away and HTTPS stays down
meanwhile. Once DNS points at Google, delete and recreate the mapping to force
a fresh challenge; here both certificates issued about 20 minutes later.

**Rolling back to Hostinger** (while its Node.js app still exists): delete the
four A records, add `ALIAS @ → varindohpl.com.cdn.hstgr.net`, and set the
`www` CNAME back to `www.varindohpl.com.cdn.hstgr.net`. With 300s TTLs the old
site is back within about five minutes.
