/**
 * Screen 3 - Bill Splitting
 * -------------------------
 * Active split overview, members, and settle-up action.
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SplitMemberRow } from '@/components/ui/SplitMemberRow';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import {
  ApiError,
  createDefaultSplit,
  getActiveSplit,
  getLocalApiHint,
  settleMySplitShare,
  type SplitBill,
  type SplitMember,
} from '@/lib/api';
import { getAuthSession } from '@/lib/authSession';
import { navigateMainTab } from '@/lib/mainTabs';

export default function SplitScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [split, setSplit] = useState<SplitBill | null>(null);
  const [loadingAction, setLoadingAction] = useState<'create' | 'settle' | null>(null);

  useEffect(() => {
    loadSplit();
  }, []);

  const loadSplit = async () => {
    try {
      const session = await getAuthSession();
      if (!session) return;

      setToken(session.token);
      setSplit(await getActiveSplit(session.token));
    } catch (error) {
      const message = error instanceof ApiError ? error.message : getLocalApiHint();
      Alert.alert('Split unavailable', message);
    }
  };

  const handleCreateSplit = async () => {
    if (!token) return;

    try {
      setLoadingAction('create');
      setSplit(await createDefaultSplit(token));
    } catch (error) {
      const message = error instanceof ApiError ? error.message : getLocalApiHint();
      Alert.alert('Split not created', message);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSettle = async () => {
    if (!token || !split) return;

    try {
      setLoadingAction('settle');
      setSplit(await settleMySplitShare(token, split.id));
    } catch (error) {
      const message = error instanceof ApiError ? error.message : getLocalApiHint();
      Alert.alert('Settle failed', message);
    } finally {
      setLoadingAction(null);
    }
  };

  const you = split?.members.find((member) => member.isYou);
  const settleTitle = you && you.status === 'OWES'
    ? `Settle Up - GHS ${formatMoney(you.amount)}`
    : 'Create Starter Split';

  return (
    <View style={styles.screen}>
      <ScreenHeader
        actions={[{ accessibilityLabel: 'Create split', icon: 'add', onPress: handleCreateSplit }]}
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
              <Text style={styles.activeTitle}>{split?.title || 'No active split'}</Text>
              <Text style={styles.activeMeta}>
                {split ? `${split.createdByYou ? 'Created by you' : 'Shared with you'} - ${split.memberCount} members` : 'Create a starter split'}
              </Text>
            </View>
            <View style={styles.openBadge}>
              <Text style={styles.openBadgeText}>{split?.status || 'OPEN'}</Text>
            </View>
          </View>

          <View style={styles.activeStats}>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Total Bill</Text>
              <Text style={styles.statValue}>GHS {formatMoney(split?.totalAmount || 0)}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Per Person</Text>
              <Text style={[styles.statValue, styles.statGold]}>GHS {formatMoney(split?.perPersonAmount || 0)}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>You Owe</Text>
              <Text style={[styles.statValue, you?.status === 'OWES' ? styles.statGold : styles.statMint]}>
                {you?.status === 'OWES' ? `GHS ${formatMoney(you.amount)}` : 'Paid'}
              </Text>
            </View>
          </View>
        </Card>

        <Card>
          <SectionHeader actionLabel="Edit" title="Members" />
          {split ? (
            split.members.map((member, index) => (
              <SplitMemberRow
                key={member.id}
                amount={`GHS ${formatMoney(member.amount)}`}
                avatarBg={member.status === 'PAID' ? '#e8f5ed' : Colors.goldBg}
                avatarColor={member.status === 'PAID' ? Colors.greenPrimary : '#9a6f00'}
                initials={member.initials}
                isLast={index === split.members.length - 1}
                isYou={member.isYou}
                name={member.name}
                status={toRowStatus(member)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No members yet</Text>
              <Text style={styles.emptyText}>Create a starter split to test settlement.</Text>
            </View>
          )}
        </Card>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryBox}>
            <Text style={[styles.summaryValue, styles.summaryGold]}>GHS {formatMoney(split?.outstandingAmount || 0)}</Text>
            <Text style={styles.summaryLabel}>Outstanding</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={[styles.summaryValue, styles.summaryGreen]}>
              {split ? `${split.settledCount} / ${split.memberCount}` : '0 / 0'}
            </Text>
            <Text style={styles.summaryLabel}>Settled</Text>
          </View>
        </View>

        <Button
          icon={<Ionicons color={Colors.goldLight} name="send-outline" size={17} />}
          loading={loadingAction === 'settle' || loadingAction === 'create'}
          onPress={split && you?.status === 'OWES' ? handleSettle : handleCreateSplit}
          style={styles.settleBtn}
          title={settleTitle}
          variant="gold"
        />
      </ScrollView>

      <BottomTabBar active="split" onTabPress={navigateMainTab} />
    </View>
  );
}

function toRowStatus(member: SplitMember) {
  return member.status === 'PAID' ? 'paid' as const : 'owes' as const;
}

function formatMoney(value: number) {
  return Number(value || 0).toFixed(2);
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
  emptyState: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
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
