/**
 * BottomTabBar — Main app navigation (Home, Budget, Split, Analytics, Profile)
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Spacing } from '@/constants/theme';

export type MainTab = 'home' | 'budget' | 'split' | 'analytics' | 'profile';

interface TabItem {
  id: MainTab;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { id: 'budget', label: 'Budget', icon: 'pie-chart-outline', iconActive: 'pie-chart' },
  { id: 'split', label: 'Split', icon: 'people-outline', iconActive: 'people' },
  { id: 'analytics', label: 'Analytics', icon: 'bar-chart-outline', iconActive: 'bar-chart' },
  { id: 'profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

interface BottomTabBarProps {
  active: MainTab;
  onTabPress?: (tab: MainTab) => void;
}

export function BottomTabBar({ active, onTabPress }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onTabPress?.(tab.id)}
            style={styles.item}
          >
            <Ionicons
              color={isActive ? Colors.greenPrimary : '#a5b8ac'}
              name={isActive ? tab.iconActive : tab.icon}
              size={20}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderTopColor: Colors.borderLight,
    paddingTop: 10,
  },
  item: {
    alignItems: 'center',
    gap: 3,
    minWidth: 52,
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 10,
    color: '#a5b8ac',
  },
  labelActive: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.greenPrimary,
  },
});
