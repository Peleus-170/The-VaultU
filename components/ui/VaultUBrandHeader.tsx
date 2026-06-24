/**
 * VaultUBrandHeader — Green bar with shield icon + "VaultU" branding
 * Used on password recovery and policy screens.
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export function VaultUBrandHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      <View style={styles.logo}>
        <Ionicons color={Colors.white} name="shield-checkmark" size={16} />
      </View>
      <Text style={styles.brand}>VaultU</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greenDark,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontFamily: Fonts.headingBold,
    fontSize: 17,
    color: Colors.white,
  },
});
