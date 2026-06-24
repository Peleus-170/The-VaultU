/**
 * Screen 2 - Envelopes / Budget
 * -----------------------------
 * Spending envelopes with progress bars and budget summary.
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Card } from '@/components/ui/Card';
import { EnvelopeRow } from '@/components/ui/EnvelopeRow';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import {
  ApiError,
  createDefaultEnvelopes,
  createEnvelope,
  fundEnvelope,
  getBudgetSummary,
  getLocalApiHint,
  getMyEnvelopes,
  spendFromEnvelope,
  type BudgetSummary,
  type Envelope,
} from '@/lib/api';
import { getAuthSession } from '@/lib/authSession';
import { navigateMainTab } from '@/lib/mainTabs';

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

const FALLBACK_SUMMARY: BudgetSummary = {
  totalBudgeted: 0,
  totalSpent: 0,
  totalRemaining: 0,
  spentPercent: 0,
};

export default function EnvelopesScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [summary, setSummary] = useState<BudgetSummary>(FALLBACK_SUMMARY);
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [loadingAction, setLoadingAction] = useState<'new' | 'autofund' | 'fund' | 'spend' | null>(null);

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      const session = await getAuthSession();
      if (!session) return;

      setToken(session.token);
      const [summaryResponse, envelopesResponse] = await Promise.all([
        getBudgetSummary(session.token),
        getMyEnvelopes(session.token),
      ]);
      setSummary(summaryResponse);
      setEnvelopes(envelopesResponse);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : getLocalApiHint();
      Alert.alert('Budgets unavailable', message);
    }
  };

  const handleCreateEnvelope = async () => {
    if (!token) return;

    try {
      setLoadingAction('new');
      await createEnvelope(token, {
        name: `Campus ${envelopes.length + 1}`,
        budgetAmount: 50,
        icon: 'wallet-outline',
        color: Colors.greenPrimary,
      });
      await loadBudget();
    } catch (error) {
      const message = error instanceof ApiError ? error.message : getLocalApiHint();
      Alert.alert('Envelope not created', message);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCreateDefaults = async () => {
    if (!token) return;

    try {
      setLoadingAction('autofund');
      await createDefaultEnvelopes(token);
      await loadBudget();
    } catch (error) {
      const message = error instanceof ApiError ? error.message : getLocalApiHint();
      Alert.alert('Defaults unavailable', message);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleFundFirstEnvelope = async () => {
    if (!token || envelopes.length === 0) return;

    try {
      setLoadingAction('fund');
      await fundEnvelope(token, envelopes[0].id, 25);
      await loadBudget();
    } catch (error) {
      const message = error instanceof ApiError ? error.message : getLocalApiHint();
      Alert.alert('Funding failed', message);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSpendFirstEnvelope = async () => {
    if (!token || envelopes.length === 0) return;

    try {
      setLoadingAction('spend');
      await spendFromEnvelope(token, envelopes[0].id, 10);
      await loadBudget();
    } catch (error) {
      const message = error instanceof ApiError ? error.message : getLocalApiHint();
      Alert.alert('Expense failed', message);
    } finally {
      setLoadingAction(null);
    }
  };

  const period = new Date().toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.screen}>
      <ScreenHeader
        actions={[
          { accessibilityLabel: 'Add envelope', icon: 'add', onPress: handleCreateEnvelope },
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
          <Text style={styles.summaryAmount}>GHS {formatMoney(summary.totalBudgeted)}</Text>
          <View style={styles.summaryStats}>
            <Text style={styles.summaryStat}>
              <Text style={styles.remainingHighlight}>GHS {formatMoney(summary.totalRemaining)}</Text> remaining
            </Text>
            <Text style={styles.summaryStat}>
              <Text style={styles.spentHighlight}>GHS {formatMoney(summary.totalSpent)}</Text> spent
            </Text>
          </View>
          <View style={styles.summaryTrack}>
            <View
              style={[styles.summaryFill, { width: `${summary.spentPercent}%` }]}
            />
          </View>
        </Card>

        <Card>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Spending Envelopes</Text>
            <Text style={styles.listPeriod}>{period}</Text>
          </View>

          {envelopes.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No envelopes yet</Text>
              <Text style={styles.emptyText}>Create starter envelopes to organize your spending.</Text>
            </View>
          ) : (
            envelopes.map((envelope, index) => (
              <EnvelopeRow
                key={envelope.id}
                barColor={envelope.color}
                budget={Number(envelope.budgetAmount)}
                icon={toIconName(envelope.icon)}
                iconColor={envelope.color}
                isLast={index === envelopes.length - 1}
                name={envelope.name}
                remainingColor={envelope.color}
                spent={Number(envelope.spentAmount)}
              />
            ))
          )}
        </Card>

        <View style={styles.actionGrid}>
          {ACTION_TILES.map((tile) => (
            <Pressable
              key={tile.id}
              accessibilityRole="button"
              onPress={tile.id === 'new' ? handleCreateEnvelope : handleCreateDefaults}
              style={styles.actionTile}
            >
              <View style={[styles.actionIcon, { backgroundColor: tile.bg }]}>
                <Ionicons color={tile.iconColor} name={tile.icon} size={18} />
              </View>
              <Text style={styles.actionLabel}>
                {loadingAction === tile.id ? 'Working...' : tile.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.actionGrid}>
          <Pressable
            accessibilityRole="button"
            onPress={handleFundFirstEnvelope}
            style={styles.actionTile}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#e8f5ed' }]}>
              <Ionicons color={Colors.greenPrimary} name="add-circle-outline" size={18} />
            </View>
            <Text style={styles.actionLabel}>{loadingAction === 'fund' ? 'Working...' : 'Fund First'}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleSpendFirstEnvelope}
            style={styles.actionTile}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.goldBg }]}>
              <Ionicons color="#9a6f00" name="remove-circle-outline" size={18} />
            </View>
            <Text style={styles.actionLabel}>{loadingAction === 'spend' ? 'Working...' : 'Spend First'}</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomTabBar active="budget" onTabPress={navigateMainTab} />
    </View>
  );
}

function formatMoney(value: number) {
  return Number(value || 0).toFixed(2);
}

function toIconName(value: string): keyof typeof Ionicons.glyphMap {
  return value in Ionicons.glyphMap ? (value as keyof typeof Ionicons.glyphMap) : 'wallet-outline';
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
