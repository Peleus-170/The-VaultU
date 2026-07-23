/**
 * Button — Reusable primary / outline action button
 * -------------------------------------------------
 * Matches the green pill buttons from the VaultU design system.
 */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export type ButtonVariant = 'primary' | 'outline' | 'gold';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** Button label text */
  title: string;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Optional icon rendered to the right of the label */
  icon?: React.ReactNode;
  /** Shows a loading spinner and disables press */
  loading?: boolean;
  /** Extra container styles */
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  variant = 'primary',
  icon,
  loading = false,
  disabled,
  style,
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'gold' && styles.gold,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? Colors.greenPrimary : Colors.white}
        />
      ) : (
        <View style={styles.content}>
          <Text
            style={[
              styles.label,
              variant === 'outline' && styles.labelOutline,
              variant === 'gold' && styles.labelGold,
            ]}
          >
            {title}
          </Text>
          {icon}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.lg,
    paddingVertical: 15,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.greenDark,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.greenDark,
  },
  gold: {
    backgroundColor: Colors.gold,
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.55,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
    color: Colors.white,
  },
  labelOutline: {
    color: Colors.greenDark,
  },
  labelGold: {
    color: Colors.goldLight,
  },
});
