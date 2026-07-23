/**
 * Screen 3 — Bill Splitting
 * --------------------------
 * Active split overview, members, and settle-up action.
 * Design reference: vaultu_app_screens.html — Screen 3
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SplitMemberRow } from '@/components/ui/SplitMemberRow';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { navigateMainTab } from '@/lib/mainTabs';

const MEMBERS = [
  {
    initials: 'RA',
    name: 'Rexford A.',
    isYou: true,
    amount: 'GHS 70.00',
    status: 'paid' as const,
    avatarBg: '#e8f5ed',
    avatarColor: Colors.greenPrimary,
  },
  {
    initials: 'JE',
    name: 'Jeffrey E.',
    amount: 'GHS 70.00',
    status: 'owes' as const,
    avatarBg: Colors.goldBg,
    avatarColor: '#9a6f00',
  },
  {
    initials: 'MA',
    name: 'Michael A.',
    amount: 'GHS 70.00',
    status: 'paid' as const,
    avatarBg: '#f0f4f9',
    avatarColor: '#185FA5',
  },
  {
    initials: 'NA',
    name: 'Newton A.',
    amount: 'GHS 70.00',
    status: 'owes' as const,
    avatarBg: '#f0eefe',
    avatarColor: '#534AB7',
  },
];

export default function SplitScreen() {
  return (
    <View style={styles.screen}>
      <ScreenHeader
        actions={[{ accessibilityLabel: 'Create split', icon: 'add' }]}
        title="Bill Splitting"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.activeCard}>
          <View style={styles.activeTop}>
            <View style={styles.activeInfo}>
              <Text style={styles.activeLabel}>Active Split</Text>
              <Text style={styles.activeTitle}>Weekend Trip — Kumasi</Text>
              <Text style={styles.activeMeta}>Created by you · 4 members</Text>
            </View>
            <View style={styles.openBadge}>
              <Text style={styles.openBadgeText}>OPEN</Text>
            </View>
          </View>

          <View style={styles.activeStats}>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Total Bill</Text>
              <Text style={styles.statValue}>GHS 280.00</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Per Person</Text>
              <Text style={[styles.statValue, styles.statGold]}>GHS 70.00</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>You Owe</Text>
              <Text style={[styles.statValue, styles.statMint]}>Paid ✓</Text>
            </View>
          </View>
        </Card>

        <Card>
          <SectionHeader actionLabel="Edit" title="Members" />
          {MEMBERS.map((member, index) => (
            <SplitMemberRow
              key={member.initials}
              {...member}
              isLast={index === MEMBERS.length - 1}
            />
          ))}
        </Card>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryBox}>
            <Text style={[styles.summaryValue, styles.summaryGold]}>GHS 140</Text>
            <Text style={styles.summaryLabel}>Outstanding</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={[styles.summaryValue, styles.summaryGreen]}>2 / 4</Text>
            <Text style={styles.summaryLabel}>Settled</Text>
          </View>
        </View>

        <Button
          icon={<Ionicons color={Colors.goldLight} name="send-outline" size={17} />}
          onPress={() => {}}
          style={styles.settleBtn}
          title="Settle Up — GHS 70.00"
          variant="gold"
        />
      </ScrollView>

      <BottomTabBar active="split" onTabPress={navigateMainTab} />
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
  activeCard: {
    backgroundColor: Colors.greenDark,
    borderWidth: 0,
  },
  activeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activeInfo: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  activeLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  activeTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: Colors.white,
  },
  activeMeta: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  openBadge: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  openBadgeText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.goldLight,
  },
  activeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    marginTop: 14,
    paddingTop: 14,
  },
  statBlock: {
    flex: 1,
  },
  statLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 2,
  },
  statValue: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: Colors.white,
  },
  statGold: {
    color: Colors.gold,
  },
  statMint: {
    color: Colors.greenMint,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: 14,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.07)',
  },
  summaryValue: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  summaryGold: {
    color: Colors.gold,
  },
  summaryGreen: {
    color: Colors.greenPrimary,
  },
  summaryLabel: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  settleBtn: {
    borderRadius: Radius.xl,
    paddingVertical: 16,
  },
});
