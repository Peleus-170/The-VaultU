# VaultU Mobile

Campus Financial Companion — **KNUST CodeQuest 2026 · Group 89**

React Native + Expo + TypeScript frontend for the VaultU project.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Mobile Frontend | React Native + Expo + TypeScript |
| Navigation | Expo Router |
| Fonts | Sora (headings) + DM Sans (body) |

## Prerequisites

Install before running:

1. **Node.js (LTS)** — [nodejs.org](https://nodejs.org)
2. **Expo Go** on your Android/iOS phone (for live preview)

## Getting Started

```bash
cd Projects/vaultu-mobile
npm install
npx expo start
```

Scan the QR code with Expo Go to preview on your phone.

## Project Structure

```
vaultu-mobile/
├── app/                    # Screens (Expo Router file-based routing)
│   ├── _layout.tsx         # Root layout, fonts, navigation
│   ├── index.tsx           # Splash screen
│   ├── login.tsx           # Login screen
│   └── role-select.tsx     # Role selection screen
├── components/ui/          # Reusable UI components
├── constants/theme.ts      # Colors, fonts, spacing tokens
└── assets/                 # App icons and splash images
```

## Build Progress

### Phase 1 — Onboarding
- [x] Splash screen
- [x] Login screen
- [x] Role select screen

### Phase 2 — Auth flow
- [x] Reset password
- [x] OTP verification
- [x] Create new password
- [x] Student registration
- [x] Vendor details
- [x] Privacy policy

### Phase 3 — Main app (next)
- [x] Dashboard
- [ ] Envelopes
- [ ] Bill splitting
- [ ] Analytics
- [ ] Savings buckets
- [ ] Profile

## Group Members

Rexford Adomako Apea · Jeffrey Papa Koodu Ephraim · Michael Afriyie · Adiel Tweneboah-Koduah · Newton Nsiah Arthur
