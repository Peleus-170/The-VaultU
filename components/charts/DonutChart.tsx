/**
 * DonutChart — Spending breakdown bar (no SVG — works on web + native)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Radius } from '@/constants/theme';

export interface DonutSegment {
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
}

export function DonutChart({ segments, size = 190 }: DonutChartProps) {
  return (
    <View style={[styles.wrap, { height: size }]}>
      <View style={styles.track}>
        {segments.map((segment, index) => (
          <View
            key={`${segment.color}-${index}`}
            style={[
              styles.segment,
              {
                flex: segment.value,
                backgroundColor: segment.color,
              },
              index === 0 && styles.segmentFirst,
              index === segments.length - 1 && styles.segmentLast,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    flexDirection: 'row',
    width: '100%',
    height: 28,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  segmentFirst: {
    borderTopLeftRadius: Radius.lg,
    borderBottomLeftRadius: Radius.lg,
  },
  segmentLast: {
    borderTopRightRadius: Radius.lg,
    borderBottomRightRadius: Radius.lg,
  },
});
