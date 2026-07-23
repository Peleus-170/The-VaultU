/**
 * Reset Password — Step 1 of password recovery
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AuthMethodTabs, type AuthMethod } from '@/components/ui/AuthMethodTabs';
import { AuthFooter } from '@/components/ui/AuthFooter';
import { BackToLoginLink } from '@/components/ui/BackToLoginLink';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InputField } from '@/components/ui/InputField';
import { VaultUBrandHeader } from '@/components/ui/VaultUBrandHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<AuthMethod>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSendOtp = () => {
    // TODO: Call Auth Service to send OTP via SMS
    router.push('/verify-otp');
  };

  return (
    <View style={styles.screen}>
      <VaultUBrandHeader />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.card}>
            <View style={styles.iconWrap}>
              <Ionicons color={Colors.greenPrimary} name="key-outline" size={22} />
            </View>

            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.sub}>
              Enter your registered phone or email to receive a verification code.
            </Text>

            <AuthMethodTabs onChange={setMethod} value={method} />

            {method === 'phone' ? (
              <InputField
                autoComplete="tel"
                hideIcon
                keyboardType="phone-pad"
                label="Phone Number"
                onChangeText={setPhone}
                placeholder="+233 (0) 000-0000"
                required
                textContentType="telephoneNumber"
                value={phone}
              />
            ) : (
              <InputField
                autoCapitalize="none"
                autoComplete="email"
                hideIcon
                keyboardType="email-address"
                label="Email Address"
                onChangeText={setEmail}
                placeholder="you@knust.edu.gh"
                required
                textContentType="emailAddress"
                value={email}
              />
            )}

            <Button onPress={handleSendOtp} title="Send OTP" />
            <BackToLoginLink />
          </Card>

          <AuthFooter left="SECURE ENCRYPTION" right="PRIVACY GUARANTEED" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: '#e8f5ed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 19,
    marginBottom: Spacing.xl,
  },
});
