/**
 * Privacy Policy — Data protection & user rights
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormPageHeader } from '@/components/ui/FormPageHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <FormPageHeader title="Privacy Policy" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.effective}>EFFECTIVE: APRIL 2026</Text>
        <Text style={styles.mainTitle}>Commitment to Your Privacy</Text>
        <Text style={styles.intro}>
          VaultU is built for KNUST students. We collect only what we need to
          operate your wallet, protect your funds, and help you budget smarter.
        </Text>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.body}>
            We collect your name, student index number, phone number, and
            transaction history when you register or use VaultU services.
          </Text>

          <View style={styles.callout}>
            <View style={styles.calloutAccent} />
            <View style={styles.calloutContent}>
              <Text style={styles.calloutTitle}>Phone Number & MoMo</Text>
              <Text style={styles.calloutBody}>
                Your mobile money number is used solely for Paystack-powered
                top-ups, withdrawals, and 2FA. It is never sold to third parties.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>2. How We Use Your Data</Text>
          <Text style={styles.body}>
            Your data is used strictly to operate VaultU — processing transactions,
            generating analytics, sending alerts, and preventing fraud.
          </Text>

          <Text style={styles.sectionTitle}>3. Your Rights</Text>
          <Text style={styles.body}>
            You can request a copy of your data or delete your account at any time.
          </Text>

          <View style={styles.actionRow}>
            <Pressable style={[styles.actionBtn, styles.actionGreen]}>
              <Text style={styles.actionTitleGreen}>Data Access</Text>
              <Text style={styles.actionSubGreen}>Download your archive</Text>
            </Pressable>
            <Pressable style={[styles.actionBtn, styles.actionRed]}>
              <Text style={styles.actionTitleRed}>Delete Account</Text>
              <Text style={styles.actionSubRed}>Remove all data</Text>
            </Pressable>
          </View>
        </Card>

        <Button
          onPress={() => router.back()}
          style={styles.backBtn}
          title="Back"
          variant="outline"
        />
      </ScrollView>
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
    paddingBottom: Spacing.xxxl,
  },
  effective: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  mainTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  intro: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  card: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  callout: {
    flexDirection: 'row',
    backgroundColor: '#f0f9f4',
    borderRadius: Radius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  calloutAccent: {
    width: 3,
    backgroundColor: Colors.greenPrimary,
  },
  calloutContent: {
    flex: 1,
    padding: Spacing.md,
  },
  calloutTitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.greenDark,
    marginBottom: Spacing.xs,
  },
  calloutBody: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  actionGreen: {
    backgroundColor: '#e8f5ed',
  },
  actionRed: {
    backgroundColor: '#fdf0f0',
  },
  actionTitleGreen: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.greenDark,
    marginBottom: 2,
  },
  actionSubGreen: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.greenPrimary,
  },
  actionTitleRed: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.errorDark,
    marginBottom: 2,
  },
  actionSubRed: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.error,
  },
  backBtn: {
    marginTop: Spacing.sm,
  },
});
