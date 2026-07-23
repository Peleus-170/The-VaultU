/**
 * OtpInput — Six-digit OTP entry row
 * ------------------------------------
 * Used on the Verify Identity screen during password reset.
 */

import React, { useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';

import { Colors, Fonts, Radius } from '@/constants/theme';

const OTP_LENGTH = 6;

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function OtpInput({ value, onChange }: OtpInputProps) {
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const digits = value.padEnd(OTP_LENGTH, ' ').split('').slice(0, OTP_LENGTH);

  const updateDigit = (index: number, char: string) => {
    const next = digits.map((d, i) => (i === index ? char : d.trim())).join('');
    onChange(next.replace(/\s/g, '').slice(0, OTP_LENGTH));
  };

  const handleChange = (index: number, text: string) => {
    const char = text.replace(/\D/g, '').slice(-1);
    updateDigit(index, char);
    if (char && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputsRef.current[index] = ref;
          }}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => handleChange(index, text)}
          onKeyPress={(event) => handleKeyPress(index, event)}
          style={[styles.cell, digit.trim() ? styles.cellFilled : null]}
          value={digit.trim()}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  cell: {
    width: 40,
    height: 48,
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: '#d4e8db',
    backgroundColor: '#f0f9f4',
    textAlign: 'center',
    fontFamily: Fonts.headingBold,
    fontSize: 20,
    color: Colors.greenPrimary,
  },
  cellFilled: {
    borderColor: Colors.greenPrimary,
  },
});
