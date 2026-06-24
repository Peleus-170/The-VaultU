/**
 * VaultU Design System — Theme Constants
 * ---------------------------------------
 * Central color palette and typography tokens matching the Gemini design mockup.
 * All screens should import from here to keep the UI consistent.
 */

import { Platform } from 'react-native';

/** Brand greens */
export const Colors = {
  /** Darkest green — headers, splash gradient start */
  greenDark: '#0f4a2c',
  /** Primary brand green — buttons, accents */
  greenPrimary: '#1a7a4a',
  /** Bright green — splash gradient end, highlights */
  greenBright: '#2db970',
  /** Mint accent on splash title */
  greenMint: '#7fffc4',

  /** Gold accent — withdraw button, vendor role */
  gold: '#c9960c',
  goldLight: '#fff8e1',
  goldBg: '#fdf5e4',

  /** Neutrals */
  background: '#F5F6FA',
  backgroundTertiary: '#e0eae3',
  card: '#FFFFFF',
  inputBg: '#f0f4f1',
  border: '#c0d1c7',
  borderLight: '#e0eae3',

  /** Text */
  textPrimary: '#0f2d1a',
  textSecondary: '#4a5e50',
  textTertiary: '#6b7a6e',
  textMuted: '#8a9e90',
  textLabel: '#374740',
  textIcon: '#6b9c7e',

  /** Semantic */
  error: '#e74c3c',
  errorDark: '#c0392b',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

/**
 * Font family names — custom fonts on native, system stack on web fallback.
 * Custom fonts are loaded in app/_layout.tsx via expo-font.
 */
export const Fonts = {
  heading: Platform.select({
    web: 'Sora, system-ui, sans-serif',
    default: 'Sora_600SemiBold',
  })!,
  headingBold: Platform.select({
    web: 'Sora, system-ui, sans-serif',
    default: 'Sora_700Bold',
  })!,
  body: Platform.select({
    web: 'DMSans, system-ui, sans-serif',
    default: 'DMSans_400Regular',
  })!,
  bodyMedium: Platform.select({
    web: 'DMSans, system-ui, sans-serif',
    default: 'DMSans_400Regular',
  })!,
  bodySemiBold: Platform.select({
    web: 'DMSans, system-ui, sans-serif',
    default: 'DMSans_500Medium',
  })!,
} as const;

/** Reusable spacing scale (in pixels) */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/** Border radius tokens */
export const Radius = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 18,
  xxl: 20,
  pill: 36,
} as const;
