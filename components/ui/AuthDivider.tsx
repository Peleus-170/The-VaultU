/**
 * AuthDivider — Separator between social and credential auth
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

interface AuthDividerProps {
  label?: string;
  /** Uppercase small-caps style used on auth screens */
  uppercase?: boolean;
}

export function AuthDivider({
  label = 'or',
  uppercase = false,
}: AuthDividerProps) {
  const displayLabel = uppercase ? label.toUpperCase() : label;

  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={[styles.label, uppercase && styles.labelUpper]}>
        {displayLabel}
      </Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginVertical: Spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
  },
  labelUpper: {
    fontSize: 11,
    letterSpacing: 0.8,
  },
});
