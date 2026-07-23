/**
 * Screen 1 — Wallet Dashboard
 * ----------------------------
 * Home tab: balance, quick actions, shortcuts, and recent transactions.
 * Design reference: vaultu_app_screens.html — Screen 1
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TransactionRow } from '@/components/ui/TransactionRow';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { navigateMainTab } from '@/lib/mainTabs';
import { getShortName, MOCK_PROFILE } from '@/lib/mockProfile';
import { QUICK_ACTIONS } from '@/lib/quickActions';

const TRANSACTIONS = [
  {
    title: 'Food — Canteen',
    subtitle: 'Today · 12:30 PM',
    amount: '−GHS 18.00',
    positive: false,
    icon: 'restaurant-outline' as const,
    iconColor: Colors.greenPrimary,
    iconBg: '#f0f9f4',
  },
  {
    title: 'MoMo Top-Up',
    subtitle: 'Today · 9:15 AM',
    amount: '+GHS 150.00',
    positive: true,
    icon: 'phone-portrait-outline' as const,
    iconColor: '#9a6f00',
    iconBg: Colors.goldBg,
  },
  {
    title: 'Transport — Trotro',
    subtitle: 'Yesterday · 7:42 AM',
    amount: '−GHS 5.00',
    positive: false,
    icon: 'bus-outline' as const,
    iconColor: '#185FA5',
    iconBg: '#f0f4f9',
  },
  {
    title: 'Data Bundle',
    subtitle: 'Yesterday · 6:00 PM',
    amount: '−GHS 20.00',
    positive: false,
    icon: 'wifi-outline' as const,
    iconColor: '#993C1D',
    iconBg: '#fdf0f0',
  },
  {
    title: 'Split — Weekend Trip',
    subtitle: 'Mon · 3:10 PM',
    amount: '+GHS 25.00',
    positive: true,
    icon: 'people-outline' as const,
    iconColor: '#9a6f00',
    iconBg: Colors.goldBg,
  },
];

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [whole, cents] = MOCK_PROFILE.balance.split('.');

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.userName}>{getShortName()} 👋</Text>
            </View>

            <View style={styles.headerActions}>
              <Pressable accessibilityRole="button" style={styles.iconBtn}>
                <Ionicons color={Colors.white} name="notifications-outline" size={17} />
              </Pressable>
              <Pressable
                accessibilityLabel="Open profile"
                accessibilityRole="button"
                onPress={() => router.push('/profile')}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>{MOCK_PROFILE.initials}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>
              GHS {whole}
              <Text style={styles.balanceCents}>.{cents}</Text>
            </Text>
            <View style={styles.balanceStats}>
              <View style={styles.statItem}>
                <Ionicons color={Colors.greenMint} name="arrow-up-circle-outline" size={13} />
                <Text style={styles.statText}>+GHS 150 today</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons color={Colors.gold} name="wallet-outline" size={13} />
                <Text style={styles.statText}>GHS 85 saved</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Card style={styles.actionsCard}>
            <View style={styles.actionRow}>
              <Button
                icon={<Ionicons color={Colors.white} name="phone-portrait-outline" size={16} />}
                onPress={() => {}}
                style={styles.momoBtn}
                title="MoMo Top-Up"
              />
              <Button
                icon={<Ionicons color={Colors.goldLight} name="arrow-up-outline" size={16} />}
                onPress={() => {}}
                style={styles.actionBtn}
                title="Withdraw"
                variant="gold"
              />
            </View>

            <View style={styles.quickGrid}>
              {QUICK_ACTIONS.map((action) => (
                <Pressable
                  key={action.id}
                  accessibilityRole="button"
                  onPress={() => router.push(action.route)}
                  style={styles.quickItem}
                >
                  <View style={[styles.quickIcon, { backgroundColor: action.bg }]}>
                    <Ionicons color={action.color} name={action.icon} size={20} />
                  </View>
                  <Text style={styles.quickLabel}>{action.label}</Text>
                </Pressable>
              ))}
            </View>
          </Card>

          <Card>
            <SectionHeader actionLabel="See all" title="Recent Transactions" />
            {TRANSACTIONS.map((tx, index) => (
              <TransactionRow
                key={tx.title}
                amount={tx.amount}
                icon={<Ionicons color={tx.iconColor} name={tx.icon} size={18} />}
                iconBg={tx.iconBg}
                isLast={index === TRANSACTIONS.length - 1}
                positive={tx.positive}
                subtitle={tx.subtitle}
                title={tx.title}
              />
            ))}
          </Card>
        </View>
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
    flexGrow: 1,
    paddingBottom: Spacing.md,
  },
  header: {
    backgroundColor: Colors.greenDark,
    paddingHorizontal: Spacing.lg + 2,
    paddingBottom: 28,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  userName: {
    fontFamily: Fonts.headingBold,
    fontSize: 17,
    color: Colors.white,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Fonts.headingBold,
    fontSize: 13,
    color: Colors.goldLight,
  },
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  balanceLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: Spacing.xs,
  },
  balanceAmount: {
    fontFamily: Fonts.headingBold,
    fontSize: 34,
    color: Colors.white,
    letterSpacing: -1,
  },
  balanceCents: {
    fontSize: 22,
  },
  balanceStats: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  body: {
    paddingHorizontal: Spacing.lg,
    marginTop: -14,
    gap: 14,
  },
  actionsCard: {
    padding: Spacing.lg,
    zIndex: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm + 2,
  },
  momoBtn: {
    flex: 1,
    backgroundColor: Colors.greenPrimary,
  },
  actionBtn: {
    flex: 1,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 14,
  },
  quickItem: {
    alignItems: 'center',
    minWidth: 56,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  quickLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: Colors.textTertiary,
  },
});
