/**
 * Profile — User account hub
 * ---------------------------
 * Profile details + dashboard shortcuts (Budgets, Split, Savings, Analytics).
 */

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabBar } from '@/components/ui/BottomTabBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { navigateMainTab } from '@/lib/mainTabs';
import { MOCK_PROFILE } from '@/lib/mockProfile';
import { QUICK_ACTIONS } from '@/lib/quickActions';

const ACCOUNT_ROWS = [
  { label: 'Email', value: MOCK_PROFILE.email, icon: 'mail-outline' as const },
  { label: 'MoMo Phone', value: MOCK_PROFILE.phone, icon: 'phone-portrait-outline' as const },
  { label: 'Index Number', value: MOCK_PROFILE.indexNumber, icon: 'school-outline' as const },
  { label: 'Campus', value: MOCK_PROFILE.campusLocation, icon: 'location-outline' as const },
  { label: 'Role', value: MOCK_PROFILE.role, icon: 'person-outline' as const },
  { label: 'Member Since', value: MOCK_PROFILE.memberSince, icon: 'calendar-outline' as const },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [whole, cents] = MOCK_PROFILE.balance.split('.');

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[Colors.greenDark, Colors.greenPrimary]}
          style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}
        >
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Profile</Text>
            <Pressable accessibilityLabel="Settings" accessibilityRole="button" style={styles.iconBtn}>
              <Ionicons color={Colors.white} name="settings-outline" size={18} />
            </Pressable>
          </View>

          <View style={styles.profileBlock}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{MOCK_PROFILE.initials}</Text>
            </View>
            <Text style={styles.fullName}>
              {MOCK_PROFILE.firstName} {MOCK_PROFILE.lastName}
            </Text>
            <Text style={styles.handle}>@{MOCK_PROFILE.indexNumber}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{MOCK_PROFILE.role}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.statValue}>
                GHS {whole}.{cents}
              </Text>
              <Text style={styles.statLabel}>Wallet</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statValue}>GHS {MOCK_PROFILE.saved}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statValue}>{MOCK_PROFILE.activeSplits}</Text>
              <Text style={styles.statLabel}>Splits</Text>
            </View>
          </View>

          <Pressable accessibilityRole="button" style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </Pressable>
        </LinearGradient>

        <View style={styles.body}>
          <Card style={styles.actionsCard}>
            <SectionHeader title="Quick Actions" />
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
            <SectionHeader title="Account Information" />
            {ACCOUNT_ROWS.map((row, index) => (
              <View
                key={row.label}
                style={[styles.infoRow, index === ACCOUNT_ROWS.length - 1 && styles.infoRowLast]}
              >
                <View style={styles.infoLeft}>
                  <View style={styles.infoIcon}>
                    <Ionicons color={Colors.greenPrimary} name={row.icon} size={16} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>{row.label}</Text>
                    <Text style={styles.infoValue}>{row.value}</Text>
                  </View>
                </View>
                <Ionicons color={Colors.textMuted} name="chevron-forward" size={16} />
              </View>
            ))}
          </Card>

          <Card>
            <SectionHeader title="Security" />
            <Pressable accessibilityRole="button" onPress={() => {}} style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Ionicons color={Colors.greenPrimary} name="key-outline" size={18} />
                <Text style={styles.menuText}>Change Password</Text>
              </View>
              <Ionicons color={Colors.textMuted} name="chevron-forward" size={16} />
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => {}} style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Ionicons color={Colors.greenPrimary} name="lock-closed-outline" size={18} />
                <Text style={styles.menuText}>Transaction PIN</Text>
              </View>
              <Ionicons color={Colors.textMuted} name="chevron-forward" size={16} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/privacy-policy')}
              style={[styles.menuRow, styles.menuRowLast]}
            >
              <View style={styles.menuLeft}>
                <Ionicons color={Colors.greenPrimary} name="shield-checkmark-outline" size={18} />
                <Text style={styles.menuText}>Privacy Policy</Text>
              </View>
              <Ionicons color={Colors.textMuted} name="chevron-forward" size={16} />
            </Pressable>
          </Card>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace('/login')}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomTabBar active="profile" onTabPress={navigateMainTab} />
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
    paddingBottom: Spacing.lg,
  },
  header: {
    paddingHorizontal: Spacing.lg + 2,
    paddingBottom: Spacing.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: Colors.white,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBlock: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontFamily: Fonts.headingBold,
    fontSize: 28,
    color: Colors.goldLight,
  },
  fullName: {
    fontFamily: Fonts.headingBold,
    fontSize: 20,
    color: Colors.white,
  },
  handle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },
  roleBadge: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  roleText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    color: Colors.greenMint,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: Radius.xxl,
    paddingVertical: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: Spacing.lg,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: Fonts.headingBold,
    fontSize: 15,
    color: Colors.white,
  },
  statLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  editBtn: {
    alignSelf: 'stretch',
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.greenPrimary,
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
    marginBottom: 4,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0f9f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: Colors.textMuted,
  },
  infoValue: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  logoutBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  logoutText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.error,
  },
});
