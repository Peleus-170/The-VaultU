/**
 * Screen 4 — Analytics
 * ---------------------
 * Spending stats, breakdown chart, and monthly trend.
 * Design reference: vaultu_app_screens.html — Screen 4
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DonutChart } from '@/components/charts/DonutChart';
import { TrendBarChart } from '@/components/charts/TrendBarChart';
import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Card } from '@/components/ui/Card';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { navigateMainTab } from '@/lib/mainTabs';

const BREAKDOWN = [
  { label: 'Food', percent: 38, color: Colors.greenPrimary },
  { label: 'Transport', percent: 18, color: '#185FA5' },
  { label: 'Data', percent: 13, color: Colors.gold },
  { label: 'Academics', percent: 21, color: '#534AB7' },
  { label: 'Other', percent: 10, color: '#993C1D' },
];

const MONTHLY_TREND = [
  { label: 'Jan', spent: 290, saved: 50 },
  { label: 'Feb', spent: 310, saved: 60 },
  { label: 'Mar', spent: 265, saved: 40 },
  { label: 'Apr', spent: 340, saved: 70 },
  { label: 'May', spent: 295, saved: 55 },
  { label: 'Jun', spent: 312, saved: 85 },
];

export default function AnalyticsScreen() {
  return (
    <View style={styles.screen}>
      <ScreenHeader
        actions={[{ accessibilityLabel: 'Select period', icon: 'calendar-outline' }]}
        title="Analytics"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>GHS 312</Text>
            <Text style={styles.statLabel}>Total Spent — June</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxGold]}>
            <Text style={[styles.statValue, styles.statValueGold]}>GHS 85</Text>
            <Text style={styles.statLabel}>Total Saved — June</Text>
          </View>
        </View>

        <Card>
          <SectionHeader
            rightElement={<Text style={styles.period}>June 2026</Text>}
            title="Spending Breakdown"
          />

          <View style={styles.legend}>
            {BREAKDOWN.map((item) => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.swatch, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>
                  {item.label} {item.percent}%
                </Text>
              </View>
            ))}
          </View>

          <DonutChart
            segments={BREAKDOWN.map((item) => ({
              color: item.color,
              value: item.percent,
            }))}
          />
        </Card>

        <Card>
          <SectionHeader actionLabel="This year" title="Monthly Trend" />
          <TrendBarChart data={MONTHLY_TREND} />
        </Card>
      </ScrollView>

      <BottomTabBar active="analytics" onTabPress={navigateMainTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: 14,
    paddingBottom: Spacing.xl,
  },
  statRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f0f9f4',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statBoxGold: {
    backgroundColor: Colors.goldBg,
  },
  statValue: {
    fontFamily: Fonts.headingBold,
    fontSize: 20,
    color: Colors.textPrimary,
  },
  statValueGold: {
    color: '#9a6f00',
  },
  statLabel: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 2,
    textAlign: 'center',
  },
  period: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: Spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
