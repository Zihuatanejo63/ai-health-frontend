# AI Health Match Frontend

Next.js frontend for AI Health Match.

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

- `/` symptom input
- `/result` AI result display
- `/doctors` mock doctor list with filters and hosted payment entry
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
