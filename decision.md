# KisanSetu — Product decisions

## Goal

Create a hackathon-ready, India-first farmer companion that connects the daily decisions across a crop cycle instead of offering disconnected tools.

## Product choices

| Decision | Choice | Reason |
|---|---|---|
| Primary user | Smallholder farmer | They most need accessible, joined-up guidance. |
| Primary interaction | Voice-first, low-literacy visual UI | Fits diverse language ability and on-field usage. |
| MVP languages | Kannada, Hindi, English | Relevant local start; credible, bounded hackathon scope. |
| Demo crop | Tomato | Familiar, visual, perishable, and ideal for crop-health plus mandi decisions. |
| Core value | “What should I do today?” | Makes the app useful rather than a directory of features. |
| Market view | Net profit after costs | A practical distinction from price-only mandi apps. |
| AI safety | Guidance with uncertainty and expert escalation | Avoids presenting pesticide advice as certain medical-style truth. |

## MVP boundaries

The product demonstrates the experience with realistic local sample data. Crop diagnosis, weather, mandi prices, logistics availability, and insurance eligibility require approved production data/API integrations before public deployment.

## Free-first technical decisions

| Need | Current implementation | Cost decision |
|---|---|---|
| Sign-up and login | Browser-local account and session | Free, works immediately; not suitable for multi-device production accounts. |
| Live weather | Open-Meteo public forecast endpoint | Free, no key required for normal use. |
| Voice input | Built-in browser Web Speech API when supported | Free; type fallback included. |
| Hosting | GitHub Pages or Vercel static hosting | Both have free plans suitable for a public hackathon demo. |
| Production authentication | Supabase free tier | Recommended next step before storing real farmer data. |

No paid API or subscription is required for the demonstration. Mandi pricing and crop diagnosis remain explicitly labelled as sample/safety-guided flows until verified sources and expert review are connected.

## September 12 product review

- Adopted the updated prototype’s regional weather picker, crop and fertiliser planner, expanded language menu, Kisan Gyan, farm services and feedback flow.
- Added a dedicated Government updates page with direct, clearly labelled official Government of India and Karnataka links.
- Removed an embedded local-file path from the supplied prototype before publishing.
- Replaced its random pest-result behaviour with an explicit safe prototype message: an uploaded photo is **not** a diagnosis or treatment recommendation.
- Added a planning disclaimer to the fertiliser advisor. Soil-test results and local agriculture-officer advice must guide real inputs.

## Winning story

1. A farmer speaks in Kannada and uploads a tomato-leaf photo.
2. KisanSetu gives a weather-aware, cautious next action.
3. The action is saved automatically in the farm diary.
4. At harvest, the farmer compares *net* market returns and joins a pooled transport trip.

This proves one shared farm profile can power crop, protection, recordkeeping, and selling decisions.
