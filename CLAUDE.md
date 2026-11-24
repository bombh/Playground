# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Use context7 MCP when needed.

## Project Overview

This is a React Native Expo project named "Playground" - a mobile application serving as a showcase/playground for various UI components and mini-applications including animated carousels, an image gallery, a Wordle game clone, and a smoking tracker.

## Development Commands

### Running the App

-  `npm run dev` - Start Expo development server (with cache cleared)
-  `npm run ios` - Run on iOS simulator/device
-  `npm run android` - Run on Android emulator/device
-  `npm run web` - Run in web browser

## Architecture

### File-Based Routing (Expo Router)

This project uses Expo Router with a file-based routing system. Routes are defined by the file structure in the `app/` directory:

-  `app/_layout.jsx` - Root layout that re-exports from `src/layouts/Root.jsx`
-  `app/(drawer)/_layout.jsx` - Drawer navigation layout that re-exports from `src/layouts/Drawer.jsx`
-  `app/(drawer)/[feature]/` - Feature-specific routes (UI, wordle, smoking, photos, template), each in its own native Stack
-  `app/(drawer)/(home)/` - Home (URL `/`), also wrapped in a Stack so its header (iOS 26 glass menu button from `ScreenDrawer`) matches the other sections. Drawer screen name is `(home)`

### Project Structure

-  **`app/`** - Expo Router file-based routes (mostly re-exports from src/layouts)
-  **`src/layouts/`** - Actual layout implementations (Root, Drawer, Stack, etc.)
-  **`src/components/`** - Reusable UI components organized by feature:
   -  `home/` - Home screen components
   -  `movie/` - Movie-related components (Rating, Genres)
   -  `UICarousel01/`, `UICarousel02/` - Carousel implementations
   -  `UIAnimatedList/` - Animated list components
   -  `wordle/` - Wordle game UI components (ScreenKeyboard, Letter, SubscribeModal)
-  **`src/utils/`** - Utility functions and configurations:
   -  `firebaseConfig.js` - Firebase initialization
   -  `array.js` - Array helper functions
-  **`src/constants/`** - Constants including `wordle.js`
-  **`data/`** - Static data files:
   -  `movies.json`, `movies250.json` - Movie data
   -  `targetWords.ts`, `targetWordsFR.ts`, `allWords.ts` - Wordle word lists

### Key Technologies & Configuration

**Styling:**

-  NativeWind v4 (Tailwind CSS for React Native)
-  Dark mode supported via `darkMode: "class"` in `tailwind.config.js`
-  Custom font: "RockSalt-Regular" loaded in Root layout
-  TailwindCSS scans: `app/**/*.{js,jsx,ts,tsx}` and `src/**/*.{js,jsx,ts,tsx}`
-  Uses NativeWind preset in `tailwind.config.js`

**Metro Bundler:**

-  Custom transformer for SVG support via `react-native-svg-transformer`, combined with `withNativeWind` in `metro.config.js` (keep both — dropping the transformer makes `.svg` imports assets and crashes `wordle/gameEnd.jsx`)
-  SVG files treated as source files (not assets)

**Authentication & Data:**

-  Clerk for authentication via `@clerk/expo` v4 (Core 3; requires `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env`). Use `<Show when="signed-in|signed-out">` (no `SignedIn`/`SignedOut`) and `useSSO()` (not `useOAuth`)
-  Firebase/Firestore for data persistence (config in `src/utils/firebaseConfig.js`)
-  Token storage: official `tokenCache` from `@clerk/expo/token-cache` (expo-secure-store)

**Core Dependencies:**

-  Expo SDK ~58 — React Native 0.88.1, React 19.3.0, TypeScript ~6.0. iOS builds need **Xcode 26.4+**
-  Navigation: Expo Router ~58 with drawer from `expo-router/drawer` (`Drawer`, `DrawerContentScrollView`, `DrawerItemList`). Never import `@react-navigation/*` directly (SDK 56+)
-  Animations: `moti` 0.30, `react-native-reanimated` 4.7.1, `react-native-worklets` 0.13 (the worklets Babel plugin is added automatically by `babel-preset-expo`; don't add it to `babel.config.js`)
-  Gestures: `react-native-gesture-handler` 3.3
-  Styling: NativeWind 4.2.x + Tailwind 3 (NativeWind v5 / Tailwind 4 deliberately not used yet)
-  UI Components: `@gorhom/bottom-sheet`, `react-native-toast-message`, `react-native-gesture-image-viewer` (galleries)
-  RN 0.88 gotchas: `StyleSheet.absoluteFillObject` no longer exists (it is `undefined` → layouts silently break) — use `StyleSheet.absoluteFill`. iOS 26 native headers are translucent: set `headerTransparent: false` + `headerStyle.backgroundColor` when content must start below the header
-  Dev warnings filter: `index.js` (the `main` entry) loads `src/utils/ignoredWarnings.js` first, then `expo-router/entry`. It hides only known third-party warnings by exact prefix; remove entries once the library is fixed
-  iOS dev builds (`npm run ios`) need Xcode 26.4+; until then, run in Expo Go with `npx expo start --go`
-  Build Properties: SDK defaults (no SDK/deployment-target overrides in `app.json`); splash configured via the `expo-splash-screen` plugin

### Path Aliases

-  `@/*` resolves to project root (configured in `tsconfig.json`)
-  Example: `@/src/components/...`, `@/assets/...`

### Environment Variables

Required variables (use `.env.local` - already gitignored):

-  `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk authentication
-  `EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`, etc. - Firebase config

### Root Layout Providers

The app is wrapped in multiple providers (from `src/layouts/Root.jsx`):

1. ClerkProvider - Authentication
2. GestureHandlerRootView - Gesture support
3. BottomSheetModalProvider - Bottom sheet modals
4. Toast - Toast notifications with custom "info" style

### Navigation Structure

Main drawer navigation includes:

-  Home
-  UI Animated (carousel demos)
-  Gallery (photos)
-  Wordle (word guessing game)
-  Smoking (tracking app)
-  Template

Each section has its own nested routing via `_layout.jsx` files.

## Development Notes

### File Conventions

-  The codebase mixes `.jsx`, `.tsx`, `.js`, and `.ts` files
-  Layout files in `app/` are simple re-exports to actual implementations in `src/layouts/`
-  Components are organized by feature/purpose rather than by type

### Data Files

-  Wordle uses both TypeScript (`.ts`) and JSON (`.json`) word lists
-  Movie data stored as JSON in `data/` directory
-  Large word lists (~137KB for allWords.ts)

### Platform Support

-  iOS (bundle ID: `com.bombh.Playground`)
-  Android (package: `com.bombh.Playground`)
-  Web (limited, via Expo web)
-  Custom URL scheme: `playground://`

### Build Configuration

-  Babel preset: `babel-preset-expo` with NativeWind and Reanimated plugins
-  Reanimated plugin must be last in the plugins array
-  Console statements can be stripped in production via `babel-plugin-transform-remove-console`
-  TypeScript extends `expo/tsconfig.base`
-  Build properties configured via `expo-build-properties` plugin in `app.json`
