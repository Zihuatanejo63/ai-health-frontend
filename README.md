# HealthMatchAI Frontend

Next.js frontend for HealthMatchAI, an AI symptom triage, care decision, and insurance navigation MVP.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Production URLs

- Main site: `https://healthmatchai.com`
- API base URL: `https://api.healthmatchai.com`

## Pages

- `/` AI symptom triage, care level finder, and insurance navigation
- `/result` care decision summary with paid tool entry points
- `/doctors` redirects to `/`
- `/privacy` Privacy Policy
- `/terms` Terms of Service
- `/medical-disclaimer` Medical Disclaimer
- `/emergency` Emergency Notice
- `/cookies` Cookie Policy
- `/payment-success` hosted payment success return page
- `/payment-cancelled` hosted payment cancel return page

## Environment

Set this in Cloudflare Pages:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.healthmatchai.com
```
