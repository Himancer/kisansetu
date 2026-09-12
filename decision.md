# KisanSetu — Product decisions

## Goal

Create a hackathon-ready, India-first farm companion that brings daily crop decisions, trusted government services and private field notes into one calm, low-cost experience.

## Product choices

| Decision | Choice | Reason |
|---|---|---|
| Primary user | Smallholder farmer | They benefit most from one joined-up, low-friction tool. |
| Core promise | “What does my farm need today?” | Makes the product useful beyond being a scheme directory. |
| Fully supported languages | English, Hindi, Kannada | Every visible screen, form, weather phrase, crop recommendation and knowledge card is translated; partially translated choices were removed. |
| Location model | Selected city anchors a selected state | Enables honest state-specific benefit links while avoiding an unsupported claim of precise village eligibility. |
| Government updates | Curated, direct official portals | More reliable and privacy-preserving than scraping pages in the browser; farmers complete eligibility checks on the official site. |
| Demo crop | Tomato | Familiar, visual and perishable—useful for explaining the crop-cycle story. |
| Market view | Clearly labelled illustrative comparison | Never presents fabricated market prices as live data. |
| Crop safety | Guidance with uncertainty and expert escalation | A photo selection is not a pest diagnosis or pesticide prescription. |
| Data privacy | Browser-local name and diary | No server, payment, Aadhaar, bank detail or account credential is collected. Sign-out clears local KisanSetu data. |

## State-benefit coverage

The region selector dynamically swaps the official state cards and local forecast for these demo locations:

| Selected location | State portals included |
|---|---|
| Hesaraghatta | Karnataka: Raita Mitra, FRUITS, Samrakshane, Krishi Marata Vahini |
| Ludhiana | Punjab Agriculture Department, e-Mandikaran, Punjab Mandi Board |
| Lucknow | AgriDarshan Uttar Pradesh, Nand Baba Dugdh Mission |
| Nagpur | MahaDBT Farmer, Maharashtra Agriculture Department |
| Bardhaman | West Bengal Agriculture Department, Krishak Bandhu, Bangla Sahayata Kendra |
| Coimbatore | Uzhavan, Tamil Nadu Agrisnet, Tamil Mannvalam |
| Jodhpur | Raj Kisan, Jan Soochna Agriculture, Jan Aadhaar |

National cards always link to PM-KISAN, PM Fasal Bima Yojana, Farmers’ Portal and Soil Health Card. Links are direct official destinations and are labelled as such.

## Free-first technical decisions

| Need | Current implementation | Cost decision |
|---|---|---|
| Profile | Browser-local display name | Free; appropriate for a single-device demo, not production authentication. |
| Live weather | Open-Meteo public forecast endpoint | Free and keyless for normal use, with an offline fallback. |
| Voice entry | Built-in browser speech recognition when supported | Free; the crop planner is the fallback. |
| Hosting | GitHub Pages static hosting | Free public demo hosting. |
| Motion | CSS transitions plus a pausable carousel | No image-generation or paid animation service; respects reduced-motion preference. |

## Boundaries before production

This demo deliberately does not make a diagnosis, book a provider, authenticate a scheme account, calculate real mandi profit, or determine benefit eligibility. Production work needs verified local data providers, consented encrypted storage, agronomist review, accessibility testing with farmers, and state-by-state content review.

## Winning story

1. A farmer selects Hindi or Kannada and their state.
2. KisanSetu updates the local forecast and only shows official benefits for that state.
3. They make a low-risk crop plan, use the safe photo hand-off, and save a private farm note.
4. They leave the demo through an official government service when they need a real scheme update.

This presents KisanSetu as a trustworthy decision layer across the season—not another disconnected list of farmer features.
