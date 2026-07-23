/**
 * BackToLoginLink — "← Back to Login" navigation link
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

export function BackToLoginLink() {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.replace('/login')}
      style={styles.wrap}
    >
      <Text style={styles.text}>← Back to Login</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  text: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.greenDark,
  },
});
