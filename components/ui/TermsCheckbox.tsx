/**
 * TermsCheckbox — Agreement checkbox with Privacy Policy / Terms links
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

interface TermsCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export function TermsCheckbox({ checked, onToggle }: TermsCheckboxProps) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      style={styles.row}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Text style={styles.check}>✓</Text> : null}
      </View>
      <Text style={styles.text}>
        I agree to the{' '}
        <Text
          onPress={() => router.push('/privacy-policy')}
          style={styles.link}
        >
          Privacy Policy
        </Text>
        {' '}and{' '}
        <Text
          onPress={() => router.push('/privacy-policy')}
          style={styles.link}
        >
          Terms of Service
        </Text>
        .
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm + 2,
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    backgroundColor: Colors.white,
  },
  boxChecked: {
    backgroundColor: Colors.greenDark,
    borderColor: Colors.greenDark,
  },
  check: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  text: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textTertiary,
    lineHeight: 18,
  },
  link: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.greenDark,
  },
});
