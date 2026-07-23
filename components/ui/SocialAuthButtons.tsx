/**
 * SocialAuthButtons — Google & Apple sign-in / sign-up
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type SocialProvider = 'google' | 'apple';
export type SocialAuthVariant = 'login' | 'signup';

interface SocialAuthButtonsProps {
  variant?: SocialAuthVariant;
  onSuccessRoute?: string;
}

export function SocialAuthButtons({
  variant = 'login',
  onSuccessRoute = '/dashboard',
}: SocialAuthButtonsProps) {
  const router = useRouter();
  const action = variant === 'signup' ? 'Sign up with' : 'Continue with';

  const handlePress = (provider: SocialProvider) => {
    // TODO: Wire to Google OAuth / Sign in with Apple via Auth Service
    void provider;
    router.replace(onSuccessRoute as never);
  };

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        onPress={() => handlePress('google')}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        <View style={styles.iconSlot}>
          <Ionicons color="#4285F4" name="logo-google" size={20} />
        </View>
        <Text style={styles.label}>{action} Google</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => handlePress('apple')}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        <View style={styles.iconSlot}>
          <Ionicons color={Colors.textPrimary} name="logo-apple" size={21} />
        </View>
        <Text style={styles.label}>{action} Apple</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.sm + 2,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    width: '100%',
  },
  pressed: {
    backgroundColor: Colors.inputBg,
  },
  iconSlot: {
    width: 28,
    alignItems: 'center',
    marginRight: Spacing.sm + 2,
  },
  label: {
    flex: 1,
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
});
