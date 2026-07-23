/**
 * TransactionRow — Single line item in transaction lists
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

interface TransactionRowProps {
  title: string;
  subtitle: string;
  amount: string;
  /** Positive amounts render green; negative render red */
  positive?: boolean;
  icon: React.ReactNode;
  iconBg: string;
  /** Hide bottom border on the last row in a list */
  isLast?: boolean;
}

export function TransactionRow({
  title,
  subtitle,
  amount,
  positive = false,
  icon,
  iconBg,
  isLast = false,
}: TransactionRowProps) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <View style={[styles.icon, { backgroundColor: iconBg }]}>{icon}</View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={[styles.amount, positive ? styles.positive : styles.negative]}>
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.inputBg,
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  amount: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
  },
  positive: {
    color: Colors.greenPrimary,
  },
  negative: {
    color: Colors.errorDark,
  },
});
