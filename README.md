# KisanSetu

Free, static, hackathon-ready farmer companion. It runs with no build step and no paid services.

## What works now

- Local sign-up, sign-in, and sign-out; accounts and session persist in the browser.
- Kannada, Hindi, and English UI switching.
- Browser voice input where supported.
- Live free weather using [Open-Meteo](https://open-meteo.com/) (with an offline fallback).
- Crop guidance, market net-profit comparison, transport pool, service, insurance-evidence, and farm-diary interactions.

## Publish free on GitHub Pages

1. Create an empty public GitHub repository named `kisansetu`.
2. Upload **all files inside this folder** to the repository root.
3. In the repository, open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Your free URL will be `https://YOUR-USERNAME.github.io/kisansetu/`.

## Publish free on Vercel

1. Create a free Vercel account with GitHub.
2. Import the GitHub repository.
3. Leave the framework setting as **Other** and click **Deploy**.

## Important production note

The current browser-only login is suitable for a hackathon demo, not real farmer data: passwords are stored only in that browser. For a production launch, connect a free Supabase project for secure authentication and cloud records; use its free tier within its usage limits.

Never present the crop scan as a diagnosis or pesticide recommendation. Require a verified agronomist workflow before offering treatment instructions.
