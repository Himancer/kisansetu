# KisanSetu

[Open the live demo](https://himancer.github.io/kisansetu/)

KisanSetu is a free, static, hackathon-ready farm companion. It has no build step, no paid API, no server database and no third-party account requirement.

## What works now

- A browser-local farmer profile and private farm diary; signing out clears KisanSetu’s local data.
- Complete English, Hindi and Kannada switching across the dashboard, crop planner, benefits, knowledge, services and diary.
- Local forecast from Open-Meteo with an offline fallback and weather-aware daily guidance.
- State-specific official farmer-service links for Karnataka, Punjab, Uttar Pradesh, Maharashtra, West Bengal, Tamil Nadu and Rajasthan.
- Direct Government of India links for PM-KISAN, PMFBY, Farmers’ Portal and Soil Health Card.
- Crop planning that validates land size and returns localized crop names by soil, season and irrigation choice.
- Safe photo hand-off: a selected image is not diagnosed and no pesticide recommendation is made.
- A responsive, keyboard-friendly design with visible focus, reduced-motion support and a pausable carousel.

## Important prototype boundaries

The name entry is not a production login or cloud account. The app does not collect Aadhaar, bank details, passwords or scheme-login credentials. It does not make eligibility decisions, show real mandi prices, book providers or diagnose crop disease.

Before a production launch, add consented secure authentication, encrypted records, verified local data providers, agronomist review and farmer usability testing.

## Free deployment

The repository is already live on GitHub Pages. To deploy a fork for free, enable **Settings → Pages → Deploy from a branch**, select `main` and the repository root. `vercel.json` is included if you prefer Vercel’s free static hosting.
