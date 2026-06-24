/**
 * EnvelopeRow — Budget envelope with spend progress
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

interface EnvelopeRowProps {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  spent: number;
  budget: number;
  barColor: string;
  remainingColor: string;
  isLast?: boolean;
}

export function EnvelopeRow({
  name,
  icon,
  iconColor,
  spent,
  budget,
  barColor,
  remainingColor,
  isLast = false,
}: EnvelopeRowProps) {
  const percent = Math.round((spent / budget) * 100);
  const remaining = budget - spent;

  return (
    <View style={[styles.wrap, !isLast && styles.wrapSpaced]}>
      <View style={styles.topRow}>
        <View style={styles.nameRow}>
          <Ionicons color={iconColor} name={icon} size={15} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.amount}>
          GHS {spent}{' '}
          <Text style={styles.budget}>/ {budget}</Text>
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percent}%`, backgroundColor: barColor },
          ]}
        />
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.percent}>{percent}% used</Text>
        <Text style={[styles.remaining, { color: remainingColor }]}>
          GHS {remaining} left
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 0,
  },
  wrapSpaced: {
    marginBottom: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  name: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  amount: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.textTertiary,
  },
  budget: {
    fontFamily: Fonts.body,
    color: Colors.textMuted,
  },
  track: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.sm,
    height: 8,
    overflow: 'hidden',
    marginVertical: Spacing.sm,
  },
  fill: {
    height: '100%',
    borderRadius: Radius.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percent: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
  },
  remaining: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
  },
});
