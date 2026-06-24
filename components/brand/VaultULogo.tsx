/**
 * VaultULogo — Branded VaultU mark for in-app use
 * ------------------------------------------------
 * Renders the shield icon inside a frosted container (splash, headers, etc.)
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View, type ImageStyle, type ViewStyle } from 'react-native';

import { Colors, Radius } from '@/constants/theme';

interface VaultULogoProps {
  /** Icon size inside the container */
  size?: number;
  /** Container width/height */
  containerSize?: number;
  /** Use the PNG app icon asset instead of the vector shield */
  useImage?: boolean;
  style?: ViewStyle;
}

export function VaultULogo({
  size = 36,
  containerSize = 72,
  useImage = false,
  style,
}: VaultULogoProps) {
  return (
    <View
      style={[
        styles.container,
        { width: containerSize, height: containerSize, borderRadius: containerSize * 0.28 },
        style,
      ]}
    >
      {useImage ? (
        <Image
          source={require('@/assets/icon.png')}
          style={
            {
              width: containerSize * 0.65,
              height: containerSize * 0.65,
            } as ImageStyle
          }
          resizeMode="contain"
        />
      ) : (
        <Ionicons color={Colors.white} name="shield-checkmark" size={size} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
