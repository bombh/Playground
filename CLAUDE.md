# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native Expo project named "Playground" - a mobile application serving as a showcase/playground for various UI components and mini-applications including animated carousels, an image gallery, a Wordle game clone, and a smoking tracker.

## Development Commands

### Running the App
- `npm run dev` - Start Expo development server (with cache cleared)
- `npm run ios` - Run on iOS simulator/device
- `npm run android` - Run on Android emulator/device
- `npm run web` - Run in web browser

## Architecture

### File-Based Routing (Expo Router)
This project uses Expo Router with a file-based routing system. Routes are defined by the file structure in the `app/` directory:

- `app/_layout.jsx` - Root layout that re-exports from `src/layouts/Root.jsx`
- `app/(drawer)/_layout.jsx` - Drawer navigation layout that re-exports from `src/layouts/Drawer.jsx`
- `app/(drawer)/[feature]/` - Feature-specific routes (UI, wordle, smoking, photos, template)

### Project Structure
- **`app/`** - Expo Router file-based routes (mostly re-exports from src/layouts)
- **`src/layouts/`** - Actual layout implementations (Root, Drawer, Stack, etc.)
- **`src/components/`** - Reusable UI components organized by feature:
  - `home/` - Home screen components
  - `movie/` - Movie-related components (Rating, Genres)
  - `UICarousel01/`, `UICarousel02/` - Carousel implementations
  - `UIAnimatedList/` - Animated list components
  - `wordle/` - Wordle game UI components (ScreenKeyboard, Letter, SubscribeModal)
- **`src/utils/`** - Utility functions and configurations:
  - `firebaseConfig.js` - Firebase initialization
  - `cache.ts` - Token caching for Clerk authentication
  - `array.js` - Array helper functions
- **`src/constants/`** - Constants including `wordle.js`
- **`data/`** - Static data files:
  - `movies.json`, `movies250.json` - Movie data
  - `targetWords.ts`, `targetWordsFR.ts`, `allWords.ts` - Wordle word lists

### Key Technologies & Configuration

**Styling:**
- NativeWind v2 (Tailwind CSS for React Native)
- Dark mode supported via `darkMode: "class"` in `tailwind.config.js`
- Custom font: "RockSalt-Regular" loaded in Root layout
- TailwindCSS scans: `app/**/*.{js,jsx,ts,tsx}` and `src/**/*.{js,jsx,ts,tsx}`

**Metro Bundler:**
- Custom transformer for SVG support via `react-native-svg-transformer`
- SVG files treated as source files (not assets)
- CJS module support enabled

**Authentication & Data:**
- Clerk for authentication (requires `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env`)
- Firebase/Firestore for data persistence (config in `src/utils/firebaseConfig.js`)
- Secure token storage using `expo-secure-store` and custom cache utility

**Core Dependencies:**
- React Native 0.74.5 with React 18.2.0
- Expo SDK ~51.0.39
- Navigation: Expo Router ~3.5.24 with drawer navigation
- Animations: `moti`, `react-native-reanimated` ~3.10.1
- UI Components: `@gorhom/bottom-sheet`, `react-native-toast-message`, `react-native-awesome-gallery`

### Path Aliases
- `@/*` resolves to project root (configured in `tsconfig.json`)
- Example: `@/src/components/...`, `@/assets/...`

### Environment Variables
Required variables (use `.env.local` - already gitignored):
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk authentication
- `EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`, etc. - Firebase config

### Root Layout Providers
The app is wrapped in multiple providers (from `src/layouts/Root.jsx`):
1. ClerkProvider - Authentication
2. GestureHandlerRootView - Gesture support
3. BottomSheetModalProvider - Bottom sheet modals
4. Toast - Toast notifications with custom "info" style

### Navigation Structure
Main drawer navigation includes:
- Home
- UI Animated (carousel demos)
- Gallery (photos)
- Wordle (word guessing game)
- Smoking (tracking app)
- Template

Each section has its own nested routing via `_layout.jsx` files.

## Development Notes

### File Conventions
- The codebase mixes `.jsx`, `.tsx`, `.js`, and `.ts` files
- Layout files in `app/` are simple re-exports to actual implementations in `src/layouts/`
- Components are organized by feature/purpose rather than by type

### Data Files
- Wordle uses both TypeScript (`.ts`) and JSON (`.json`) word lists
- Movie data stored as JSON in `data/` directory
- Large word lists (~137KB for allWords.ts)

### Platform Support
- iOS (bundle ID: `com.bombh.Playground`)
- Android (package: `com.bombh.Playground`)
- Web (limited, via Expo web)
- Custom URL scheme: `playground://`

### Build Configuration
- Babel preset: `babel-preset-expo` with NativeWind plugin
- Console statements can be stripped in production via `babel-plugin-transform-remove-console`
- TypeScript extends `expo/tsconfig.base`
