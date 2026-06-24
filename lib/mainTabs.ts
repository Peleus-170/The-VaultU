import { type Href, router } from 'expo-router';

import type { MainTab } from '@/components/ui/BottomTabBar';

const TAB_ROUTES: Partial<Record<MainTab, Href>> = {
  home: '/dashboard',
  budget: '/envelopes',
  split: '/split',
  analytics: '/analytics',
};

export function navigateMainTab(tab: MainTab) {
  const route = TAB_ROUTES[tab];
  if (route) {
    router.replace(route);
  }
}
