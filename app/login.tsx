/**

 * Screen 2 — Login

 * -----------------

 * Email + password first, social options below.

 */



import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

import React, { useState } from 'react';

import {

  KeyboardAvoidingView,

  Platform,

  Pressable,

  Alert,

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

import { SecurityFooter } from '@/components/ui/SecurityFooter';

import { SocialAuthButtons } from '@/components/ui/SocialAuthButtons';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { ApiError, getLocalApiHint, login } from '@/lib/api';
import { saveAuthSession } from '@/lib/authSession';



export default function LoginScreen() {

  const router = useRouter();

  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);



  const handleLogin = async () => {

    if (!email.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email and password to continue.');
      return;
    }

    try {
      setLoading(true);
      const session = await login(email.trim(), password);
      await saveAuthSession(session);
      router.replace('/dashboard');
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : getLocalApiHint();
      Alert.alert('Login failed', message);
    } finally {
      setLoading(false);
    }

  };



  return (

    <View style={[styles.screen, { paddingTop: insets.top + Spacing.lg }]}>

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

          <Card style={styles.card}>

            <Text style={styles.cardTitle}>Welcome Back 👋</Text>

            <Text style={styles.cardSub}>

              Log in to manage your campus finances.

            </Text>



            <InputField

              autoCapitalize="none"

              autoComplete="email"

              hideIcon

              keyboardType="email-address"

              label="Email Address"

              onChangeText={setEmail}

              placeholder="you@example.com"

              textContentType="emailAddress"

              value={email}

            />



            <InputField

              hideIcon

              label="Password"

              labelRight={

                <Pressable

                  accessibilityRole="button"

                  onPress={() => router.push('/reset-password')}

                >

                  <Text style={styles.forgotLink}>Forgot Password?</Text>

                </Pressable>

              }

              onChangeText={setPassword}

              placeholder="Min. 8 characters"

              secureTextEntry

              value={password}

            />



            <Button

              disabled={loading}

              loading={loading}

              onPress={handleLogin}

              style={styles.submitBtn}

              title="Login"

            />



            <AuthDivider label="or continue with" uppercase />



            <SocialAuthButtons variant="login" />



            <Text style={styles.signupRow}>

              Don&apos;t have an account?{' '}

              <Text

                onPress={() => router.push('/role-select')}

                style={styles.signupLink}

              >

                Sign up

              </Text>

            </Text>

          </Card>



          <SecurityFooter />

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

    borderRadius: Radius.sm,

    alignItems: 'center',

    justifyContent: 'center',

    marginLeft: Spacing.sm,

    marginBottom: Spacing.sm,

  },

  flex: {

    flex: 1,

  },

  scrollContent: {

    flexGrow: 1,

    justifyContent: 'center',

    padding: Spacing.lg,

    paddingBottom: Spacing.xxxl,

  },

  card: {

    paddingVertical: Spacing.xxl + 4,

  },

  cardTitle: {

    fontFamily: Fonts.headingBold,

    fontSize: 22,

    color: Colors.textPrimary,

    marginBottom: Spacing.xs,

  },

  cardSub: {

    fontFamily: Fonts.body,

    fontSize: 14,

    color: Colors.textTertiary,

    marginBottom: Spacing.xl,

    lineHeight: 20,

  },

  forgotLink: {

    fontFamily: Fonts.bodySemiBold,

    fontSize: 13,

    color: Colors.greenPrimary,

  },

  submitBtn: {

    marginTop: Spacing.sm,

    backgroundColor: Colors.greenDark,

  },

  signupRow: {

    fontFamily: Fonts.body,

    fontSize: 14,

    color: Colors.textTertiary,

    textAlign: 'center',

    marginTop: Spacing.lg,

  },

  signupLink: {

    fontFamily: Fonts.bodySemiBold,

    color: Colors.greenPrimary,

  },

});


