import type { Href } from 'expo-router';

import { Colors } from '@/constants/theme';

export const QUICK_ACTIONS = [
  {
    id: 'budgets' as const,
    label: 'Budgets',
    route: '/envelopes' as Href,
    icon: 'pie-chart-outline' as const,
    color: Colors.greenPrimary,
    bg: '#f0f9f4',
  },
  {
    id: 'split' as const,
    label: 'Split',
    route: '/split' as Href,
    icon: 'people-outline' as const,
    color: '#9a6f00',
    bg: Colors.goldBg,
  },
  {
    id: 'savings' as const,
    label: 'Savings',
    route: '/savings' as Href,
    icon: 'lock-closed-outline' as const,
    color: Colors.greenPrimary,
    bg: '#f0f9f4',
  },
  {
    id: 'analytics' as const,
    label: 'Analytics',
    route: '/analytics' as Href,
    icon: 'bar-chart-outline' as const,
    color: Colors.greenPrimary,
    bg: '#f0f9f4',
  },
];
