/**
 * New Password — Step 3 of password recovery (Create New Password)
 */

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

import { AuthFooter } from '@/components/ui/AuthFooter';
import { BackToLoginLink } from '@/components/ui/BackToLoginLink';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InputField } from '@/components/ui/InputField';
import { VaultUBrandHeader } from '@/components/ui/VaultUBrandHeader';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export default function NewPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = () => {
    // TODO: Submit new password to Auth Service
    router.replace('/login');
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
          {/* Identity verified banner */}
          <View style={styles.verifiedBanner}>
            <View style={styles.verifiedAccent} />
            <View style={styles.verifiedContent}>
              <Text style={styles.verifiedTitle}>Identity Verified</Text>
              <Text style={styles.verifiedBody}>
                Your PIN uses end-to-end encryption — even VaultU cannot read it.
              </Text>
            </View>
          </View>

          <Card style={styles.card}>
            <Text style={styles.title}>Create New Password</Text>
            <Text style={styles.sub}>
              Your identity has been verified. Choose a strong password.
            </Text>

            <InputField
              hideIcon
              label="New Password"
              onChangeText={setPassword}
              placeholder="Min. 12 characters"
              required
              secureTextEntry
              value={password}
            />

            <InputField
              hideIcon
              label="Confirm Password"
              onChangeText={setConfirmPassword}
              placeholder="Repeat new password"
              required
              secureTextEntry
              value={confirmPassword}
            />

            <View style={styles.hintBox}>
              <Text style={styles.hintText}>
                Password must be at least 12 characters with numbers and symbols.
              </Text>
            </View>

            <Button onPress={handleReset} title="Reset Password" />
            <BackToLoginLink />
          </Card>

          <Text style={styles.copyright}>
            © 2026 VaultU · KNUST · CodeQuest Group 89
          </Text>
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
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  verifiedBanner: {
    flexDirection: 'row',
    backgroundColor: '#e8f5ed',
    borderRadius: Radius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  verifiedAccent: {
    width: 4,
    backgroundColor: Colors.greenDark,
  },
  verifiedContent: {
    flex: 1,
    padding: Spacing.lg,
  },
  verifiedTitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.greenDark,
    marginBottom: Spacing.xs,
  },
  verifiedBody: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  card: {
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
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 19,
    marginBottom: Spacing.xl,
  },
  hintBox: {
    backgroundColor: '#e8f5ed',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    marginTop: -Spacing.sm,
  },
  hintText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.greenDark,
    lineHeight: 17,
  },
  copyright: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
