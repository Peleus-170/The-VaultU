/**
 * InputField — Styled text input with optional icon
 * -------------------------------------------------
 * Used across auth screens (phone, password, name, etc.)
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

interface InputFieldProps extends TextInputProps {
  /** Label shown above the input */
  label: string;
  /** Show red asterisk for required fields */
  required?: boolean;
  /** Optional right-side label content (e.g. "Forgot?" link) */
  labelRight?: React.ReactNode;
  /** Icon element rendered on the left inside the input */
  icon?: React.ReactNode;
  /** Hide icon slot — plain input only */
  hideIcon?: boolean;
  /** Optional style for the outer wrapper (e.g. flex in a row) */
  containerStyle?: StyleProp<ViewStyle>;
}

export function InputField({
  label,
  required = false,
  labelRight,
  icon,
  hideIcon = false,
  containerStyle,
  style,
  placeholderTextColor = Colors.textMuted,
  ...textInputProps
}: InputFieldProps) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.labelRow}>
        <View style={styles.labelGroup}>
          <Text style={styles.label}>{label}</Text>
          {required ? <Text style={styles.required}> *</Text> : null}
        </View>
        {labelRight}
      </View>
      <View style={styles.inputWrap}>
        {!hideIcon && icon}
        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, style]}
          {...textInputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.textLabel,
  },
  required: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.error,
  },
  inputWrap: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: Spacing.md,
    gap: Spacing.sm + 2,
    borderWidth: 1.5,
    borderColor: Colors.transparent,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
  },
});
