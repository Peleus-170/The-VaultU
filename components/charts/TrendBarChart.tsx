/**
 * TrendBarChart — Monthly spent vs saved bars
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

export interface TrendMonth {
  label: string;
  spent: number;
  saved: number;
}

interface TrendBarChartProps {
  data: TrendMonth[];
  height?: number;
}

export function TrendBarChart({ data, height = 160 }: TrendBarChartProps) {
  const maxValue = Math.max(...data.flatMap((month) => [month.spent, month.saved]));
  const plotHeight = height - 22;

  return (
    <View style={[styles.wrap, { height }]}>
      <View style={[styles.plot, { height: plotHeight }]}>
        {data.map((month) => (
          <View key={month.label} style={styles.column}>
            <View style={styles.bars}>
              <View
                style={[
                  styles.bar,
                  styles.spentBar,
                  { height: (month.spent / maxValue) * plotHeight },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  styles.savedBar,
                  { height: (month.saved / maxValue) * plotHeight },
                ]}
              />
            </View>
            <Text style={styles.label}>{month.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  plot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bars: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 3,
    marginBottom: 6,
  },
  bar: {
    width: '42%',
    minHeight: 4,
    borderRadius: 6,
  },
  spentBar: {
    backgroundColor: Colors.greenPrimary,
  },
  savedBar: {
    backgroundColor: Colors.gold,
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
  },
});
