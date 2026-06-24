/**
 * FeatureTag — Pill label on the splash screen (Envelopes, Savings, etc.)
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';

interface FeatureTagProps {
  label: string;
}

export function FeatureTag({ label }: FeatureTagProps) {
  return (
    <View style={styles.tag}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.92)',
  },
});
