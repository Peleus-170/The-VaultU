/**
 * SecurityFooter — ENCRYPTED · BIOMETRIC labels on auth screens
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

export function SecurityFooter() {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>ENCRYPTED</Text>
      <Text style={styles.dot}>·</Text>
      <Text style={styles.label}>BIOMETRIC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xxl,
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.textMuted,
  },
  dot: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
  },
});
