/**
 * Screen 1 - Wallet Dashboard
 * ---------------------------
 * Home tab: balance, quick actions, shortcuts, and recent transactions.
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TransactionRow } from '@/components/ui/TransactionRow';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import {
  ApiError,
  getLocalApiHint,
  getMyTransactions,
  getMyWallet,
  requestTopUp,
  requestWithdrawal,
  type AuthResponse,
  type Wallet,
  type WalletTransaction,
} from '@/lib/api';
import { getAuthSession } from '@/lib/authSession';
import { navigateMainTab } from '@/lib/mainTabs';

const FALLBACK_USER = {
  firstName: 'Rexford',
  initials: 'RA',
  balance: '0.00',
};

const QUICK_ACTIONS = [
  {
    id: 'budgets',
    label: 'Budgets',
    icon: 'pie-chart-outline' as const,
    color: Colors.greenPrimary,
    bg: '#f0f9f4',
  },
  {
    id: 'split',
    label: 'Split',
    icon: 'people-outline' as const,
    color: '#9a6f00',
    bg: Colors.goldBg,
  },
  {
    id: 'savings',
    label: 'Savings',
    icon: 'lock-closed-outline' as const,
    color: Colors.greenPrimary,
    bg: '#f0f9f4',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'bar-chart-outline' as const,
    color: Colors.greenPrimary,
    bg: '#f0f9f4',
  },
] as const;

const EMPTY_TRANSACTIONS = [
  {
    title: 'No transactions yet',
    subtitle: 'Top up your wallet to get started',
    amount: 'GHS 0.00',
    positive: true,
    icon: 'wallet-outline' as const,
    iconColor: Colors.greenPrimary,
    iconBg: '#f0f9f4',
  },
];

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [session, setSession] = useState<AuthResponse | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [walletAction, setWalletAction] = useState<'topup' | 'withdraw' | null>(null);

  const profile = session?.user;
  const firstName = profile?.firstName || profile?.businessName || FALLBACK_USER.firstName;
  const initials = getInitials(profile?.firstName, profile?.lastName, profile?.businessName);
  const balance = wallet?.balance ?? Number(FALLBACK_USER.balance);
  const [whole, cents] = balance.toFixed(2).split('.');
  const transactionRows = transactions.length > 0 ? mapTransactions(transactions) : EMPTY_TRANSACTIONS;

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const savedSession = await getAuthSession();

      if (!savedSession) {
        router.replace('/login');
        return;
      }

      setSession(savedSession);
      const [walletResponse, transactionResponse] = await Promise.all([
        getMyWallet(savedSession.token),
        getMyTransactions(savedSession.token).catch(() => []),
      ]);
      setWallet(walletResponse);
      setTransactions(transactionResponse);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : getLocalApiHint();
      Alert.alert('Dashboard unavailable', message);
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async () => {
    if (!session) return;

    try {
      setWalletAction('topup');
      await requestTopUp(session.token, 150);
      await loadDashboard();
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : getLocalApiHint();
      Alert.alert('Top-up failed', message);
    } finally {
      setWalletAction(null);
    }
  };

  const handleWithdrawal = async () => {
    if (!session) return;

    try {
      setWalletAction('withdraw');
      await requestWithdrawal(session.token, 20);
      await loadDashboard();
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : getLocalApiHint();
      Alert.alert('Withdrawal failed', message);
    } finally {
      setWalletAction(null);
    }
  };

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
              <Text style={styles.userName}>{firstName}</Text>
            </View>

            <View style={styles.headerActions}>
              <Pressable accessibilityRole="button" style={styles.iconBtn}>
                <Ionicons color={Colors.white} name="notifications-outline" size={17} />
              </Pressable>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
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
                <Text style={styles.statText}>{loading ? 'Syncing wallet' : 'Live wallet'}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons color={Colors.gold} name="wallet-outline" size={13} />
                <Text style={styles.statText}>{wallet?.currency || 'GHS'} account</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Card style={styles.actionsCard}>
            <View style={styles.actionRow}>
              <Button
                icon={<Ionicons color={Colors.white} name="phone-portrait-outline" size={16} />}
                loading={walletAction === 'topup'}
                onPress={handleTopUp}
                style={styles.momoBtn}
                title="MoMo Top-Up"
              />
              <Button
                icon={<Ionicons color={Colors.goldLight} name="arrow-up-outline" size={16} />}
                loading={walletAction === 'withdraw'}
                onPress={handleWithdrawal}
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
                  onPress={() => {
                    if (action.id === 'budgets') router.push('/envelopes');
                    if (action.id === 'split') router.push('/split');
                    if (action.id === 'analytics') router.push('/analytics');
                  }}
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
            {transactionRows.map((tx, index) => (
              <TransactionRow
                key={`${tx.title}-${tx.subtitle}-${index}`}
                amount={tx.amount}
                icon={<Ionicons color={tx.iconColor} name={tx.icon} size={18} />}
                iconBg={tx.iconBg}
                isLast={index === transactionRows.length - 1}
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

function getInitials(firstName?: string | null, lastName?: string | null, businessName?: string | null) {
  const source = businessName || `${firstName || ''} ${lastName || ''}`.trim();
  const initials = source
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return initials || FALLBACK_USER.initials;
}

function mapTransactions(transactions: WalletTransaction[]) {
  return transactions.map((transaction) => {
    const positive = transaction.type === 'TOP_UP';
    return {
      title: transaction.description || (positive ? 'MoMo Top-Up' : 'MoMo Withdrawal'),
      subtitle: formatTransactionDate(transaction.createdAt),
      amount: `${positive ? '+' : '-'}GHS ${Number(transaction.amount).toFixed(2)}`,
      positive,
      icon: positive ? ('phone-portrait-outline' as const) : ('arrow-up-outline' as const),
      iconColor: positive ? '#9a6f00' : Colors.greenPrimary,
      iconBg: positive ? Colors.goldBg : '#f0f9f4',
    };
  });
}

function formatTransactionDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Just now';
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
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
