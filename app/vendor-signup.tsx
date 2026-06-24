/**
 * Vendor Signup — Campus vendor registration
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthDivider } from '@/components/ui/AuthDivider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InputField } from '@/components/ui/InputField';
import { SocialAuthButtons } from '@/components/ui/SocialAuthButtons';
import { TermsCheckbox } from '@/components/ui/TermsCheckbox';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { ApiError, getLocalApiHint, registerVendor } from '@/lib/api';
import { saveAuthSession } from '@/lib/authSession';

export default function VendorSignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!businessName.trim() || !phone.trim() || !email.trim() || !location.trim() || !password) {
      Alert.alert('Missing details', 'Fill in all required fields to create your vendor account.');
      return;
    }

    if (!agreed) {
      Alert.alert('Terms required', 'Accept the VaultU terms and privacy policy to continue.');
      return;
    }

    try {
      setLoading(true);
      const session = await registerVendor({
        businessName: businessName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        campusLocation: location.trim(),
        password,
      });
      await saveAuthSession(session);
      router.replace('/dashboard');
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : getLocalApiHint();
      Alert.alert('Signup failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={styles.backBtn}
      >
        <Ionicons color={Colors.textSecondary} name="arrow-back" size={20} />
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top promo banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Put your business where students can find you
            </Text>
          </View>

          <Card style={styles.card}>
            <Text style={styles.heading}>Join VaultU</Text>
            <Text style={styles.subheading}>
              Register your campus business to receive payments.
            </Text>

            <SocialAuthButtons variant="signup" />

            <AuthDivider label="or with email" uppercase />

            <InputField
              hideIcon
              label="Business Name"
              onChangeText={setBusinessName}
              placeholder="Enter business name"
              required
              value={businessName}
            />

            <InputField
              hideIcon
              keyboardType="phone-pad"
              label="Phone (MoMo)"
              onChangeText={setPhone}
              placeholder="+233 (0) 000-0000"
              required
              value={phone}
            />

            <InputField
              autoCapitalize="none"
              autoComplete="email"
              icon={<Ionicons color={Colors.textIcon} name="mail-outline" size={17} />}
              keyboardType="email-address"
              label="Email Address"
              onChangeText={setEmail}
              placeholder="business@email.com"
              required
              textContentType="emailAddress"
              value={email}
            />

            <InputField
              hideIcon
              label="Location on Campus"
              onChangeText={setLocation}
              placeholder="Block, Area, Landmark"
              required
              value={location}
            />

            <InputField
              hideIcon
              label="Password"
              onChangeText={setPassword}
              placeholder="Min. 8 characters"
              required
              secureTextEntry
              value={password}
            />

            <TermsCheckbox checked={agreed} onToggle={() => setAgreed(!agreed)} />

            <Button
              disabled={loading}
              loading={loading}
              onPress={handleCreateAccount}
              title="Create Account"
            />

            <Text style={styles.loginRow}>
              Already have an account?{' '}
              <Text
                onPress={() => router.replace('/login')}
                style={styles.loginLink}
              >
                Log in
              </Text>
            </Text>
          </Card>
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
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  banner: {
    backgroundColor: Colors.greenDark,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  bannerText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  heading: {
    fontFamily: Fonts.headingBold,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subheading: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textTertiary,
    marginBottom: Spacing.xl,
    lineHeight: 18,
  },
  loginRow: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  loginLink: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.greenDark,
  },
});
