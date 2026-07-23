/**
 * Card — White rounded container for form content
 */

import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export function Card({ style, children, ...viewProps }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...viewProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xxl,
    padding: Spacing.xxl,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.07)',
  },
});
