# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fearless is a League of Legends ban/pick simulation web application built with React, TypeScript, and Vite. It provides an interactive tool for practicing and analyzing LoL draft phases with real-time timers, champion selection, and team management features.

Deployed at: https://fearless-lab.github.io/

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Tech Stack & Key Dependencies

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with `@tailwindcss/vite`
- **State Management**: Zustand (see `src/store/`)
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM 7
- **Backend**: Firebase Firestore
- **Animations**: GSAP with ScrollTrigger and SplitText plugins
- **UI Components**: Radix UI primitives, Headless UI
- **DnD**: @dnd-kit for drag-and-drop functionality
- **Alerts**: SweetAlert2

## Architecture

### Directory Structure

```
src/
├── apis/              # API layer
│   ├── firebase/      # Firestore operations
│   └── service/       # Service layer for fetching data
├── components/        # Shared UI components
│   └── ui/           # Radix UI-based component library
├── helper/           # Pure utility functions
│   └── banPickSimulation/  # Ban/pick game logic
├── hooks/            # React hooks
│   ├── animation/    # GSAP animation hooks
│   ├── banPick/      # Ban/pick feature hooks
│   ├── nickname/     # User nickname hooks
│   └── posts/        # Community posts hooks
├── lib/              # Library configurations
├── pages/            # Route pages
│   └── components/   # Page-specific components
│       ├── BanPick/
│       ├── BanPickSimulation/
│       └── Community/
├── store/            # Zustand stores
└── utils/            # General utilities

constants/            # Shared constants (outside src/)
```

### Path Aliases

Configure in `vite.config.ts`:

- `@/*` → `src/*`
- `@constants/*` → `constants/*`
- `@commonComponents/*` → `src/components/*`
- `@utils/*` → `src/utils/*`

### State Management

- **Global State**: Zustand stores in `src/store/`
  - `banPickTimerStore.ts`: Manages timer state and mute toggle
- **Server State**: TanStack Query with configuration in `src/lib/reactQuery.ts`
  - Default staleTime: 60 seconds
  - Refetch on window focus enabled
  - Retry attempts: 1

### Ban/Pick Phase Logic

The core ban/pick simulation follows the standard LoL draft format defined in `constants/banPick.ts`:

- 20 phases total (bans, picks, and swaps)
- Each phase has: `type`, `team`, `duration`, `index`
- Phase sequence: 3 bans → 3 picks → 2 bans → 2 picks → swap phase
- Key hooks:
  - `useBanPickLogic`: Core game state and phase transitions
  - `useBanPickController`: User actions and champion selection
  - `useVerifyBanPickRoom`: Room validation and authentication
  - `useChampions`: Champion data management

### Firebase Integration

Configuration in `src/firebase.ts`:

- Environment variables prefixed with `VITE_FIREBASE_*`
- Firestore database exported as `db`
- API operations in `src/apis/firebase/`

## Key Features

1. **Ban/Pick Simulation** (`/banPickSimulation`):

   - Real-time draft phase simulation with 30-second timers
   - Blue side vs Red side team management
   - Champion grid with search and filtering
   - Position-based role selection (TOP, JG, MID, ADC, SUP)
   - History tracking and set management (Best of 1/3/5)
   - Champion notes and swap functionality

2. **Ban/Pick Planning** (`/banPick`):

   - Static ban/pick planning tool
   - Room creation with match IDs
   - Team setup and strategy preparation

3. **Community** (`/community`):

   - Firestore-based post system
   - Category filtering
   - Post creation and detail views

4. **Home** (`/`):
   - Landing page with GSAP scroll animations
   - Feature showcase

## Routing & Prerendering

- All routes defined in `src/App.tsx` with `BrowserRouter`
- Base URL configured in `constants/url.ts`
- Static prerendering configured in `prerender.config.js`:
  - Routes: `/`, `/banPick`, `/banPickSimulation`, `/about`
  - Output: `prerendered/` directory
  - Used for GitHub Pages deployment

## Deployment

Automated via GitHub Actions (`.github/workflows/deploy.yml`):

1. Install dependencies with `npm ci`
2. Build with environment variables from GitHub Secrets
3. Prerender static HTML with `react-static-prerender`
4. Copy `404.html` for SPA routing
5. Deploy `prerendered/` to GitHub Pages

## Environment Variables

Required Firebase configuration (create `.env` file):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Note: `.env` should be in `.gitignore` - use GitHub Secrets for deployment.

## Important Constants

- `constants/banPick.ts`: Phase sequence and timing
- `constants/positions.ts`: Champion role positions
- `constants/category.ts`: Community post categories
- `constants/adjectives.ts`: Random nickname generation
- `constants/url.ts`: Base URL configuration

## Working with Champions

Champion data structure typically includes:

- `id`: Unique identifier
- `name`: Champion name (Korean)
- `position`: Role (TOP, JG, MID, ADC, SUP)
- Images/assets loaded dynamically

Search and filtering happens in `ChampionGrid` component with debounced input.

## Animation Patterns

GSAP animations registered in `src/App.tsx`:

- ScrollTrigger for scroll-based animations
- SplitText for text animations
- Custom hooks in `src/hooks/animation/`:
  - `useScrollReveal.ts`: Scroll-based reveal animations
  - `useSplitTextAnimation.ts`: Text splitting effects

## Testing Query Parameters

Ban/pick simulation uses query params:

- `matchId`: Room identifier
- `team`: blue or red
- `mode`: simulation mode
- `bestOf`: 1, 3, or 5

Parse with `getBanPickQueryParams()` from `src/utils/getQueryParams.ts`.
