/**
 * AuthFooter — Small caps security / legal labels below auth forms
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

interface AuthFooterProps {
  left?: string;
  right?: string;
  /** Single centered line (overrides left/right) */
  single?: string;
}

export function AuthFooter({ left, right, single }: AuthFooterProps) {
  if (single) {
    return (
      <Text style={[styles.label, styles.single]}>{single}</Text>
    );
  }

  return (
    <View style={styles.row}>
      {left ? <Text style={styles.label}>{left}</Text> : null}
      {right ? (
        <>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.label}>{right}</Text>
        </>
      ) : null}
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
    fontSize: 10,
    letterSpacing: 1.1,
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  dot: {
    fontFamily: Fonts.body,
    fontSize: 10,
    color: Colors.textMuted,
  },
  single: {
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
