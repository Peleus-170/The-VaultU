/**
 * AuthMethodTabs — Switch between phone and email credential entry
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export type AuthMethod = 'phone' | 'email';

interface AuthMethodTabsProps {
  value: AuthMethod;
  onChange: (method: AuthMethod) => void;
}

export function AuthMethodTabs({ value, onChange }: AuthMethodTabsProps) {
  return (
    <View style={styles.track}>
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: value === 'phone' }}
        onPress={() => onChange('phone')}
        style={[styles.tab, value === 'phone' && styles.tabActive]}
      >
        <Text style={[styles.tabLabel, value === 'phone' && styles.tabLabelActive]}>
          Phone
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: value === 'email' }}
        onPress={() => onChange('email')}
        style={[styles.tab, value === 'email' && styles.tabActive]}
      >
        <Text style={[styles.tabLabel, value === 'email' && styles.tabLabelActive]}>
          Email
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    padding: 3,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  tabLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textMuted,
  },
  tabLabelActive: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.greenDark,
  },
});
