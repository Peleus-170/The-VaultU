/**
 * Screen 2 — Envelopes / Budget
 * ------------------------------
 * Spending envelopes with progress bars and budget summary.
 * Design reference: vaultu_app_screens.html — Screen 2
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Card } from '@/components/ui/Card';
import { EnvelopeRow } from '@/components/ui/EnvelopeRow';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { navigateMainTab } from '@/lib/mainTabs';

const ENVELOPES = [
  {
    name: 'Food',
    icon: 'restaurant-outline' as const,
    iconColor: Colors.greenPrimary,
    spent: 72,
    budget: 150,
    barColor: Colors.greenPrimary,
    remainingColor: Colors.greenPrimary,
  },
  {
    name: 'Transport',
    icon: 'bus-outline' as const,
    iconColor: '#185FA5',
    spent: 55,
    budget: 80,
    barColor: '#185FA5',
    remainingColor: '#185FA5',
  },
  {
    name: 'Data',
    icon: 'wifi-outline' as const,
    iconColor: '#9a6f00',
    spent: 40,
    budget: 50,
    barColor: Colors.gold,
    remainingColor: Colors.gold,
  },
  {
    name: 'Academics',
    icon: 'book-outline' as const,
    iconColor: '#534AB7',
    spent: 20,
    budget: 80,
    barColor: '#534AB7',
    remainingColor: '#534AB7',
  },
];

const ACTION_TILES = [
  {
    id: 'new',
    label: 'New Envelope',
    icon: 'add' as const,
    iconColor: Colors.greenPrimary,
    bg: '#e8f5ed',
  },
  {
    id: 'autofund',
    label: 'Auto-Fund',
    icon: 'options-outline' as const,
    iconColor: '#9a6f00',
    bg: Colors.goldBg,
  },
];

export default function EnvelopesScreen() {
  const spentTotal = 187;
  const budgetTotal = 400;
  const remainingTotal = 213;
  const spentPercent = Math.round((spentTotal / budgetTotal) * 100);

  return (
    <View style={styles.screen}>
      <ScreenHeader
        actions={[
          { accessibilityLabel: 'Add envelope', icon: 'add' },
          { accessibilityLabel: 'More options', icon: 'ellipsis-vertical' },
        ]}
        title="Envelopes"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Budgeted</Text>
          <Text style={styles.summaryAmount}>GHS 400.00</Text>
          <View style={styles.summaryStats}>
            <Text style={styles.summaryStat}>
              <Text style={styles.remainingHighlight}>GHS {remainingTotal}</Text> remaining
            </Text>
            <Text style={styles.summaryStat}>
              <Text style={styles.spentHighlight}>GHS {spentTotal}</Text> spent
            </Text>
          </View>
          <View style={styles.summaryTrack}>
            <View
              style={[styles.summaryFill, { width: `${spentPercent}%` }]}
            />
          </View>
        </Card>

        <Card>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Spending Envelopes</Text>
            <Text style={styles.listPeriod}>June 2026</Text>
          </View>

          {ENVELOPES.map((envelope, index) => (
            <EnvelopeRow
              key={envelope.name}
              {...envelope}
              isLast={index === ENVELOPES.length - 1}
            />
          ))}
        </Card>

        <View style={styles.actionGrid}>
          {ACTION_TILES.map((tile) => (
            <Pressable
              key={tile.id}
              accessibilityRole="button"
              style={styles.actionTile}
            >
              <View style={[styles.actionIcon, { backgroundColor: tile.bg }]}>
                <Ionicons color={tile.iconColor} name={tile.icon} size={18} />
              </View>
              <Text style={styles.actionLabel}>{tile.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="budget" onTabPress={navigateMainTab} />
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
  summaryCard: {
    backgroundColor: Colors.greenDark,
    borderWidth: 0,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg + 2,
  },
  summaryLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 2,
  },
  summaryAmount: {
    fontFamily: Fonts.headingBold,
    fontSize: 26,
    color: Colors.white,
  },
  summaryStats: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  summaryStat: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  remainingHighlight: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.greenMint,
  },
  spentHighlight: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.gold,
  },
  summaryTrack: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.sm,
    height: 6,
    marginTop: 10,
    overflow: 'hidden',
  },
  summaryFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: Radius.sm,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  listTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  listPeriod: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  actionTile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.07)',
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    flex: 1,
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.textPrimary,
  },
});
