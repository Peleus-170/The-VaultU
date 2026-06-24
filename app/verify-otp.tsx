/**
 * Verify OTP — Step 2 of password recovery
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthFooter } from '@/components/ui/AuthFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { OtpInput } from '@/components/ui/OtpInput';
import { VaultUBrandHeader } from '@/components/ui/VaultUBrandHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // TODO: Validate OTP with Auth Service
    router.push('/new-password');
  };

  return (
    <View style={styles.screen}>
      <VaultUBrandHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration placeholder */}
        <View style={styles.illustration} />

        <Card style={styles.card}>
          <Text style={styles.title}>Verify Identity</Text>
          <Text style={styles.sub}>
            Enter the 6-digit code sent to your phone or email.
          </Text>

          <OtpInput onChange={setOtp} value={otp} />

          <Button onPress={handleVerify} title="Verify" />

          <Text style={styles.resendHint}>Didn&apos;t receive a code?</Text>
          <Pressable accessibilityRole="button" onPress={() => {}}>
            <Text style={styles.resendLink}>Resend Code</Text>
          </Pressable>
        </Card>

        <AuthFooter single="SECURE VERIFICATION" />
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
  illustration: {
    height: 120,
    backgroundColor: Colors.greenDark,
    borderRadius: Radius.xl,
    marginBottom: Spacing.lg,
    opacity: 0.92,
  },
  card: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    alignSelf: 'flex-start',
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 19,
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },
  resendHint: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  resendLink: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.greenDark,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});
