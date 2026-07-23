/**
 * Savings — Locked savings buckets
 * ---------------------------------
 * Placeholder screen until Savings Service is wired to the app.
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { navigateMainTab } from '@/lib/mainTabs';
import { MOCK_PROFILE } from '@/lib/mockProfile';

const BUCKETS = [
  {
    name: 'Emergency Fund',
    saved: 50,
    goal: 200,
    lockedUntil: 'Sep 2026',
    icon: 'shield-outline' as const,
  },
  {
    name: 'Graduation Trip',
    saved: 35,
    goal: 150,
    lockedUntil: 'Dec 2026',
    icon: 'airplane-outline' as const,
  },
];

export default function SavingsScreen() {
  return (
    <View style={styles.screen}>
      <ScreenHeader title="Savings" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Saved</Text>
          <Text style={styles.summaryAmount}>GHS {MOCK_PROFILE.saved}</Text>
          <Text style={styles.summaryHint}>Across {BUCKETS.length} locked buckets</Text>
        </Card>

        <Card>
          <SectionHeader title="Your Buckets" />
          {BUCKETS.map((bucket, index) => {
            const progress = Math.round((bucket.saved / bucket.goal) * 100);
            return (
              <View
                key={bucket.name}
                style={[styles.bucketRow, index === BUCKETS.length - 1 && styles.bucketRowLast]}
              >
                <View style={styles.bucketTop}>
                  <View style={styles.bucketIcon}>
                    <Ionicons color={Colors.greenPrimary} name={bucket.icon} size={18} />
                  </View>
                  <View style={styles.bucketInfo}>
                    <Text style={styles.bucketName}>{bucket.name}</Text>
                    <Text style={styles.bucketMeta}>
                      GHS {bucket.saved} / {bucket.goal} · Locked until {bucket.lockedUntil}
                    </Text>
                  </View>
                  <Ionicons color={Colors.gold} name="lock-closed" size={16} />
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
              </View>
            );
          })}
        </Card>

        <Button
          icon={<Ionicons color={Colors.white} name="add-outline" size={16} />}
          onPress={() => {}}
          style={styles.createBtn}
          title="Create Savings Bucket"
        />
      </ScrollView>

      <BottomTabBar active="home" onTabPress={navigateMainTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: 14,
  },
  summaryCard: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.textMuted,
  },
  summaryAmount: {
    fontFamily: Fonts.headingBold,
    fontSize: 32,
    color: Colors.greenPrimary,
    marginTop: Spacing.xs,
  },
  summaryHint: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
  },
  bucketRow: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  bucketRowLast: {
    borderBottomWidth: 0,
  },
  bucketTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  bucketIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: '#f0f9f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bucketInfo: {
    flex: 1,
  },
  bucketName: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  bucketMeta: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.borderLight,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.greenPrimary,
  },
  createBtn: {
    backgroundColor: Colors.greenPrimary,
  },
});
