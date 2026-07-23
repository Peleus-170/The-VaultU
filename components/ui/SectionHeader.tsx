/**
 * SectionHeader — Title row with optional right action link
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  rightElement?: React.ReactNode;
}

export function SectionHeader({
  title,
  actionLabel,
  onActionPress,
  rightElement,
}: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {rightElement}
      {actionLabel ? (
        <Pressable accessibilityRole="button" onPress={onActionPress}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm + 2,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  action: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.greenPrimary,
  },
});
